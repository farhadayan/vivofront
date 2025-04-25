import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule, MatInputModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() placeholder: string = 'Search...';
  @Input() showClearButton: boolean = true;
  @Input() debounceTime: number = 300;
  searchTerm: string = '';

  @Output() search = new EventEmitter<string>();
  @Output() searchChange = new EventEmitter<string>();

  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();
  
  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.searchChange.emit(value);
    });
  }
  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm = value;
    this.searchChange.next(value);
  }

  onSearch() {
    this.search.emit(this.searchTerm);
  }

  clearSearch() {
    this.searchTerm = '';
    this.search.emit('');
    this.searchChange.emit('');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
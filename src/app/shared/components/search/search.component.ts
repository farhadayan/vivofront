import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl:'./search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchTerm = '';
  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchTerm.toLowerCase());
  }
}
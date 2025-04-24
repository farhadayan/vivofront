import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule, FormsModule],
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {
  @Input() languages: string[] = [];
  @Input() selectedLanguage: string = '';
  @Output() languageChange = new EventEmitter<string>();

  onLanguageSelected(language: string): void {
    this.languageChange.emit(language);
  }
}
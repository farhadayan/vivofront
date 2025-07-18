import { Component, Input  } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl:'./loading-spinner.Component.html',
  styleUrl:'./loading-spinner.Component.scss' 
})
export class LoadingSpinnerComponent {
  @Input() size = '40px';
  @Input() color = '$primary-color';
}
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-labelled-component',
  templateUrl: './labelled-component.component.html',
  styleUrls: ['./labelled-component.component.scss'],
  standalone: true
})
export class LabelledComponentComponent {
  @Input() label: string='';
}

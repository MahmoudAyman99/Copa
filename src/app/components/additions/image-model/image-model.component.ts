import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-model',
  standalone: true,
  imports: [],
  templateUrl: './image-model.component.html',
  styleUrl: './image-model.component.scss'
})
export class ImageModelComponent {
  @Input() imageUrl: string = '';
}

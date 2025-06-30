import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SafeUrlPipe } from '../../../shared/safe-url.pipe';

@Component({
  selector: 'app-video-model',
  standalone: true,
  imports: [SafeUrlPipe],
  templateUrl: './video-model.component.html',
  styleUrl: './video-model.component.scss'
})
export class VideoModelComponent {
  @Input() videoUrl: string = '';
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit(); // إغلاق المودال
  }
}

import { Component, Input } from '@angular/core';
import { AudioPlayerService } from '../../../services/audio.service';

@Component({
  selector: 'app-preview-button',
  templateUrl: './preview-button.component.html',
})
export class PreviewButtonComponent {
  @Input() previewUrl!: string;
  @Input() title?: string;
  @Input() artist?: string;
  @Input() cover?: string;

  constructor(private audio: AudioPlayerService) {}

  isPlaying(): boolean {
    return this.audio.currentUrl() === this.previewUrl && this.audio.isPlaying();
  }

  onButtonClick(event: MouseEvent) {
    event.stopPropagation();
    this.audio.toggle(this.previewUrl, this.title, this.artist, this.cover);
  }
}

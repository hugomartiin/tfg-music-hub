// src/app/shared/components/preview-button/preview-button.component.ts
import { Component, Input } from '@angular/core';
import { AudioPlayerService } from '../../../services/audio.service';

@Component({
  selector: 'app-preview-button',
  templateUrl: './preview-button.component.html',
})
export class PreviewButtonComponent {
  @Input() previewUrl!: string;

  constructor(private audioPlayerService: AudioPlayerService) {}

  isPlaying(): boolean {
    return this.audioPlayerService.isPlayingUrl(this.previewUrl);
  }

  togglePlayback() {
    if (this.isPlaying()) {
      this.audioPlayerService.stop();
    } else {
      this.audioPlayerService.play(this.previewUrl);
    }
  }
}

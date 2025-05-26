// global-player.component.ts
import { Component } from '@angular/core';
import { AudioPlayerService } from '../../../services/audio.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-global-player',
  standalone: true,
  templateUrl: './global-player.component.html',
  imports: [NgIf],
})
export class GlobalPlayerComponent {
  constructor(public audio: AudioPlayerService) {}
}

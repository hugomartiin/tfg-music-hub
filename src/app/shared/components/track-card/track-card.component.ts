import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';
import { PreviewButtonComponent } from '../preview-button/preview-button.component';
import { AuthService } from '../../../services/auth.service';
import { DeezerTrack } from '../../../interfaces/interfaces';
import { AddToPlaylistComponent } from '../add-to-playlist/add-to-playlist.component';

@Component({
  selector: 'app-track-card',
  standalone: true,
  imports: [
    CommonModule,
    FavoriteButtonComponent,
    PreviewButtonComponent,
    AddToPlaylistComponent
  ],
  templateUrl: './track-card.component.html',
})
export class TrackCardComponent {
  @Input() track!: DeezerTrack;

  constructor(public authService: AuthService) {}
}

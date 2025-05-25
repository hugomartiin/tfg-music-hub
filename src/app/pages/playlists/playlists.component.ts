import { Component, OnInit } from '@angular/core';
import { PlaylistService } from '../../services/playlist.service';
import { DeezerService } from '../../services/deezer.service';
import { Playlist, DeezerTrack } from '../../interfaces/interfaces';
import { forkJoin } from 'rxjs';
import { PreviewButtonComponent } from '../../shared/components/preview-button/preview-button.component';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { TrackCardComponent } from '../../shared/components/track-card/track-card.component';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlists.component.html',
  imports: [CommonModule,ModalComponent,TrackCardComponent],
  standalone: true,
})
export class PlaylistsComponent implements OnInit {
  playlists: Playlist[] = [];
  selectedPlaylist: Playlist | null = null;
  trackDetails: DeezerTrack[] = [];

  constructor(
    private playlistService: PlaylistService,
    private deezerService: DeezerService
  ) {}

  ngOnInit() {
    this.playlistService.getPlaylists$().subscribe({
      next: playlists => {
        this.playlists = playlists;
        // Si la playlist seleccionada fue borrada, deseleccionarla
        if (this.selectedPlaylist && !playlists.find(p => p.id === this.selectedPlaylist?.id)) {
          this.selectedPlaylist = null;
          this.trackDetails = [];
        }
      },
      error: err => {
        console.error('Error al cargar playlists:', err);
      }
    });
  }

  selectPlaylist(playlist: Playlist) {
    this.selectedPlaylist = playlist;
    if (!playlist.tracks.length) {
      this.trackDetails = [];
      return;
    }

    const trackObservables = playlist.tracks.map(id =>
      this.deezerService.getTrack(+id)
    );

    forkJoin(trackObservables).subscribe({
      next: tracks => {
        this.trackDetails = tracks;
      },
      error: err => {
        console.error('Error cargando tracks de la playlist:', err);
        this.trackDetails = [];
      }
    });
  }

  deletePlaylist(playlist: Playlist, event: MouseEvent) {
  event.stopPropagation();
  this.openConfirmModal(
    `¿Seguro que quieres borrar la playlist "${playlist.name}"?`,
    async () => {
      try {
        if (!playlist.id) throw new Error('Playlist sin id');
        await this.playlistService.deletePlaylist(playlist.id);
        if (this.selectedPlaylist?.id === playlist.id) {
          this.selectedPlaylist = null;
          this.trackDetails = [];
        }
      } catch (err) {
        console.error('Error borrando playlist:', err);
        alert('Error al borrar playlist.');
      }
    }
  );
}

removeTrackFromPlaylist(trackIndex: number) {
  if (!this.selectedPlaylist) return;

  const track = this.trackDetails[trackIndex];

  this.openConfirmModal(
    `¿Quieres quitar la canción "${track.title}" de la playlist "${this.selectedPlaylist.name}"?`,
    async () => {
      try {
        const updatedTracks = [...this.selectedPlaylist!.tracks];
        updatedTracks.splice(trackIndex, 1);
        await this.playlistService.updatePlaylist(this.selectedPlaylist!.id!, {
          tracks: updatedTracks,
        });
        this.selectedPlaylist!.tracks = updatedTracks;
        this.trackDetails.splice(trackIndex, 1);
      } catch (err) {
        console.error('Error quitando canción:', err);
        alert('Error al quitar canción de la playlist.');
      }
    }
  );
}

  // Nuevo estado para controlar el modal de confirmación
confirmModalVisible = false;
confirmModalMessage = '';
confirmModalAction: (() => Promise<void>) | null = null;

// Método para abrir modal con acción y mensaje
openConfirmModal(message: string, action: () => Promise<void>) {
  this.confirmModalMessage = message;
  this.confirmModalAction = action;
  this.confirmModalVisible = true;
}

// Método para confirmar en modal
async confirmModalYes() {
  if (this.confirmModalAction) {
    await this.confirmModalAction();
  }
  this.confirmModalVisible = false;
}

// Método para cancelar modal
cancelModal() {
  this.confirmModalVisible = false;
}

}

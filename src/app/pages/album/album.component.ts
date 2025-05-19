import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeezerService } from '../../services/deezer.service';
import { DiscogsService } from '../../services/discogs.service';
import { DeezerAlbumDetail, DiscogsRelease } from '../../interfaces/interfaces';
import { CommonModule } from '@angular/common';
import { PreviewButtonComponent } from '../../shared/components/preview-button/preview-button.component';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  imports: [CommonModule, PreviewButtonComponent],
  standalone: true
})
export class AlbumComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private deezerService = inject(DeezerService);

  album: DeezerAlbumDetail | null = null;
  isLoading = true;

  discogsVersions: DiscogsRelease[] = [];
  isLoadingVersions = false;

  ngOnInit(): void {
    const albumId = Number(this.route.snapshot.paramMap.get('id'));
    if (albumId) {
      this.fetchAlbum(albumId);
    }
  }

  private fetchAlbum(albumId: number): void {
    this.deezerService.getAlbum(albumId).subscribe({
      next: (albumData) => {
        this.album = albumData;
        this.isLoading = false;      },
      error: (err) => {
        console.error('Error cargando el álbum:', err);
        this.isLoading = false;
      }
    });
  }

}

import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeezerService } from '../../services/deezer.service';
import { DiscogsService } from '../../services/discogs.service';
import { DeezerArtist, DeezerAlbum, DiscogsArtist, DiscogsArtistReleases, DiscogsSearchResult,DeezerTrack } from '../../interfaces/interfaces';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { PreviewButtonComponent } from '../../shared/components/preview-button/preview-button.component';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  imports: [RouterLink, CommonModule, ButtonComponent,PreviewButtonComponent],
})
export class ArtistComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private deezerService = inject(DeezerService);
  private discogsService = inject(DiscogsService);

  artist = signal<DeezerArtist | null>(null);
  albums = signal<DeezerAlbum[]>([]);
  loading = signal(true);
  visibleCount = signal(8);
  isExpanded = signal(false);
  isNameVariationsExpanded = signal(false);
  topTracks = signal<DeezerTrack[]>([]); 
  discogsArtist = signal<DiscogsArtist | null>(null);
  artistReleases = signal<DiscogsArtistReleases | null>(null);
  
  get truncatedProfile(): string {
    const full = this.cleanProfile;
    return full.length > 300 && !this.isExpanded() ? full.slice(0, 300) + '...' : full;
  }

  get cleanProfile(): string {
    return this.discogsArtist()?.profile?.replace(/\[a\d+\]/g, '') ?? '';
  }
  get discogsMemberNames(): string {
    return this.discogsArtist()?.members?.map((m) => m.name).join(', ') ?? '';
  }
  get truncatedNameVariations(): string {
    const variations = this.discogsArtist()?.namevariations ?? [];
    const joined = variations.join(', ');
    return joined.length > 150 && !this.isNameVariationsExpanded() ? joined.slice(0, 150) + '...' : joined;
  }
  get isTruncatedProfile(): boolean {
  return this.cleanProfile.length > 300;
}

get isTruncatedNameVariations(): boolean {
  const joined = (this.discogsArtist()?.namevariations ?? []).join(', ');
  return joined.length > 150;
}
ngOnInit(): void {
  const id = +this.route.snapshot.paramMap.get('id')!;
  this.deezerService.getArtist(id).subscribe((res) => {
    this.artist.set(res);
    const name = res?.name ?? '';

    this.deezerService.getArtistAlbums(id).subscribe((res) => {
      this.albums.set(res.data);
      this.loading.set(false);
    });

    this.deezerService.getArtistTopTracks(id).subscribe((res) => {
      this.topTracks.set(res.data);
    });

    if (name) {
      this.discogsService.searchArtist(name).subscribe((search: DiscogsSearchResult) => {
        const match = search.results[0];
        if (match) {
          this.discogsService.getArtistById(match.id).subscribe((artistInfo) => {
            this.discogsArtist.set(artistInfo);
          });
          this.discogsService.getArtistReleases(match.id).subscribe((releases) => {
            this.artistReleases.set(releases);
          });
        }
      });
    }
  });
}

  showMore(): void {
    this.visibleCount.set(this.albums().length);
  }

  showLess(): void {
    this.visibleCount.set(8);
  }
  toggleExpanded(): void {
  this.isExpanded.update(value => !value);
  }
  toggleNameVariations(): void {
    this.isNameVariationsExpanded.update(v => !v);
  }   
  
}

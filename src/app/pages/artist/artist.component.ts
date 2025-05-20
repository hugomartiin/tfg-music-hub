import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeezerService } from '../../services/deezer.service';
import { DiscogsService } from '../../services/discogs.service';
import { DeezerArtist, DeezerAlbum, DiscogsArtist, DiscogsArtistReleases, DiscogsSearchResult, DeezerTrack } from '../../interfaces/interfaces';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { PreviewButtonComponent } from '../../shared/components/preview-button/preview-button.component';
import { Subscription, forkJoin, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  imports: [RouterLink, CommonModule, ButtonComponent, PreviewButtonComponent],
})
export class ArtistComponent implements OnInit, OnDestroy {
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

  private paramSub!: Subscription;

  ngOnInit(): void {
    this.paramSub = this.route.paramMap.pipe(
      switchMap(paramMap => {
        const id = +paramMap.get('id')!;
        this.loading.set(true);
        return this.loadArtistData(id);
      })
    ).subscribe({
      next: () => this.loading.set(false),
      error: () => this.loading.set(false),
    });
  }

  ngOnDestroy(): void {
    this.paramSub?.unsubscribe();
  }

  private loadArtistData(id: number) {
    return this.deezerService.getArtist(id).pipe(
      switchMap(artistRes => {
        this.artist.set(artistRes);
        const name = artistRes?.name ?? '';
        const albums$ = this.deezerService.getArtistAlbums(id).pipe(
          tap(albumsRes => this.albums.set(albumsRes.data)),
          catchError(() => {
            this.albums.set([]);
            return of(null);
          })
        );
        const topTracks$ = this.deezerService.getArtistTopTracks(id).pipe(
          tap(tracksRes => this.topTracks.set(tracksRes.data)),
          catchError(() => {
            this.topTracks.set([]);
            return of(null);
          })
        );

        const discogs$ = name
          ? this.discogsService.searchArtist(name).pipe(
              switchMap((search: DiscogsSearchResult) => {
                const match = search.results[0];
                if (match) {
                  const artistInfo$ = this.discogsService.getArtistById(match.id).pipe(
                    tap(artistInfo => this.discogsArtist.set(artistInfo)),
                    catchError(() => {
                      this.discogsArtist.set(null);
                      return of(null);
                    })
                  );
                  const releases$ = this.discogsService.getArtistReleases(match.id).pipe(
                    tap(releases => this.artistReleases.set(releases)),
                    catchError(() => {
                      this.artistReleases.set(null);
                      return of(null);
                    })
                  );
                  return forkJoin([artistInfo$, releases$]);
                } else {
                  this.discogsArtist.set(null);
                  this.artistReleases.set(null);
                  return of(null);
                }
              }),
              catchError(() => {
                this.discogsArtist.set(null);
                this.artistReleases.set(null);
                return of(null);
              })
            )
          : of(null);

        return forkJoin([albums$, topTracks$, discogs$]);
      }),
      catchError(() => {
        this.artist.set(null);
        this.albums.set([]);
        this.topTracks.set([]);
        this.discogsArtist.set(null);
        this.artistReleases.set(null);
        return of(null);
      })
    );
  }

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

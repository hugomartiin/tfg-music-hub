import { Component, computed, effect, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DeezerService } from '../../services/deezer.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { PreviewButtonComponent } from '../../shared/components/preview-button/preview-button.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [
    RouterModule,
    ButtonComponent,
    PreviewButtonComponent,
  ],
})
export class SearchComponent {
  query = signal('');
  loading = signal(false);
  error = signal('');
  results = signal<{ artists: any; albums: any; tracks: any } | null>(null);

  selectedCategory = signal<'all' | 'artists' | 'albums' | 'tracks'>('all');

  constructor(
    private route: ActivatedRoute,
    private deezerService: DeezerService
  ) {
    const querySignal = toSignal(
      this.route.queryParams.pipe(map(params => params['q'] ?? '')),
      { initialValue: '' }
    );

    effect(() => {
      const searchQuery = querySignal();
      this.query.set(searchQuery);

      if (searchQuery) {
        this.search();
      }
    });
  }

  search() {
    this.loading.set(true);
    this.error.set('');
    this.deezerService.search(this.query()).subscribe({
      next: (res) => {
        this.results.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Hubo un error al buscar.');
        this.loading.set(false);
      },
    });
  }

  topArtists = computed(() => {
    const all = this.results()?.artists?.data || [];
    return this.selectedCategory() === 'artists' ? all.slice(0, 15) : all.slice(0, 5);
  });

  topAlbums = computed(() => {
    const all = this.results()?.albums?.data || [];
    return this.selectedCategory() === 'albums' ? all.slice(0, 15) : all.slice(0, 5);
  });

  topTracks = computed(() => {
    const all = this.results()?.tracks?.data || [];
    return this.selectedCategory() === 'tracks' ? all.slice(0, 15) : all.slice(0, 5);
  });
}

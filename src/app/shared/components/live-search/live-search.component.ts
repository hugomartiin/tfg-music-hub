import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { DeezerService } from '../../../services/deezer.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { PreviewButtonComponent } from '../preview-button/preview-button.component';

@Component({
  selector: 'app-live-search',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    RouterLink,
    PreviewButtonComponent
  ],
  
  templateUrl: './live-search.component.html',
})
export class LiveSearchComponent {
  topResults: any[] = [];
  private query$ = new Subject<string>();

  @Output() search = new EventEmitter<string>();

  constructor(private deezerService: DeezerService, private router: Router,) {
    this.query$.pipe(debounceTime(300)).subscribe((query) => {
      if (!query) {
        this.topResults = [];
        return;
      }

      this.deezerService.search(query).subscribe((res) => {
        const topTracks = res.tracks.data.slice(0, 2);
        const topArtists = res.artists.data.slice(0, 1);
        const topAlbums = res.albums.data.slice(0, 2);
        this.topResults = [...topArtists, ...topAlbums, ...topTracks];
      });
    });
  }

  onSearch(query: string) {
    this.search.emit(query);
  }

  onQueryChange(query: string) {
    this.query$.next(query);
  }

  isTrack(item: any): boolean {
    return !!item.preview;
  }

  getImage(item: any): string {
    if (item.picture_small) return item.picture_small;
    if (item.cover_small) return item.cover_small;
    if (item.album?.cover_small) return item.album.cover_small;
    return '';
  }

  getTitle(item: any): string {
    return item.title || item.name;
  }

  getSubtitle(item: any): string {
    if (item.artist) return item.artist.name;
    if (item.type === 'album') return 'Álbum';
    if (item.type === 'artist') return 'Artista';
    return '';
  }

  goToDetail(item: any) {
    if (item.type === 'artist') {
      this.router.navigate(['/artist', item.id]);
    } else if (item.type === 'album') {
      this.router.navigate(['/album', item.id]);
    }
  }
  searchValue = '';

handleResultClick(item: any) {
  this.goToDetail(item);
  this.topResults = [];
  this.searchValue = '';
}
@HostListener('document:click', ['$event'])
onClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement;
  const searchContainer = document.querySelector('app-live-search');
  if (searchContainer && !searchContainer.contains(target)) {
    this.topResults = [];
    this.searchValue = '';
  }
}

}

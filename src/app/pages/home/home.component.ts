import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject } from 'rxjs';
import { DeezerService } from '../../services/deezer.service';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { MainCardComponent } from '../../shared/components/main-card/main-card.component';
import { PreviewButtonComponent } from '../../shared/components/preview-button/preview-button.component';
import { LoginModalComponent } from '../login/login.component';
import { RegisterModalComponent } from '../register/register.component';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    SearchBarComponent,
    MainCardComponent,
    CommonModule,
    RouterLink,
    PreviewButtonComponent,
    LoginModalComponent,
    RegisterModalComponent,
    ButtonComponent,
    ModalComponent
  ],
  providers: [AuthService]
})
export class HomeComponent {
  topResults: any[] = [];
  hasSearched = false;
  loading = false;
  searchValue = '';
  isHome = signal(false);
  showLogin = false;
  showRegister = false;
  showLogoutConfirm = false;
  currentUser: any;

  @ViewChild('searchBlock', { read: ElementRef }) searchBlockRef!: ElementRef<HTMLInputElement>;
  private query$ = new Subject<string>();

  constructor(
    private router: Router,
    private deezerService: DeezerService,
    public authService: AuthService
  ) {
    this.currentUser = this.authService.currentUser;
    this.query$.pipe(debounceTime(300)).subscribe((query) => {
      if (!query) {
        this.topResults = [];
        this.hasSearched = false;
        this.loading = false;
        return;
      }

      this.loading = true;
      this.hasSearched = true;

      this.deezerService.search(query).subscribe((res) => {
        const topTracks = res.tracks.data.slice(0, 2);
        const topArtists = res.artists.data.slice(0, 2);
        const topAlbums = res.albums.data.slice(0, 1);
        this.topResults = [...topArtists, ...topAlbums, ...topTracks];
        this.loading = false;
      });
    });
  }

  onSearch(query: string) {
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }

  onQueryChange(query: string) {
    this.query$.next(query);
  }

  isTrack(item: any): boolean {
    return !!item.preview;
  }

  scrollToSearchInput(type: 'artist' | 'album') {
    const placeholderMap = {
      artist: 'Busca un artista (ej: Daft Punk)...',
      album: 'Busca un álbum (ej: Discovery)...',
    };

    this.searchValue = '';

    if (this.searchBlockRef) {
      this.searchBlockRef.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      const inputEl = this.searchBlockRef.nativeElement.querySelector('input');
      if (inputEl) {
        inputEl.focus();
        inputEl.setAttribute('placeholder', placeholderMap[type]);
      }
    }
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
openLogin() {
    this.showLogin = true;
  }

  openRegister() {
    this.showRegister = true;
    this.showLogin = false;
  }

  closeModals() {
    this.showLogin = false;
    this.showRegister = false;
  }

  logout() {
    this.authService.logout();
  }

  confirmLogout() {
    this.logout();
    this.showLogoutConfirm = false;
  }

 
}
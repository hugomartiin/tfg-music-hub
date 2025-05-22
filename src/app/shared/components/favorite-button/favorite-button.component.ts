import { Component, Input, signal, computed, effect, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeezerTrack } from '../../../interfaces/interfaces';
import { UserDataService } from '../../../services/user-data.service';
import { ToastService } from '../../../services/toast.service';
@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-button.component.html',
})
export class FavoriteButtonComponent {
  @Input() track!: DeezerTrack;

  private localFavorites = signal<DeezerTrack[]>([]);
  showAlert = signal(false);
  alertMessage = signal('');

  isFavorite = computed(() =>
    this.track && this.localFavorites().some(fav => fav.id === this.track.id)
  );

  constructor(private userDataService: UserDataService,  private toast: ToastService
) {
    this.userDataService.getFavorites$().subscribe(favs => {
      this.localFavorites.set(favs);
    });

  
  }

  async toggleFavorite() {
    if (!this.track?.id) return;

    if (this.isFavorite()) {
    this.userDataService.removeFavorite(this.track.id);
    this.toast.show(`"${this.track.title}" eliminado de favoritos`);
  } else {
    this.userDataService.addFavorite(this.track);
    this.toast.show(`"${this.track.title}" añadido a favoritos`);
  }
  }

}

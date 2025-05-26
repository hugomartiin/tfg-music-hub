import { Component, computed, effect, inject, signal } from '@angular/core';
import { AsyncPipe, NgIf, NgFor, CommonModule } from '@angular/common';
import { UserDataService } from '../../services/user-data.service';
import { DeezerTrack } from '../../interfaces/interfaces';
import { RouterModule } from '@angular/router';
import { PreviewButtonComponent } from '../../shared/components/preview-button/preview-button.component';
import { AuthService } from '../../services/auth.service';
import { RegisterModalComponent } from '../register/register.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { TrackCardComponent } from '../../shared/components/track-card/track-card.component';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  imports: [
    CommonModule,
    TrackCardComponent
  ],
})
export class FavoritesComponent {
  favorites = signal<DeezerTrack[]>([]);
  loading = signal(true);
  user = computed(() => this.authService.currentUser());
  constructor(
    public authService: AuthService,
    private userDataService: UserDataService
  ) {
    effect(() => {
      const user = this.user();
      if (!user) {
        this.loading.set(false);
        return;
      }

      this.userDataService.getFavorites$().subscribe((tracks) => {
        this.favorites.set(tracks);
        this.loading.set(false);
      });
    });
  }

}

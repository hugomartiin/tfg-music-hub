import { Component, Input, inject, signal, effect, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistService } from '../../../services/playlist.service';
import { DeezerTrack, Playlist } from '../../../interfaces/interfaces';
import { ToastService } from '../../../services/toast.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-to-playlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-to-playlist.component.html',
})
export class AddToPlaylistComponent {
  [x: string]: any;
  @Input() track!: DeezerTrack;

  private playlistService = inject(PlaylistService);
  private toast = inject(ToastService);

  isOpen = signal(false);
  playlists = signal<Playlist[]>([]);
  newPlaylistName = signal('');

  constructor(private elementRef: ElementRef) { 
    effect(() => {
      this.playlistService.getPlaylists$().subscribe((data) => {
        this.playlists.set(data);
      });
    });
  }

  async addToPlaylist(playlist: Playlist) {
    const alreadyIn = playlist.tracks.includes(this.track.id.toString());
    if (alreadyIn) {
      this.toast.show('Ya está en la playlist');
      return;
    }

    if (!playlist.id) {
      this.toast.show('Playlist inválida');
      return;
    }
    await this.playlistService.updatePlaylist(playlist.id, {
      tracks: [...playlist.tracks, this.track.id.toString()],
    });

  this.toast.show(`Añadido "${this.track.title}" a la playlist "${playlist.name}"`);
    this.isOpen.set(false);
  }

  async createAndAdd() {
    const name = this.newPlaylistName().trim();
    if (!name) return;

    const newPlaylist: Playlist = {
      name,
      createdAt: Date.now(),
      tracks: [this.track.id.toString()],
    };

    await this.playlistService.createPlaylist(newPlaylist);
    this.toast.show(`Playlist "${name}" creada y canción "${this.track.title}" añadida`);
    this.newPlaylistName.set('');
    this.isOpen.set(false);
  }
  toggleDropdown() {
  this.isOpen.update(v => !v);
}

closeDropdown() {
  this.isOpen.set(false);
}
@HostListener('document:click', ['$event.target'])
onClickOutside(target: HTMLElement) {
  if (!this.elementRef.nativeElement.contains(target)) {
    this.isOpen.set(false);
  }
}


}

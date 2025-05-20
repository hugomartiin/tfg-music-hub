import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AudioPlayerService {
  private audio: HTMLAudioElement | null = null;

  currentUrl = signal<string | null>(null);
  isPlaying = signal(false);
  title = signal<string | null>(null);
  artist = signal<string | null>(null);
  cover = signal<string | null>(null);

  play(url: string, title?: string, artist?: string, cover?: string) {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    this.audio = new Audio(url);
    this.audio.play();
    this.currentUrl.set(url);
    this.isPlaying.set(true);
    this.title.set(title ?? null);
    this.artist.set(artist ?? null);
    this.cover.set(cover ?? null);

    this.audio.onended = () => {
      this.stop();
    };
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    }
    this.isPlaying.set(false);
    this.currentUrl.set(null);
  }

  toggle(url: string, title?: string, artist?: string, cover?: string) {
    if (this.currentUrl() === url && this.isPlaying()) {
      this.stop();
    } else {
      this.play(url, title, artist, cover);
    }
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { GlobalPlayerComponent } from './shared/components/global-player/global-player.component';
import { Router, NavigationStart } from '@angular/router';
import { AudioPlayerService } from './services/audio.service';
import * as AOS from 'aos';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent,GlobalPlayerComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tfg-music-hub';
  isHome = signal(false);
  constructor(private router: Router, private audioService: AudioPlayerService) {
    this.router.events.subscribe(event => {
  if (event instanceof NavigationStart) {
    this.audioService.stop();
  }

  if (event instanceof NavigationEnd) {
    setTimeout(() => AOS.refresh(), 100); 
  }
  if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.isHome.set(url === '/' || url.startsWith('/home'));
      }
});

  }
    
 ngOnInit(): void {
    AOS.init({
      duration: 800,
      once: true,
    });
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { Router, NavigationStart } from '@angular/router';
import { AudioPlayerService } from './services/audio.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tfg-music-hub';
  constructor(private router: Router, private audioService: AudioPlayerService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.audioService.stop();
      }
    });
  }
}

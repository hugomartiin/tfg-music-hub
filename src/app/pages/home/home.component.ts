import { Component, } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { MainCardComponent } from '../../shared/components/main-card/main-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [SearchBarComponent, MainCardComponent, CommonModule, RouterLink
],
})
export class HomeComponent {
  constructor(private router: Router) {}

  
  onSearch(query: string) {
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }
}

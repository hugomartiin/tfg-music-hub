import { Component, signal } from '@angular/core';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { LiveSearchComponent } from '../live-search/live-search.component';
import { ButtonComponent } from '../button/button.component';
import { AuthService } from '../../../services/auth.service';
import { RegisterModalComponent } from '../../../pages/register/register.component';
import { LoginModalComponent } from '../../../pages/login/login.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SearchBarComponent,
    LiveSearchComponent,
    ButtonComponent,
    RegisterModalComponent,
    LoginModalComponent,
    ModalComponent
  ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isHome = signal(false);
  showLogin = false;

  currentUser: any;

  constructor(
    private router: Router,
    public authService: AuthService
  ) {
    this.currentUser = this.authService.currentUser;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.isHome.set(url === '/' || url.startsWith('/home'));
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }

  closeLogin() {
    this.showLogin = false;
  }

  logout() {
    this.authService.logout();
  }
    onSearch(query: string) {
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }
  showRegister = false;



  openRegister() {
    this.showRegister = true;
    this.showLogin = false;
  }

  closeModals() {
    this.showLogin = false;
    this.showRegister = false;
  }
  showLogoutConfirm = false;

confirmLogout() {
  this.logout();
  this.showLogoutConfirm = false;
}

}

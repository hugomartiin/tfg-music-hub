import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginModalComponent } from '../login/login.component';
import { RegisterModalComponent } from '../register/register.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
@Component({
  selector: 'app-user',
 imports: [
    CommonModule,
    RouterModule,
    LoginModalComponent,
    RegisterModalComponent,
    ModalComponent
  ],  templateUrl: './user.component.html',
})
export class UserComponent {
showLogin = false;
showRegister = false;
  showLogoutConfirm = false;

   constructor(
    public authService: AuthService,) {

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

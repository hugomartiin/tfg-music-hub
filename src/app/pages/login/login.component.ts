import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    CommonModule,
    FormsModule,
    ModalComponent
  ]
})
export class LoginModalComponent {
  email = '';
  password = '';
  errorMsg = '';
  successMsg = '';
  loading = false;

  @Output() closed = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  close() {
    this.closed.emit();
  }

  async login() {
    this.errorMsg = '';
    this.successMsg = '';
    this.loading = true;
    try {
      const cred = await this.authService.login(this.email, this.password);
      const displayName = cred.user.displayName || cred.user.email;
      this.successMsg = `Hola, ${displayName}! Has iniciado sesión correctamente.`;
      setTimeout(() => this.close(), 2000); 
      this.email = '';
      this.password = '';
    } catch (error: any) {
      this.errorMsg = error.message || 'Error al iniciar sesión.';
    } finally {
      this.loading = false;
    }
  }

  async loginWithGoogle() {
    this.errorMsg = '';
    this.successMsg = '';
    this.loading = true;
    try {
      const cred = await this.authService.loginWithGoogle();
      const displayName = cred.user.displayName || cred.user.email;
      this.successMsg = `Hola, ${displayName}! Has iniciado sesión con Google.`;
      setTimeout(() => this.close(), 2000);

    } catch (error: any) {
      this.errorMsg = error.message || 'Error al iniciar sesión con Google.';
    } finally {
      this.loading = false;
    }
  }
  @Output() openRegisterModal = new EventEmitter<void>();

openRegister() {
  this.close(); // cerrar login
  this.openRegisterModal.emit(); // abrir register
}
}

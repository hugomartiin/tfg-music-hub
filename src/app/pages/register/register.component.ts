// register.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ModalComponent } from '../../shared/components/modal/modal.component';

@Component({
  selector: 'app-register-modal',
  standalone: true,
  templateUrl: './register.component.html',
  imports: [CommonModule, FormsModule,ModalComponent]
})
export class RegisterModalComponent {
  email = '';
  password = '';
  confirmPassword = '';
  errorMsg = '';
  successMsg = '';
  loading = false;

  @Output() closed = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  close() {
    this.closed.emit();
  }

  async register() {
    this.errorMsg = '';
    this.successMsg = '';
    if (this.password !== this.confirmPassword) {
      this.errorMsg = 'Las contraseñas no coinciden.';
      return;
    }

    this.loading = true;
    try {
      const cred = await this.authService.register(this.email, this.password);
      const displayName = cred.user.displayName || cred.user.email;
      this.successMsg = `Cuenta creada con éxito. Bienvenido, ${displayName}!`;
      this.email = '';
      this.password = '';
      this.confirmPassword = '';
    } catch (error: any) {
      this.errorMsg = error.message || 'Error al registrar la cuenta.';
    } finally {
      this.loading = false;
    }
  }
}

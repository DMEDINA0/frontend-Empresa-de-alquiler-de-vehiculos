import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';
import { UsuarioService } from '../../../core/services/usuario.service';
import { CreateUsuarioRequest } from '../../../shared/models/usuario.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-container">
      <div class="register-card slide-in-up">
        <div class="card glass">
          <div class="card-header text-center">
            <div class="register-icon">✨</div>
            <h2 class="card-title text-title-contrast">Crear Cuenta</h2>
            <p class="register-subtitle text-high-contrast">Únete a nuestro sistema</p>
          </div>
          
          <div class="card-body">
            <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
              <div class="form-group">
                <label for="email" class="form-label">
                  <span class="label-icon">📧</span>
                  Email
                </label>
                <input 
                  type="email" 
                  id="email"
                  class="form-control" 
                  [(ngModel)]="registerData.email"
                  name="email"
                  required
                  email
                  placeholder="tu@email.com"
                  #email="ngModel"
                  [class.is-invalid]="email.invalid && email.touched"
                >
                <div class="invalid-feedback" *ngIf="email.invalid && email.touched">
                  <div *ngIf="email.errors?.['required']">El email es requerido</div>
                  <div *ngIf="email.errors?.['email']">El email no es válido</div>
                </div>
              </div>

              <div class="form-group">
                <label for="password" class="form-label">
                  <span class="label-icon">🔑</span>
                  Contraseña
                </label>
                <input 
                  type="password" 
                  id="password"
                  class="form-control" 
                  [(ngModel)]="registerData.password"
                  name="password"
                  required
                  minlength="6"
                  placeholder="••••••••"
                  #password="ngModel"
                  [class.is-invalid]="password.invalid && password.touched"
                >
                <div class="invalid-feedback" *ngIf="password.invalid && password.touched">
                  <div *ngIf="password.errors?.['required']">La contraseña es requerida</div>
                  <div *ngIf="password.errors?.['minlength']">La contraseña debe tener al menos 6 caracteres</div>
                </div>
              </div>

              <div class="form-group">
                <label for="primer_nombre" class="form-label">
                  <span class="label-icon">👤</span>
                  Nombre
                </label>
                <input 
                  type="text" 
                  id="primer_nombre"
                  class="form-control" 
                  [(ngModel)]="registerData.primer_nombre"
                  name="primer_nombre"
                  required
                  minlength="2"
                  placeholder="Tu nombre"
                  #primer_nombre="ngModel"
                  [class.is-invalid]="primer_nombre.invalid && primer_nombre.touched"
                >
                <div class="invalid-feedback" *ngIf="primer_nombre.invalid && primer_nombre.touched">
                  <div *ngIf="primer_nombre.errors?.['required']">El nombre es requerido</div>
                  <div *ngIf="primer_nombre.errors?.['minlength']">El nombre debe tener al menos 2 caracteres</div>
                </div>
              </div>

              <div class="form-group">
                <label for="primer_apellido" class="form-label">
                  <span class="label-icon">👥</span>
                  Apellido
                </label>
                <input 
                  type="text" 
                  id="primer_apellido"
                  class="form-control" 
                  [(ngModel)]="registerData.primer_apellido"
                  name="primer_apellido"
                  required
                  minlength="2"
                  placeholder="Tu apellido"
                  #primer_apellido="ngModel"
                  [class.is-invalid]="primer_apellido.invalid && primer_apellido.touched"
                >
                <div class="invalid-feedback" *ngIf="primer_apellido.invalid && primer_apellido.touched">
                  <div *ngIf="primer_apellido.errors?.['required']">El apellido es requerido</div>
                  <div *ngIf="primer_apellido.errors?.['minlength']">El apellido debe tener al menos 2 caracteres</div>
                </div>
              </div>

              <div class="form-group">
                <label for="rol_usuario" class="form-label">
                  <span class="label-icon">🛡️</span>
                  Rol
                </label>
                <select
                  id="rol_usuario"
                  class="form-control"
                  [(ngModel)]="registerData.rol_usuario"
                  name="rol_usuario"
                  required
                >
                  <option value="usuario">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              <div class="form-group">
                <button 
                  type="submit" 
                  class="btn btn-primary w-100 btn-lg"
                  [disabled]="registerForm.invalid || loading"
                  [class.loading]="loading"
                >
                  <span *ngIf="loading" class="spinner"></span>
                  <span *ngIf="loading">Registrando...</span>
                  <span *ngIf="!loading">
                    <span class="btn-icon">✨</span>
                    Crear Cuenta
                  </span>
                </button>
              </div>

              <div class="form-options">
                <div class="text-center">
                  <span class="login-text">¿Ya tienes cuenta? </span>
                  <a routerLink="/auth/login" class="link">
                    <span class="link-icon">🔐</span>
                    Inicia sesión aquí
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [/* tus estilos ya están bien definidos, no necesitan cambios */]
})
export class RegisterComponent implements OnInit {
  registerData: CreateUsuarioRequest = {
    email: '',
    password: '',
    primer_nombre: '',
    primer_apellido: '',
    rol_usuario: 'usuario'
  };
  
  loading = false;

  constructor(
    private usuarioService: UsuarioService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // TODO: Implementar verificación de autenticación si es necesario
  }

  onSubmit(): void {
    if (this.loading) return;

    this.loading = true;
    
    this.usuarioService.createUsuario(this.registerData).subscribe({
      next: () => {
        this.notificationService.showSuccess('Usuario registrado exitosamente');
        this.router.navigate(['/auth/login']);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error en registro:', error);
        this.notificationService.showError('Error al registrar usuario. Intenta nuevamente.');
        this.loading = false;
      }
    });
  }
}
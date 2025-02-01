// src/app/component/auth/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
  ],
  template: `
    <div class="auth-container">
      <mat-card class="auth-card">
        <mat-card-header>
          <mat-card-title>Connexion</mat-card-title>
        </mat-card-header>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input
              matInput
              formControlName="email"
              placeholder="votre@email.com"
              type="email"
            />
            <mat-error *ngIf="loginForm.get('email')?.errors?.['required']">
              L'email est requis
            </mat-error>
            <mat-error *ngIf="loginForm.get('email')?.errors?.['email']">
              Email invalide
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Mot de passe</mat-label>
            <input matInput formControlName="password" type="password" />
            <mat-error *ngIf="loginForm.get('password')?.errors?.['required']">
              Le mot de passe est requis
            </mat-error>
          </mat-form-field>

          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="loginForm.invalid || isSubmitting"
          >
            {{ isSubmitting ? 'Connexion en cours...' : 'Se connecter' }}
          </button>

          <p class="register-link">
            Pas encore de compte ?
            <a [routerLink]="['/register']">S'inscrire</a>
          </p>
        </form>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .auth-container {
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: linear-gradient(to right, #141e30, #243b55);
      }

      .auth-card {
        width: 100%;
        max-width: 400px;
        padding: 20px;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .register-link {
        text-align: center;
        margin-top: 16px;
      }

      .register-link a {
        color: #1976d2;
        text-decoration: none;
      }

      .register-link a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.snackBar.open(error.message, 'Fermer', { duration: 3000 });
          this.isSubmitting = false;
        },
      });
    }
  }
}

// src/app/component/auth/register/register.component.ts
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
  selector: 'app-register',
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
          <mat-card-title>Inscription</mat-card-title>
        </mat-card-header>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline">
            <mat-label>Nom</mat-label>
            <input matInput formControlName="name" placeholder="Votre nom" />
            <mat-error *ngIf="registerForm.get('name')?.errors?.['required']">
              Le nom est requis
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input
              matInput
              formControlName="email"
              placeholder="votre@email.com"
              type="email"
            />
            <mat-error *ngIf="registerForm.get('email')?.errors?.['required']">
              L'email est requis
            </mat-error>
            <mat-error *ngIf="registerForm.get('email')?.errors?.['email']">
              Email invalide
            </mat-error>
            <mat-error
              *ngIf="registerForm.get('email')?.errors?.['emailTaken']"
            >
              Cet email est déjà utilisé
            </mat-error>
          </mat-form-field>

         

          <mat-form-field appearance="outline">
            <mat-label>Mot de passe</mat-label>
            <input matInput formControlName="password" type="password" />
            <mat-hint
              >Le mot de passe doit contenir au moins 6 caractères</mat-hint
            >

            <mat-error
              *ngIf="registerForm.get('password')?.errors?.['minlength']"
            >
              Le mot de passe doit contenir au moins 6 caractères
            </mat-error>
          </mat-form-field>

          <button
            mat-raised-button
            color="primary"
            type="submit"
            [disabled]="registerForm.invalid || isSubmitting"
          >
            {{ isSubmitting ? 'Inscription en cours...' : 'Créer mon compte' }}
          </button>

          <p class="login-link">
            Déjà un compte ? <a [routerLink]="['/login']">Se connecter</a>
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

      .login-link {
        text-align: center;
        margin-top: 16px;
      }

      .login-link a {
        color: #1976d2;
        text-decoration: none;
      }

      .login-link a:hover {
        text-decoration: underline;
      }
    `,
  ],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isSubmitting = true;
      this.authService.register(this.registerForm.value).subscribe({
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

  checkEmail(): void {
    const email = this.registerForm.get('email')?.value;
    if (email && this.registerForm.get('email')?.valid) {
      this.authService.isEmailTaken(email).subscribe((isTaken) => {
        if (isTaken) {
          this.registerForm.get('email')?.setErrors({ emailTaken: true });
        }
      });
    }
  }
}

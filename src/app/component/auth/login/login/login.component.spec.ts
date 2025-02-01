// src/app/component/auth/login/login.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        RouterTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test pour vérifier que le formulaire est invalide au départ
  it('form should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  // Test pour vérifier la validation de l'email
  it('email field validity', () => {
    const email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();

    email.setValue('test');
    expect(email.hasError('email')).toBeTruthy();

    email.setValue('test@test.com');
    expect(email.valid).toBeTruthy();
  });
});

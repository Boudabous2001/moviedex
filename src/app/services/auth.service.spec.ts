// src/app/services/auth.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    localStorage.clear(); // Nettoyer le localStorage avant chaque test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a new user', (done) => {
    const testUser = {
      name: 'Test User',
      email: 'test@test.com',
      password: 'password123',
    };

    service.register(testUser).subscribe({
      next: (response) => {
        expect(response.user.email).toBe(testUser.email);
        done();
      },
      error: (error) => {
        fail(error);
      },
    });
  });

  it('should not register user with existing email', (done) => {
    const testUser = {
      name: 'Test User',
      email: 'existing@test.com',
      password: 'password123',
    };

    // Premier enregistrement
    service.register(testUser).subscribe({
      next: () => {
        // Tentative de deuxième enregistrement avec le même email
        service.register(testUser).subscribe({
          next: () => {
            fail('Should not register duplicate email');
          },
          error: (error) => {
            expect(error.message).toBe('Cet email est déjà utilisé');
            done();
          },
        });
      },
    });
  });

  it('should login with valid credentials', (done) => {
    const testUser = {
      name: 'Test User',
      email: 'test@test.com',
      password: 'password123',
    };

    service.register(testUser).subscribe(() => {
      service
        .login({
          email: testUser.email,
          password: testUser.password,
        })
        .subscribe((response) => {
          expect(response.user.email).toBe(testUser.email);
          done();
        });
    });
  });
});

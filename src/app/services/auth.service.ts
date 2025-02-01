// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '../model/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }

    this.initAdminUser();
  }

  private initAdminUser() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const adminExists = users.some(
      (user: User) => user.email === 'admin@admin.com'
    );

    if (!adminExists) {
      const adminUser = {
        id: 'admin-1',
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'admin123',
        role: 'ADMIN',
      };
      users.push(adminUser);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }
  register(user: User): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((u: User) => u.email === user.email)) {
      return throwError(() => new Error('Cet email est déjà utilisé'));
    }

    const newUser = {
      id: Date.now().toString(),
      ...user,
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    this.setCurrentUser(newUser);

    return of({ user: newUser });
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u: User) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      this.setCurrentUser(user);
      return of({ user });
    }

    return throwError(() => new Error('Email ou mot de passe incorrect'));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  isEmailTaken(email: string): Observable<boolean> {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.some((user: User) => user.email === email);
    return of(exists);
  }

  isAdmin(): boolean {
    const currentUser = this.currentUserSubject.value;
    return currentUser?.email === 'admin@admin.com'; 
  }

  getAllUsers(): any[] {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.filter((user: any) => user.email !== 'admin@admin.com');
  }

  deleteUser(userId: string): void {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users = users.filter((user: any) => user.id !== userId);
    localStorage.setItem('users', JSON.stringify(users));
  }

  private setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }
}

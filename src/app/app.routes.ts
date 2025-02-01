// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { adminGuard } from './guard/admin.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./component/movies/movies/movies.component').then(
        (m) => m.MoviesComponent
      ),
    canActivate: [authGuard],
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import(
        './component/movie-details/movie-details/movie-details.component'
      ).then((m) => m.MovieDetailsComponent),
    canActivate: [authGuard],
  },
  {
    path: 'upcoming',
    loadComponent: () =>
      import('./component/movies/movies/movies.component').then(
        (m) => m.MoviesComponent
      ),
  },
  {
    path: 'top-rated',
    loadComponent: () =>
      import('./component/movies/movies/movies.component').then(
        (m) => m.MoviesComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./component/auth/login/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./component/auth/register/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./component/users/users/users.component').then(
        (m) => m.UsersComponent
      ),
    canActivate: [authGuard, adminGuard],
  },
];

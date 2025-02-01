// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./component/movies/movies/movies.component').then(
        (m) => m.MoviesComponent
      ),
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import(
        './component/movie-details/movie-details/movie-details.component'
      ).then((m) => m.MovieDetailsComponent),
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
];

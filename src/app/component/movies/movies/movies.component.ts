import { Component, OnInit } from '@angular/core';
import { Movie } from '../../../model/movie.interface';
import { MovieService } from '../../../services/movie.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatChipsModule,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  currentPage = 1;
  loading = false;
  currentGenre: number | null = null;
  currentGenreName: string = '';
  genres: any[] = [];

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMovies();

    this.movieService.getGenres().subscribe((response) => {
      this.genres = response.genres;
    });

    this.route.queryParams.subscribe((params) => {
      this.currentGenre = params['genre'] ? +params['genre'] : null;
      if (this.currentGenre) {
        this.currentGenreName =
          this.genres.find((g) => g.id === this.currentGenre)?.name || '';
      }
      this.loadMovies();
    });
  }

  loadMovies(): void {
    this.loading = true;

    const request = this.currentGenre
      ? this.movieService.getMoviesByGenre(this.currentGenre, this.currentPage)
      : this.movieService.getMovies(this.currentPage);

    request.subscribe({
      next: (response) => {
        this.movies = response.results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des films:', error);
        this.loading = false;
      },
    });
  }
}

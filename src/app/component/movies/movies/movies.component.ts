import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // Assurez-vous que cet import est présent
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { Movie } from '../../../model/movie.interface';
import { MovieService } from '../../../services/movie.service';

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
    MatPaginatorModule,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  loading = false;
  currentGenre: number | null = null;
  currentGenreName: string = '';
  genres: any[] = [];
  isInViewport = false;
  totalMovies = 0;
  currentPage = 1;

  pageSize = 10;
  totalItems = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMovies();
    this.setupLazyLoading();

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
    const pageNumber = this.currentPage + 1;

    this.movieService.getMovies(pageNumber).subscribe({
      next: (response) => {
        this.movies = response.results;
        this.totalItems = response.total_results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des films:', error);
        this.loading = false;
      },
    });
  }

  setupLazyLoading() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.isInViewport = true;
        }
      });
    }, options);

    document.querySelectorAll('.movie-card').forEach((card) => {
      observer.observe(card);
    });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadMovies();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  onScroll() {
    this.loadMovies();
  }
}

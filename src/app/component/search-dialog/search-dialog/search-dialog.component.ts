// src/app/component/search-dialog/search-dialog.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { MovieService } from '../../../services/movie.service';

@Component({
  selector: 'app-search-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
  ],
  template: `
    <div class="search-container">
      <mat-form-field appearance="outline" class="search-field">
        <mat-label>Rechercher un film</mat-label>
        <input
          matInput
          [(ngModel)]="searchQuery"
          (ngModelChange)="searchQueryChanged($event)"
          placeholder="Ex: Inception"
          autocomplete="off"
        />
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>

      <div class="results-container" *ngIf="searchResults.length > 0">
        <div
          *ngFor="let movie of searchResults"
          class="result-item"
          (click)="selectMovie(movie)"
        >
          <img
            *ngIf="movie.poster_path"
            [src]="'https://image.tmdb.org/t/p/w92' + movie.poster_path"
            [alt]="movie.title"
            class="movie-poster"
          />
          <div class="movie-info">
            <h3>{{ movie.title }}</h3>
            <p class="year">{{ movie.release_date | date : 'yyyy' }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .search-container {
        padding: 16px;
        width: 500px;
        max-width: 100%;
      }

      .search-field {
        width: 100%;
      }

      .results-container {
        max-height: 400px;
        overflow-y: auto;
      }

      .result-item {
        display: flex;
        align-items: center;
        padding: 8px;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.2s;
      }

      .result-item:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }

      .movie-poster {
        width: 45px;
        height: 68px;
        object-fit: cover;
        margin-right: 16px;
        border-radius: 4px;
      }

      .movie-info {
        flex: 1;
      }

      .movie-info h3 {
        margin: 0;
        font-size: 16px;
      }

      .year {
        margin: 4px 0 0;
        color: rgba(0, 0, 0, 0.6);
        font-size: 14px;
      }
    `,
  ],
})
export class SearchDialogComponent implements OnInit {
  searchQuery = '';
  searchResults: any[] = [];
  private searchSubject = new Subject<string>();

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.movieService.searchMovies(query))
      )
      .subscribe((results) => {
        this.searchResults = results.results;
      });
  }

  searchQueryChanged(query: string) {
    if (query.length >= 2) {
      this.searchSubject.next(query);
    } else {
      this.searchResults = [];
    }
  }

  selectMovie(movie: any) {
    this.router.navigate(['/movie', movie.id]);
  }
}

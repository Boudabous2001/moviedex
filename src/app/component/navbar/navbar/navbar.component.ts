// src/app/component/navbar/navbar.component.ts
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchDialogComponent } from '../../search-dialog/search-dialog/search-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MovieService } from '../../../services/movie.service';

interface Genre {
  id: number;
  name: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  template: `
    <mat-toolbar color="primary">
      <a mat-button routerLink="/" class="logo">TMDB Movies</a>
      <span class="spacer"></span>


     <button mat-button [matMenuTriggerFor]="categoriesMenu">
        Catégories
        <mat-icon>arrow_drop_down</mat-icon>
      </button>
      <mat-menu #categoriesMenu="matMenu">
        <button mat-menu-item *ngFor="let genre of genres" 
                (click)="selectGenre(genre)">
          {{ genre.name }}
        </button>
      </mat-menu>


      <button *ngIf="authService.isAdmin()" 
              mat-button 
              routerLink="/users"
              class="users-btn">
        <mat-icon>people</mat-icon>
        Utilisateurs
      </button>


      <a mat-button routerLink="/films">Films</a>
      <button mat-icon-button (click)="openSearch()">
        <mat-icon>search</mat-icon>
      </button>
      <ng-container *ngIf="!isLoggedIn; else loggedInTpl">
        <button mat-button routerLink="/login">Connexion</button>
      </ng-container>
      <ng-template #loggedInTpl>
        <button mat-button (click)="logout()">Déconnexion</button>
      </ng-template>
    </mat-toolbar>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
      .logo {
        font-size: 1.2rem;
        font-weight: bold;
      }
    `,
  ],
})
export class NavbarComponent implements OnInit{
  genres: any[] = [];
  isAdmin = false;
  selectedGenre: Genre | null = null;

  constructor(
    private dialog: MatDialog,
    public authService: AuthService,
    private router: Router,
    private movieService: MovieService,
  ) {}

  ngOnInit() {
    this.loadGenres();
    this.isAdmin = this.authService.isAdmin();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  openSearch() {
    this.dialog.open(SearchDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      maxHeight: '90vh',
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  loadGenres() {
    this.movieService.getGenres().subscribe({
      next: (response) => {
        this.genres = response.genres;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des catégories:', error);
      }
    });
  }

  selectGenre(genre: any) {
    this.router.navigate(['/'], { 
      queryParams: { genre: genre.id },
      queryParamsHandling: 'merge' 
    });
  }
  
}

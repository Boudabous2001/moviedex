// src/app/component/navbar/navbar.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SearchDialogComponent } from '../../search-dialog/search-dialog/search-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <mat-toolbar color="primary">
      <a mat-button routerLink="/" class="logo">MOVIEDEX</a>
      <span class="spacer"></span>
      <a mat-button routerLink="/films">Films</a>
      <button mat-icon-button (click)="openSearch()">
        <mat-icon>search</mat-icon>
      </button>
      <button mat-button>Connexion</button>
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
export class NavbarComponent {
  constructor(private dialog: MatDialog) {}

  openSearch() {
    this.dialog.open(SearchDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      maxHeight: '90vh',
    });
  }
  navItems = [
    { path: '/', label: 'Popular', icon: '🔥', exact: true },
    { path: '/upcoming', label: 'Upcoming', icon: '🔜', exact: false },
    { path: '/top-rated', label: 'Top Rated', icon: '⭐', exact: false },
  ];
}

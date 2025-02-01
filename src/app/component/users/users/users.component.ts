// src/app/component/users/users.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Gestion des utilisateurs</h2>

      <table mat-table [dataSource]="users" class="w-full">
        <!-- Nom Column -->
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef>Nom</th>
          <td mat-cell *matCellDef="let user">{{ user.name }}</td>
        </ng-container>

        <!-- Email Column -->
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef>Email</th>
          <td mat-cell *matCellDef="let user">{{ user.email }}</td>
        </ng-container>

        <!-- Actions Column -->
        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let user">
            <button mat-icon-button color="warn" (click)="deleteUser(user)">
              <mat-icon>delete</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>
    </div>
  `,
  styles: [
    `
      .container {
        margin-top: 20px;
      }

      table {
        width: 100%;
        background: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .mat-column-actions {
        width: 100px;
        text-align: center;
      }
    `,
  ],
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  displayedColumns: string[] = ['name', 'email', 'actions'];

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users = this.authService.getAllUsers();
  }

  deleteUser(user: any) {
    if (
      confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.name} ?`)
    ) {
      this.authService.deleteUser(user.id);
      this.loadUsers();
      this.snackBar.open('Utilisateur supprimé avec succès', 'Fermer', {
        duration: 3000,
      });
    }
  }
}

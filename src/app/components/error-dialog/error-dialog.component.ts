import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
export class ErrorDialogComponent {
  constructor(public dialogRef: MatDialogRef<ErrorDialogComponent>, private auth: AuthService) {}

  closeDialog() {
    this.dialogRef.close();
  }

  login() {
    console.log('Iniciando fluxo de login...');
    this.auth.loginWithRedirect().subscribe({
      error: (err) => console.error('Erro no login:', err) // Log para depuração
    });
    this.closeDialog();
  }
}






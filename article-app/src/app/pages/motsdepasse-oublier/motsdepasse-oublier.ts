import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface ResetPasswordResponse {
  code: string;
  message: string;
  data: string | null; // Le nouveau mot de passe
}

@Component({
  selector: 'app-motsdepasse-oublier',
  standalone: true,
  imports: [HttpClientModule, FormsModule, RouterModule],
  templateUrl: './motsdepasse-oublier.html',
  styleUrl: './motsdepasse-oublier.scss'
})
export class MotsdepasseOublier {
  email: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  newPassword: string | null = null;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  onSubmit() {
    console.log('Demande de réinitialisation pour:', this.email);
    
    this.httpClient.post<ResetPasswordResponse>('http://127.0.0.1:3000/reset-password', { email: this.email })
      .subscribe({
        next: (response) => {
          console.log('Réponse reçue:', response);
          
          if (response.code === '200') {
            this.successMessage = 'Un nouveau mot de passe a été généré !';
            this.newPassword = response.data;
            this.errorMessage = '';
          } else {
            this.errorMessage = response.message;
            this.successMessage = '';
          }
        },
        error: (error) => {
          console.error('Erreur de réinitialisation:', error);
          this.errorMessage = 'Erreur lors de la réinitialisation. Veuillez réessayer.';
          this.successMessage = '';
        }
      });
  }
}

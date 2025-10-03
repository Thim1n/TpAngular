import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface LoginResponse {
  code: string;
  message: string;
  data: string | null; // Le token JWT
}

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [HttpClientModule, FormsModule, RouterModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.scss'
})
export class Connexion {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    console.log('Tentative de connexion...', loginData);
    
    this.httpClient.post<LoginResponse>('http://127.0.0.1:3000/login', loginData)
      .subscribe({
        next: (response) => {
          console.log('Réponse reçue:', response);
          
          if (response.code === '200') {
            // Stockage du token dans le localStorage
            localStorage.setItem('token', response.data as string);
            console.log('Connexion réussie');
            // Redirection vers la liste des articles
            this.router.navigate(['/liste-des-articles']);
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (error) => {
          console.error('Erreur de connexion:', error);
          this.errorMessage = 'Erreur lors de la connexion. Veuillez réessayer.';
        }
      });
  }
}

import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface SignupResponse {
  code: string;
  message: string;
  data: any;
}

@Component({
  selector: 'app-inscription',
  imports: [HttpClientModule, FormsModule, RouterModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.scss'
})
export class Inscription {
  formData = {
    email: '',
    password: '',
    passwordConfirm: '',
    pseudo: '',
    cityCode: '',
    city: '',
    phone: ''
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  onSubmit() {
    console.log('Tentative d\'inscription...', this.formData);

    if (this.formData.password.length ==0 || this.formData.city.length ==0 || this.formData.email.length ==0 || this.formData.pseudo.length ==0 || this.formData.cityCode.length ==0 || this.formData.phone.length ==0) {
      this.errorMessage = 'Tous les champs doivent être remplis.';
      return;
    }
    
    this.httpClient.post<SignupResponse>('http://127.0.0.1:3000/signup', this.formData)
      .subscribe({
        next: (response) => {
          console.log('Réponse reçue:', response);
          
          if (response.code === '200') {
            this.successMessage = 'Inscription réussie ! Redirection vers la page de connexion...';
            this.errorMessage = '';
            
            // Redirection vers la page de connexion après 2 secondes
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          } else {
            this.errorMessage = response.message;
            this.successMessage = '';
          }
        },
        error: (error) => {
          console.error('Erreur d\'inscription:', error);
          this.errorMessage = 'Erreur lors de l\'inscription. Veuillez réessayer.';
          this.successMessage = '';
        }
      });
  }
}
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Article } from '../../models/article';

interface ApiResponse {
  code: string;
  message: string;
  data: any;
}

@Component({
  selector: 'app-formulaire',
  standalone: true,
  imports: [HttpClientModule, FormsModule, RouterModule],
  templateUrl: './formulaire.html',
  styleUrl: './formulaire.scss'
})
export class Formulaire implements OnInit {
  article: Article = new Article();
  isEditMode: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Vérifie si on est en mode édition (si un ID est présent dans l'URL)
    this.route.params.subscribe(params => {
      const articleId = params['id'];
      if (articleId) {
        this.isEditMode = true;
        this.loadArticle(articleId);
      }
    });
  }

  loadArticle(id: string) {
    this.httpClient.get<ApiResponse>(`http://127.0.0.1:3000/articles/${id}`)
      .subscribe({
        next: (response) => {
          if (response.code === '200') {
            this.article = response.data;
          } else {
            this.errorMessage = 'Erreur lors du chargement de l\'article';
          }
        },
        error: (error) => {
          console.error('Erreur de chargement:', error);
          this.errorMessage = 'Erreur lors du chargement de l\'article';
        }
      });
  }

  onSubmit() {
    const url = 'http://127.0.0.1:3000/articles/save';
    const method = 'post';
    
    console.log(`${this.isEditMode ? 'Modification' : 'Création'} de l'article:`, this.article);
    
    (this.httpClient[method] as any)(url, this.article)
      .subscribe({
        next: (response: { code: string; message: string; }) => {
          if (response.code === '200') {
            this.successMessage = this.isEditMode 
              ? 'Article modifié avec succès !'
              : 'Article créé avec succès !';
            
            // Redirection vers la liste des articles après 2 secondes
            setTimeout(() => {
              this.router.navigate(['/liste-des-articles']);
            }, 2000);
          } else {
            this.errorMessage = response.message;
          }
        },
        error: (error: any) => {
          console.error('Erreur:', error);
          this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
        }
      });
  }
}

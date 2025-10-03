import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Article } from '../../models/article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-des-articles',
  imports: [HttpClientModule],
  templateUrl: './liste-des-articles.html',
  styleUrl: './liste-des-articles.scss'
})
export class ListeDesArticles {
  articles: Article[] = [];
  public constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  navigateToCreateArticle() {
    this.router.navigate(['/formulaire']);
  }

  navigateToDetails(articleId: number) {
    this.router.navigate(['/details-article', articleId]);
  }

  onClickAppelAPI() {
    console.log("Appel API\n");
    //// Recuperre les donner de l'api
    const url = "http://127.0.0.1:3000/articles"
    this.httpClient.get(url).subscribe(
      {
        next: (response: any) => {
          console.log("\nDonnées reçues :");
          const articles = response.data; // Récupère uniquement le tableau d'articles
          console.log(articles);
          this.articles = articles;
        }
      });
  }

}
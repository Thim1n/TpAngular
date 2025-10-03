import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Article } from '../../models/article';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-article',
  imports: [HttpClientModule],
  templateUrl: './detail-article.html',
  styleUrl: './detail-article.scss'
})
export class DetailAtricles implements OnInit {
  article: Article | null = null;
  
  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupère l'ID depuis l'URL et charge l'article
    this.route.params.subscribe(params => {
      const articleId = params['id'];
      this.loadArticle(articleId);
    });
  }

  loadArticle(articleId: string): void {
    console.log(`Chargement de l'article ${articleId}`);
    const url = `http://127.0.0.1:3000/articles/${articleId}`;
    this.httpClient.get(url).subscribe({
      next: (response: any) => {
        this.article = response.data;
      }
    });
  }

  navigateToEdit(): void {
    if (this.article) {
      this.router.navigate(['/formulaire', this.article.id]);
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../../services/NewsApi/news-api.service';
import { Article } from '../../models/Articles';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.css',
})
export class NewsPageComponent implements OnInit {
  private articles: Article[] = []
  TopArticles: Article[] = []
  Article!: Article

  constructor(private News: NewsApiService) { }

  ngOnInit(): void {
    this.GetNews();
  }

  TitleClicked(article: Article){
    this.Article = article
  }

  GetNews() {
    this.News.getNews().subscribe((data) => {
      this.articles = data.articles
      console.log("news comp: ", this.articles)
      this.TopArticles = this.articles.slice(0, 100)
    })
  }
}

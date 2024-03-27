import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../../services/NewsApi/news-api.service';
import { Article } from '../../models/Articles';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.css',
  providers: [DatePipe]
})
export class NewsPageComponent implements OnInit {
  private articles: Article[] = [];
  TopArticles: Article[] = [];
  Article!: Article;

  constructor(private News: NewsApiService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.GetNews();
  }

  TitleClicked(article: Article) {
    this.Article = article;
  }

  GetNews() {
    this.News.getNews().subscribe((data) => {
      this.articles = data.articles;
      this.TopArticles = this.articles.slice(0, 10);
      console.log('news comp: ', this.TopArticles);
      console.log("article:", this.Article)
    });
  }

  togglemenu() {
    var articlesSection = document.getElementById('titles');
    articlesSection?.classList.toggle('visible');
  }

  
}

import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../../services/NewsApi/news-api.service';
@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.css',
})
export class NewsPageComponent implements OnInit{
  constructor(private News: NewsApiService) {}

  ngOnInit(): void {
    this.GetNews();
  }

  GetNews() {
    this.News.getNews().subscribe((data) =>{
      console.log("news: ", data)
    })
  }
}

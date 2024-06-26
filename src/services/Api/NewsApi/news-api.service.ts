import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from '../../../models/Articles';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private apiUrl = 'https://newsapi.org/v2/everything';
  private apiKey = '2d68032cb7464311b4a5ac763d8b667c';
  private FromDate = Date.now() - 7
  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
    const sortBy = 'publishedAt';
    const query = 'Crypto';

    const url = `${this.apiUrl}?q=${query}&from=${this.FromDate}&sortBy=${sortBy}&apiKey=${this.apiKey}`;

    return this.http.get<Article>(url);
  }
}


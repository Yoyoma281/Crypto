import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {
  private apiUrl = 'https://newsapi.org/v2/everything';
  private apiKey = process.env['NEWS_API_KEY'];
  constructor(private http: HttpClient) { }

  getNews(): Observable<any> {
    const fromDate = '2024-02-01';
    const sortBy = 'publishedAt';
    const query = 'Binance';

    const url = `${this.apiUrl}?q=${query}&from=${fromDate}&sortBy=${sortBy}&apiKey=${this.apiKey}`;

    return this.http.get<any>(url);
  }
}


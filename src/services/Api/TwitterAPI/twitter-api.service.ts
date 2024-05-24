import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwitterService {
  private apiUrl = 'https://api.twitter.com/2/tweets/search/recent';
  private bearerToken = 'AAAAAAAAAAAAAAAAAAAAAJEMrwEAAAAA2Evvi7SGQUE8Yw6CT%2FYcoovzZd0%3DHdZmzStoinE9BRsH2VgbdB0LWvXatKttuUWInxMgzYUQ92NfHm'; // Obtain this token from Twitter developer portal

  constructor(private http: HttpClient) { }

  // Method to fetch tweets based on a keyword
  getTweets(keyword: string): Observable<any> {
    // Define the Twitter API endpoint and parameters
    const url = `${this.apiUrl}?query=${encodeURIComponent(keyword)}`;

    // Set up HTTP headers with the Twitter API bearer token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.bearerToken}`
    });

    // Make a GET request to the Twitter API
    return this.http.get(url, { headers });
  }
}

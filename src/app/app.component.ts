import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Coin } from '../models/Coin';
import { BinanceApiService } from '../services/Api/BinanceApi/binance-api.service';
import { InternetConnectionService } from '../services/Accessories/internet-connection/internet-connection.service';
import { ScrollToTopService } from '../services/Accessories/scrolling/scrolling.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private Api: BinanceApiService,
    private Internet: InternetConnectionService,
    private Scroll: ScrollToTopService
  ) {}

  ngOnInit(): void {
     this.Scroll.scrollToTopOnRouteChange()

    this.Internet.checkConnectivity().subscribe((online) => {
      if (online) {
        console.log('Internet connection is available');
        location.reload();
      } else {
        console.log('No internet connection');
      }
    });
  }
}

import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  Renderer2,
  ElementRef,
  HostListener,
} from '@angular/core';
import { Coin } from '../../models/Coin';
import { BinanceTrade } from '../../models/TradeData';
import { BinanceApiService } from '../../services/API/binance-api.service';
import { fadeInOut, fadeOnScroll } from '../../app/Shared/animations';
import { HtmlParser } from '@angular/compiler';

@Component({
  selector: 'app-market-page',
  templateUrl: './market-page.component.html',
  styleUrl: './market-page.component.css',
})
export class MarketPageComponent {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private Api: BinanceApiService
  ) {}
  title = 'CryptoAPI';
  MarketData: any;
  CoinsTable: Coin[] = [];
  loading: boolean = true;
  showTable = false;

  ngOnInit(): void {
    this.PopulateCoinsTable();
  }
  Apiservice(coins: string[]) {
    // this.Api.StartTradeSocket(coins).subscribe((data) => {
    //   this.CoinsTable = data as Coin [];
    // });
  }
  PopulateCoinsTable() {
    this.Api.getTopCoins(5).subscribe((data) => {
      if (
        Array.isArray(data) &&
        data.every(
          (item) =>
            typeof item === 'object' &&
            'symbol' in item &&
            'priceChangePercent' in item
        )
      ) 
      {

        




      } 
      else {
        console.error('Invalid data structure');
        this.loading = false; // Handle error, set loading to false
      }
      console.log(this.CoinsTable[0]);
    });
  }
}

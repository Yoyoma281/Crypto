import { Component, OnChanges, OnInit, SimpleChanges, Renderer2, ElementRef, HostListener } from '@angular/core';
import { Coin } from '../../models/Coin';
import { BinanceTrade } from '../../models/TradeData';
import { BinanceApiService } from '../../services/API/binance-api.service';

@Component({
  selector: 'app-coins-page',
  templateUrl: './coins-page.component.html',
  styleUrl: './coins-page.component.css'
})
export class CoinsPageComponent implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef, private Api: BinanceApiService) {}
  title = 'CryptoAPI';
  MarketData: any;
  CoinsTable: Coin[] = [];
  loading: boolean = true; 
  showTable = false;

  ngOnInit(): void {
    this.PopulateCoinsTable();
  }
  Apiservice(coins: string[]) {
    this.Api.StartTradeSocket(coins).subscribe((data) => {
      this.CoinsTable = data as Coin [];
    });
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
      ) {
        this.CoinsTable = data.map((coin) => ({
          ...coin,
          priceChange: { hourlyChange: 0, weeklyChange: 0 },
        }));
        this.UpdatePriceChangeProperties();
        this.loading = false;
      } else {
        console.error('Invalid data structure');
        this.loading = false; // Handle error, set loading to false
      }
      console.log(this.CoinsTable[0]);
    });
  }
  UpdatePriceChangeProperties() {
    this.CoinsTable.forEach((coin) => {
      const weeklyChange$ = this.Api.getPriceChange(coin.symbol, '1w');
      const hourlyChange$ = this.Api.getPriceChange(coin.symbol, '1h');
  
      weeklyChange$.subscribe((data) => {
        coin.priceChange.weeklyChange = Number(data);
      });
  
      hourlyChange$.subscribe((data) => {
        console.log('Hourly Change for', coin.symbol, data);
        coin.priceChange.hourlyChange = Number(data);
      });
    });
  }
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const triggerPoint = 250; // Adjust this value based on when you want the table to appear

    if (scrollPosition > triggerPoint) {
      // Add a class to the table to transition its opacity
      this.renderer.addClass(this.el.nativeElement.querySelector('.custom-table'), 'visible');
    } else {
      // Remove the class when scrolling up
      this.renderer.removeClass(this.el.nativeElement.querySelector('.custom-table'), 'visible');
    }
  }
}

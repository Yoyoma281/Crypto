import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  Renderer2,
  ElementRef,
  HostListener,
} from '@angular/core';
import { Coin } from '../../../../models/Coin';
import { BinanceApiService } from '../../../../services/Api/BinanceApi/binance-api.service';
import { fadeInOut, fadeOnScroll } from '../../../../app/Shared/animations';
import { HtmlParser } from '@angular/compiler';
import { HourlyChangePipe } from '../../../../pipes/HourlyChangePercentage/hourly-change.pipe';
import { forkJoin } from 'rxjs';

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

  PopulateCoinsTable() {
    this.Api.getTopCoins(5).subscribe((data) => {
      if (Array.isArray(data) && data.length > 0) {
        this.CoinsTable = data;
        this.Api.getHourlyChange(this.CoinsTable) 
        this.loading = false;
      }
    });
  }

}

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
import { BinanceApiService } from '../../services/BinanceApi/binance-api.service';
import { fadeInOut, fadeOnScroll } from '../../app/Shared/animations';
import { HtmlParser } from '@angular/compiler';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  animations: [fadeInOut],
})
export class HomePageComponent implements OnInit {
  constructor(private Api: BinanceApiService) {}

  Coins: any[] = [];
  
  ngOnInit(): void {
    this.PopulateCoinsWindows();
  }

  PopulateCoinsWindows() {
    this.Api.getTopCoins(2).subscribe((data) => {
      this.Coins = data;
      console.log("CoinsWindowData",this.Coins);
    });
  }
}

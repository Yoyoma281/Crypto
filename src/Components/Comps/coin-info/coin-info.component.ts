import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { BinanceApiService } from '../../../services/Api/BinanceApi/binance-api.service';
import { Coin } from '../../../models/Coin';

@Component({
  selector: 'app-coin-info',
  templateUrl: './coin-info.component.html',
  styleUrl: './coin-info.component.css',
})
export class CoinInfoComponent implements OnChanges, OnInit {
  @Input() Coin!: Coin;
  CurrentPrice: number = 0;
  CurrentPercentageChange = 0;

  PriceUp: boolean = false;
  PercentageUp: boolean = false;

  constructor(private Api: BinanceApiService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.Coin) {
      const coin = changes['Coin'].currentValue as Coin;
      this.PriceUp = coin.lastPrice > this.CurrentPrice;
      this.PercentageUp = coin.priceChangePercent > this.CurrentPercentageChange;
      this.CurrentPrice = coin.lastPrice
      // console.log("up: ",this.PercentageUp)
    }
    
  }
}

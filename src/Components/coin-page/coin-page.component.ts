import { Component, OnInit } from '@angular/core';
import { Coin } from '../../models/Coin';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BinanceApiService } from '../../services/BinanceApi/binance-api.service';

@Component({
  selector: 'app-coin-page',
  templateUrl: './coin-page.component.html',
  styleUrl: './coin-page.component.css',
})
export class CoinPageComponent implements OnInit {
  symbol: string = '';
  coin!: Coin;
  constructor(private route: ActivatedRoute, private Api: BinanceApiService) {}

  ngOnInit(): void {
    this.symbol = this.route.snapshot.params['symbol'];
    this.GetCoin();
  }
  GetCoin() {
    if (this.symbol) {
      this.Api.GetCoin(this.symbol).subscribe((data) => {
        if (this.coin) {
          this.coin = data;
        } else {
          console.error(`Coin is ${this.coin} `);
        }
      });
    } else {
      console.error(`Symbol ${this.symbol} is invalid`);
    }
  }
}

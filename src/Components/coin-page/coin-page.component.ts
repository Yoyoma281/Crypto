import { Component, OnInit } from '@angular/core';
import { Coin } from '../../models/Coin';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BinanceApiService } from '../../services/BinanceApi/binance-api.service';
import { DataChartComponent } from '../data-chart/data-chart.component';

@Component({
  selector: 'app-coin-page',
  templateUrl: './coin-page.component.html',
  styleUrl: './coin-page.component.css',
})
export class CoinPageComponent implements OnInit {
  coin!: Coin;

  constructor(private route: ActivatedRoute, private Api: BinanceApiService) {}

  ngOnInit(): void {
    const symbol = this.route.snapshot.params['symbol'];
    this.GetCoin(symbol);
  }
  GetCoin(coin: string) {
    if (coin) {
      this.Api.GetCoin(coin).subscribe((data) => {
        if (coin) {
          this.coin = data;
          console.log(this.coin);
        } else {
          console.error(`Coin is ${coin} `);
        }
      });
    } else {
      console.error(`Symbol ${coin} is invalid`);
    }
  }

  
}

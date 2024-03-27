import { Component, OnInit } from '@angular/core';
import { Coin } from '../../models/Coin';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BinanceApiService } from '../../services/BinanceApi/binance-api.service';
import { DataChartComponent } from '../data-chart/data-chart.component';
import { ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-coin-page',
  templateUrl: './coin-page.component.html',
  styleUrl: './coin-page.component.css',
})
export class CoinPageComponent implements OnInit {
  @ViewChild('chartCanvas', { static: true })
  chartCanvasRef!: ElementRef<HTMLCanvasElement>;
  currentDateTime:number = 0
  coin!: Coin;

  constructor(private route: ActivatedRoute, private Api: BinanceApiService) {}

  ngOnInit(): void {
    const symbol = this.route.snapshot.params['symbol'];
    this.GetCoin(symbol);
    this.currentDateTime = new Date().getTime()
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

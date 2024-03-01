import { Component, OnInit, Output } from '@angular/core';
import { Input, EventEmitter } from '@angular/core';
import { BinanceApiService } from '../../services/BinanceApi/binance-api.service';

@Component({
  selector: 'app-coin-list',
  templateUrl: './coin-list.component.html',
  styleUrl: './coin-list.component.css',
})
export class CoinListComponent implements OnInit {
  @Output() CoinSelected = new EventEmitter<string>();
  Trading_Pairs: string[] = []

  constructor(private Api: BinanceApiService){}

  ngOnInit(): void {
    this.PopulateTradingPairsBox();
  }

  CoinSelectChange(newCoin: any) {
    const Coin = newCoin.target.value as string
    this.Api.subscribe(Coin);
  }

  PopulateTradingPairsBox() {
    this.Api.getTradingPairs().subscribe((data) => {
      this.Trading_Pairs = data;
      console.log(this.Trading_Pairs.length);
    });
  }
}

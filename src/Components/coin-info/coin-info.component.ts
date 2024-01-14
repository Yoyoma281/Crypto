import { Component, Input, OnInit } from '@angular/core';
import { BinanceApiService } from '../../services/API/binance-api.service';
import { BinanceTrade } from '../../models/TradeData';

@Component({
  selector: 'app-coin-info',
  templateUrl: './coin-info.component.html',
  styleUrl: './coin-info.component.css',
})
export class CoinInfoComponent implements OnInit {
  @Input() Coin: any;
   OneHourChange: number = 0
   OneWeekChange: number = 0

  constructor(private Api: BinanceApiService) {}

    ngOnInit(): void {
      this.PriceChange()
    }
  
  PriceChange(){
    this.Api.getPriceChange(this.Coin.symbol, "1w").subscribe((data) => {
        this.OneWeekChange = Number(data)
        console.log("1w: ", data)
    })

    this.Api.getPriceChange(this.Coin.symbol, "1h").subscribe((data) => {
      this.OneHourChange = Number(data)
      console.log("1h: ", data)
  })
  }
  
  
}

import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { BinanceApiService } from '../../services/BinanceApi/binance-api.service';
import { Coin } from '../../models/Coin';

@Component({
  selector: 'app-coin-info',
  templateUrl: './coin-info.component.html',
  styleUrl: './coin-info.component.css',
})
export class CoinInfoComponent implements OnInit {
  @Input() Coin!: Coin;  
  OneHourChange: number = 0 
  OneWeekChange: number = 0

  constructor(private Api: BinanceApiService) {}

    ngOnInit(): void {
      this.PriceChange()
    }
  
    
    PriceChange() {
    //   if (this.Coin) {
    //     const { symbol } = this.Coin;
    //     console.log("data recieved")
    //     this.Api.getKlinesData(symbol, '1w').subscribe((data) => {
    //       if (data.length > 0) {
    //         const openingPrice = parseFloat(data[0][1]); 
    //         const closingPrice = parseFloat(data[data.length - 1][4]); 
  
    //         this.OneWeekChange = (closingPrice - openingPrice) / openingPrice * 100;
    //       }
    //     });
    //   }
    // }
  }
}
  
  


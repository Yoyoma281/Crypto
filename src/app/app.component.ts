import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BinanceApiService } from '../Services/API/binance-api.service';
import { BinanceTrade } from '../Models/TradeData';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private Api: BinanceApiService) {}
  title = 'CryptoAPI';
  Pause_Start: boolean = false;
  MarketData: any;
  

  Apiservice() {
    this.Pause_Start = !this.Pause_Start;
    if (this.Pause_Start) {
      this.Api.startWebSocket().subscribe((data) => {
        this.MarketData = data as BinanceTrade;
      });
    }

    else this.Api.stopWebSocket()

  }


}

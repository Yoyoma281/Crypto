import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Coin } from '../models/Coin';
import { BinanceApiService } from '../services/BinanceApi/binance-api.service';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private Api: BinanceApiService) {}
}

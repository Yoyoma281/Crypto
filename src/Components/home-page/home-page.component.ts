import { Component, OnChanges, OnInit, SimpleChanges, Renderer2, ElementRef, HostListener } from '@angular/core';
import { Coin } from '../../models/Coin';
import { BinanceTrade } from '../../models/TradeData';
import { BinanceApiService } from '../../services/API/binance-api.service';
import { fadeInOut, fadeOnScroll } from '../../app/Shared/animations';
import { HtmlParser } from '@angular/compiler';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './coins-page.component.css',
  animations: [fadeInOut],
})
export class HomePageComponent {
  
}

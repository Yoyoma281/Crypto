import {
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  Renderer2,
  ElementRef,
  HostListener,
} from '@angular/core';
import { Coin } from '../../../../models/Coin';
import { BinanceApiService } from '../../../../services/Api/BinanceApi/binance-api.service';
import { fadeInOut, fadeOnScroll } from '../../../../app/Shared/animations';
import { HtmlParser } from '@angular/compiler';
import { TwitterService } from '../../../../services/Api/TwitterAPI/twitter-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  animations: [fadeInOut],
})
export class HomePageComponent implements OnInit {
  constructor(private BinanceApi: BinanceApiService, private TwitterApi: TwitterService ) {}

  Coins: Coin[] = []

  ngOnInit(): void {
    this.PopulateCoinsWindows();
    // this.GetTweets()
  }

  PopulateCoinsWindows() {
    this.BinanceApi.getTopCoins(2).subscribe((data) => {
      this.Coins = data;
    });
  }

  // GetTweets(){
  //   this.TwitterApi.getTweets("x").subscribe((data) =>{ 
  //     console.log(data)
  //   })
  // }
  
}

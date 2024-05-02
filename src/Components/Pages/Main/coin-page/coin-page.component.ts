import { Component, OnInit } from '@angular/core';
import { Coin } from '../../../../models/Coin';
import { ActivatedRoute } from '@angular/router';
import { BinanceApiService } from '../../../../services/Api/BinanceApi/binance-api.service';
import { ScrollToTopService } from '../../../../services/Accessories/scrolling/scrolling.service';
import { DataChartComponent } from '../../../Comps/data-chart/data-chart.component';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-coin-page',
  templateUrl: './coin-page.component.html',
  styleUrl: './coin-page.component.css',
})
export class CoinPageComponent implements OnInit {
  @ViewChild(DataChartComponent, { static: true })
  dataChartComponentRef!: DataChartComponent;

  StartTime: number = 0;
  EndTime: number = 0
  coin!: Coin;
  YearInMilli = 31556952000
  TimeFrameSelected: string = '1M';

  constructor(private route: ActivatedRoute, private Api: BinanceApiService, private Scroll: ScrollToTopService) {}

  ngOnInit(): void {
    // this.Scroll.scrollToTopOnRouteChange()
    const symbol = this.route.snapshot.params['symbol'];
    this.GetCoin(symbol);
  }
  GetCoin(coin: string) {
    if (coin) {
      this.Api.GetCoin(coin).subscribe((data) => {
        this.coin = data;
      });
    } else {
      console.error(`Symbol ${coin} is invalid`);
    }
  }
  SelectTimeFrame(TimeFrame: string) {
    this.TimeFrameSelected = TimeFrame;
    console.log('end time: ', this.EndTime, "\n\n start time: ", this.StartTime);
  }

  
}

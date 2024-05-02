import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { HourlyChangePipe } from '../pipes/HourlyChangePercentage/hourly-change.pipe';
import { CoinPageComponent } from '../Components/Pages/Main/coin-page/coin-page.component';
import { HomePageComponent } from '../Components/Pages/Main/home-page/home-page.component';
import { ContactPageComponent } from '../Components/Pages/Main/contact-page/contact-page.component';
import { MarketPageComponent } from '../Components/Pages/Main/market-page/market-page.component';
import { AboutPageComponent } from '../Components/Pages/Main/about-page/about-page.component';
import { NewsPageComponent } from '../Components/Pages/Main/news-page/news-page.component';
import { TrendingPageComponent } from '../Components/Pages/Main/trending-page/trending-page.component';
import { CoinListComponent } from '../Components/Comps/coin-list/coin-list.component';
import { CoinInfoComponent } from '../Components/Comps/coin-info/coin-info.component';
import { DataChartComponent } from '../Components/Comps/data-chart/data-chart.component';
import { LoadingAnimtaionComponent } from '../Components/Comps/loading-animtaion/loading-animtaion.component';
import { TradingPageComponent } from '../Components/Pages/DemoTrade/trading-page/trading-page.component';
import { PortfolioPageComponent } from '../Components/Pages/DemoTrade/portfolio-page/portfolio-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CoinListComponent,
    CoinInfoComponent,
    HomePageComponent,
    ContactPageComponent,
    MarketPageComponent,
    AboutPageComponent,
    NewsPageComponent,
    TrendingPageComponent,
    CoinPageComponent,
    DataChartComponent,
    LoadingAnimtaionComponent,
    HourlyChangePipe,
    TradingPageComponent,
    PortfolioPageComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent],
})
export class AppModule {}

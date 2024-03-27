import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CoinListComponent } from '../Components/coin-list/coin-list.component';
import { CoinInfoComponent } from '../Components/coin-info/coin-info.component';
import { HomePageComponent } from '../Components/home-page/home-page.component';
import { ContactPageComponent } from '../Components/contact-page/contact-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarketPageComponent } from '../Components/market-page/market-page.component';
import { AboutPageComponent } from '../Components/about-page/about-page.component';
import { NewsPageComponent } from '../Components/news-page/news-page.component';
import { TrendingPageComponent } from '../Components/trending-page/trending-page.component';
import { CoinPageComponent } from '../Components/coin-page/coin-page.component';
import { provideCharts, withDefaultRegisterables} from 'ng2-charts';
import { DataChartComponent } from '../Components/data-chart/data-chart.component';
import { LoadingAnimtaionComponent } from '../Components/loading-animtaion/loading-animtaion.component';
import { HourlyChangePipe } from '../pipes/HourlyChangePercentage/hourly-change.pipe';



@NgModule({
  declarations: [AppComponent, CoinListComponent, CoinInfoComponent, HomePageComponent, ContactPageComponent, MarketPageComponent, AboutPageComponent, NewsPageComponent, TrendingPageComponent, CoinPageComponent, DataChartComponent, LoadingAnimtaionComponent, HourlyChangePipe],
  imports: [BrowserAnimationsModule, BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [provideCharts(withDefaultRegisterables())],
  bootstrap: [AppComponent],
})
export class AppModule {}

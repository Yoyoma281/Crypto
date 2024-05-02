import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from '../Components/Pages/Main/home-page/home-page.component';
import { ContactPageComponent } from '../Components/Pages/Main/contact-page/contact-page.component';
import { MarketPageComponent } from '../Components/Pages/Main/market-page/market-page.component';
import { AboutPageComponent } from '../Components/Pages/Main/about-page/about-page.component';
import { CoinPageComponent } from '../Components/Pages/Main/coin-page/coin-page.component';
import { NewsPageComponent } from '../Components/Pages/Main/news-page/news-page.component';
import { TrendingPageComponent } from '../Components/Pages/Main/trending-page/trending-page.component';
import { DataChartComponent } from '../Components/Comps/data-chart/data-chart.component';
import { TradingPageComponent } from '../Components/Pages/DemoTrade/trading-page/trading-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'About', component: AboutPageComponent },
  { path: 'Coin/:symbol', component: CoinPageComponent },
  { path: 'Contact', component: ContactPageComponent },
  { path: 'Market', component: MarketPageComponent },
  { path: 'News', component: NewsPageComponent },
  { path: 'Trending', component: TrendingPageComponent },
  { path: 'Trade/:symbol', component: TradingPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

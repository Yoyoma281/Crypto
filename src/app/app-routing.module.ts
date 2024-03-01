import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from '../Components/home-page/home-page.component';
import { ContactPageComponent } from '../Components/contact-page/contact-page.component';
import { MarketPageComponent } from '../Components/market-page/market-page.component';
import { AboutPageComponent } from '../Components/about-page/about-page.component';
import { CoinPageComponent } from '../Components/coin-page/coin-page.component';
import { NewsPageComponent } from '../Components/news-page/news-page.component';
import { TrendingPageComponent } from '../Components/trending-page/trending-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'About', component: AboutPageComponent },
  { path: 'Coin', component: CoinPageComponent },
  { path: 'Contact', component: ContactPageComponent },
  { path: 'Market', component: MarketPageComponent },
  { path: 'News', component: NewsPageComponent },
  { path: 'Trending', component: TrendingPageComponent },



  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

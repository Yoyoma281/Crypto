import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CoinListComponent } from '../Components/coin-list/coin-list.component';
import { CoinInfoComponent } from '../Components/coin-info/coin-info.component';
import { LoadingAnimationComponent } from '../Components/loading-animation/loading-animation.component';
import { CoinsPageComponent } from '../Components/coins-page/coins-page.component';
import { ContactPageComponent } from '../Components/contact-page/contact-page.component';

@NgModule({
  declarations: [AppComponent, CoinListComponent, CoinInfoComponent, LoadingAnimationComponent, CoinsPageComponent, ContactPageComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

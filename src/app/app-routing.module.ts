import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from '../Components/home-page/home-page.component';
import { ContactPageComponent } from '../Components/contact-page/contact-page.component';
import { MarketPageComponent } from '../Components/market-page/market-page.component';
import { AboutPageComponent } from '../Components/about-page/about-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'Contact', component: ContactPageComponent },
  { path: 'Market', component: MarketPageComponent },
  { path: 'About', component: AboutPageComponent },

  



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

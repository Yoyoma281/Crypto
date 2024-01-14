import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CoinsPageComponent } from '../Components/coins-page/coins-page.component';
import { ContactPageComponent } from '../Components/contact-page/contact-page.component';

const routes: Routes = [
  { path: '', component: CoinsPageComponent },
  { path: 'Contact', component: ContactPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

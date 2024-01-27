import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from '../Components/home-page/home-page.component';
import { ContactPageComponent } from '../Components/contact-page/contact-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'Contact', component: ContactPageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

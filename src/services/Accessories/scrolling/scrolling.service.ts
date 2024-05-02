// scroll-to-top.service.ts
import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollToTopService {

  constructor(private router: Router) { }

  // Function to scroll to the top of the page
  scrollToTop() {
    window.scrollTo(0, 0);
  }

  // Function to listen for route changes and scroll to the top
  scrollToTopOnRouteChange() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
    });
  }
}

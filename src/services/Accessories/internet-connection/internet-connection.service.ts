import { Injectable } from '@angular/core';
import { mapTo } from 'rxjs/operators';
import { Observable, fromEvent, merge } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InternetConnectionService {
  constructor() {}

  checkConnectivity(): Observable<boolean> {
    // Create an observable from the online and offline events
    const online$ = fromEvent(window, 'online').pipe(mapTo(true));
    const offline$ = fromEvent(window, 'offline').pipe(mapTo(false));

    // Merge both observables into one
    return merge(online$, offline$);
  }
}

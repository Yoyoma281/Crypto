import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BinanceApiService {
  private ws!: WebSocket;
  private observable!: Observable<any>;

  constructor() {}

  startWebSocket(): Observable<any> {
    const streamUrl = 'wss://stream.binance.com:9443/ws/bnbusdt@trade';

    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      this.ws = new WebSocket(streamUrl);

      this.observable = new Observable((observer: Observer<any>) => {
        this.ws.addEventListener('open', (event) => {
          console.log('WebSocket connection opened.', event);
        });

        this.ws.addEventListener('message', (event) => {
          const message = JSON.parse(event.data);
          console.log('Received message:', message);
          
          observer.next(message); 
        });

        this.ws.addEventListener('close', (event) => {
          console.log('WebSocket connection closed.', event);
          observer.complete(); 
        });

        this.ws.addEventListener('error', (event) => {
          console.error('WebSocket error:', event);
          observer.error(event); 
        });
      });
    }

    return this.observable;
  }

  stopWebSocket(): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
    }
  }
}

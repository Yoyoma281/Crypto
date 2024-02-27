import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  Observer,
  map,
  catchError,
  throttleTime,
  merge,
  EMPTY,
  interval,
  switchMap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BinanceApiService {
  private ws!: WebSocket;
  private observable!: Observable<any>;
  private baseUrl = 'https://api.binance.com/api/v3';
  private CurrentCoin: string = '';

  constructor(private http: HttpClient) {}

  //Creates the connection needed for future actions to be done.
  StartTradeSocket(coins: string[]): Observable<any> {
    coins = coins.map((coin) => coin.toLowerCase());
    const coinStreams: Record<string, Observable<any>> = {};

    for (const coin of coins) {
      let streamUrl: string;
      streamUrl = `wss://stream.binance.com:9443/ws/${coin}@trade`;

      if (!coinStreams[coin]) {
        coinStreams[coin] = new Observable((observer: Observer<any>) => {
          const ws = new WebSocket(streamUrl);

          ws.addEventListener('open', (event) => {
            console.log(`WebSocket connection opened for ${coin}.`, event);
          });

          ws.addEventListener('message', (event) => {
            const message = JSON.parse(event.data);
            observer.next({ coin, data: message }); // Include the coin identifier in the data
          });

          ws.addEventListener('close', (event) => {
            console.log(`WebSocket connection closed for ${coin}.`, event);
            observer.complete();
          });

          ws.addEventListener('error', (event) => {
            console.error(`WebSocket error for ${coin}:`, event);
            observer.error(event);
          });

          return () => {
            ws.close();
          };
        });
      }
    }

    const mergedObservable = merge(...Object.values(coinStreams));

    return mergedObservable.pipe(throttleTime(2000));
  }
  stopWebSocket(): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.close();
    }
  }
  subscribe(coin: string): void {
    coin = coin.toLocaleLowerCase();
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(
        JSON.stringify({
          method: 'UNSUBSCRIBE',
          params: [this.CurrentCoin + '@trade'],
          id: 1,
        })
      );
      this.ws.send(
        JSON.stringify({
          method: 'SUBSCRIBE',
          params: [coin + '@trade'],
          id: 1,
        })
      );
      this.CurrentCoin = coin;
    } else {
      console.error(
        'WebSocket is closed and no subscribiption actions can be preformed.'
      );
    }
  }
  getTradingPairs(): Observable<string[]> {
    const url = `${this.baseUrl}/exchangeInfo`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        const supportedPairs: string[] = response.symbols
          .filter((symbol: any) => symbol.status === 'TRADING') // Filter only trading pairs
          .map((symbol: any) => symbol.symbol);
        return supportedPairs;
      })
    );
  }
  getCoinPrice(coin: string = 'BTCUSDT'): Observable<number> {
    const apiUrl = `${this.baseUrl}?symbol=${coin}`;

    return this.http.get<any>(apiUrl).pipe(
      map((data) => parseFloat(data.price)),
      catchError((error) => {
        console.error('Error fetching data:', error);
        throw error;
      })
    );
  }
  getTopCoins(numberOfCoins: number): Observable<any[]> {
    // Use interval to emit a value every 3 seconds and switchMap to make the HTTP request
    return interval(1000).pipe(
      switchMap(() => {
        const url = `${this.baseUrl}/ticker/24hr`;

        return this.http.get<any[]>(url).pipe(
          map((data) => {
            // Filter coins traded in USDT
            const usdtCoins = data.filter((coin) =>
              coin.symbol.includes('USDT')
            );
            // Sort USDT coins based on market cap in descending order
            const sortedUsdtCoins = usdtCoins.sort(
              (a, b) => b.marketCap - a.marketCap
            );

            // Truncate prices by keeping only the first two decimal places
            const truncatedCoins = sortedUsdtCoins.map((coin) => {
              const lastPrice = parseFloat(coin.lastPrice);
              return {
                ...coin,
                lastPrice: isNaN(lastPrice)
                  ? coin.lastPrice
                  : lastPrice.toFixed(2),
              };
            });

            return truncatedCoins.slice(0, numberOfCoins);
          })
        );
      })
    );
  }
  getKlinesData(symbol: string, interval: string): Observable<any[]> {
    const params = {
      symbol: symbol,
      interval: interval,
    };

    return this.http.get<any[]>(`${this.baseUrl}klines`, { params });
  }
  getPrice(coin: string) {
    const url = `${this.baseUrl}/ticker?symbol=BTCUSDT`;
    return this.http.get<any>(url);
  }
}

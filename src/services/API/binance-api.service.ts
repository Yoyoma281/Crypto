import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, map, catchError, throttleTime, merge, EMPTY, interval, switchMap } from 'rxjs';

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
  getTopCoins(numberOfCoins: number) {
    // Use interval to emit a value every 3 seconds and switchMap to make the HTTP request
    return interval(6000).pipe(
      switchMap(() => {
        const url = `${this.baseUrl}/ticker/24hr`;
  
        return this.http.get<any[]>(url).pipe(
          map((data) => {
            // Filter coins traded in USDT
            const usdtCoins = data.filter((coin) => coin.symbol.includes('USDT'));
  
            // Sort USDT coins based on 24-hour percentage change in descending order
            const sortedUsdtCoins = usdtCoins.sort(
              (a, b) => b.priceChangePercent - a.priceChangePercent
            );
  
            // Get the top N USDT coins
            return sortedUsdtCoins.slice(0, numberOfCoins);
          })
        );
      })
    );
  }
  getPriceChange(symbol: string, interval: string): Observable<string> {
    console.log(interval);
    let url = `${this.baseUrl}/klines`;

    // Switch based on the interval
    switch (interval) {
      case '1h':
        url = `${this.baseUrl}/klines`;
        break;
      case '1w':
        url = `${this.baseUrl}/klines`; // Add assignment operator here
        break;
      default:
        throw new Error('Invalid endpoint type');
    }

    // Query parameters
    const params = {
      symbol: symbol,
      interval: interval,
      limit: '2', // Get the latest two candlesticks to calculate the change
    };

    return this.http.get<any[]>(url, { params }).pipe(
      map((data) => {
        // Extract closing prices from the candlestick data
        const closingPrices = data.map((item) => parseFloat(item[4]));

        // Ensure that there are two closing prices
        if (closingPrices.length === 2) {
          // Calculate price change
          const priceChange = closingPrices[1] - closingPrices[0];

          // Format the result to have up to 2 decimal places
          const formattedPriceChange = priceChange.toFixed(2);

          return formattedPriceChange;
        } else {
          throw new Error('Not enough data points to calculate price change');
        }
      })
    );
  }
}

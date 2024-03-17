import { HttpClient, HttpParams } from '@angular/common/http';
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

    //If the number of requests becomes too frequent, 
    //an HTTP error may occur, indicating that there have been too many requests. 
    //This error does not halt the flow of data but rather serves as a notification of the excessive request rate.
    return mergedObservable.pipe(throttleTime(5000));
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
   /**
   *   returns all trading pairs on the market.
   */
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
  /**
   *   returns coin data, based on Coin model.
   */
  GetCoin(coin: string = 'BTCUSDT'): Observable<any> {
    const apiUrl = `${this.baseUrl}/ticker?symbol=${coin}`;

    return this.http.get<any>(apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching data:', error);
        throw error;
      })
    );
  }
  /**
   *   Starts a stream of the top 'NumberOfCoins' from the binance market
   */
  getTopCoins(numberOfCoins: number): Observable<any[]> {
    return interval(3000).pipe(
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
  
  getKlinesData(symbol: string, interval: string, startTime?: number, endTime?: number): Observable<any[]> {
    let params = new HttpParams()
      .set('symbol', symbol)
      .set('interval', interval);
    
    if (startTime !== undefined) {
      params = params.set('startTime', startTime.toString());
    }

    if (endTime !== undefined) {
      params = params.set('endTime', endTime.toString());
    }

    return this.http.get<any[]>(`${this.baseUrl}/klines`, { params }).pipe(
      map(responseData => {
        return responseData.map(data => ({
          timestamp: data[0],
          open: parseFloat(data[1]),
          high: parseFloat(data[2]),
          low: parseFloat(data[3]),
          close: parseFloat(data[4]),
          volume: parseFloat(data[5]),
          closeTime: data[6],
          quoteAssetVolume: parseFloat(data[7]),
          numberOfTrades: data[8],
          takerBuyBaseAssetVolume: parseFloat(data[9]),
          takerBuyQuoteAssetVolume: parseFloat(data[10]),
          ignore: parseFloat(data[11])
        }));
      })
    );
  }
}

export interface Coin {
  symbol: string;
  priceChange: number; 
  priceChangePercent: number; 
  HourlyPriceChangePercent: number;
  weightedAvgPrice: number; 
  openPrice: number; 
  highPrice: number; 
  lowPrice: number; 
  lastPrice: number; 
  volume: number; 
  quoteVolume: number;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}

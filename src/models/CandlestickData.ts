export interface CandleStickData {
    timestamp: number; // Timestamp in milliseconds since Unix epoch
    open: number; // Opening price
    high: number; // Highest price
    low: number; // Lowest price
    close: number; // Closing price
    volume: number; // Trading volume
    closeTimestamp: number; // Closing timestamp in milliseconds since Unix epoch
    quoteAssetVolume: number; // Quote asset volume
    numberOfTrades: number; // Number of trades
    takerBuyBaseAssetVolume: number; // Taker buy base asset volume
    takerBuyQuoteAssetVolume: number; // Taker buy quote asset volume
    ignore: string; // Ignore field
}

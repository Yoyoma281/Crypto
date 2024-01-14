export interface Coin {
    symbol: string
    priceChange: PriceChange
    priceChangePercent: number
    weightedAvgPrice: number
    prevClosePrice: number
    lastPrice: number
    lastQty: number
    bidPrice: number
    bidQty: number
    askPrice: number
    askQty: number
    openPrice: number
    highPrice: number
    lowPrice: number
    volume: number
    quoteVolume: number
    openTime: number
    closeTime: number
    firstId: number
    lastId: number
    count: number
  }
  
  export interface PriceChange {
    hourlyChange: number
    weeklyChange: number
  }
  
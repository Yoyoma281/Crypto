export interface BinanceTrade {
  E: string;  // Event Time
  M: number;  // Ignore
  T: string;  // Trade Time
  a: number;  // Seller order ID
  b: string;  // Buyer order ID
  e: string;  // Event type
  m: number;  // Is the buyer the market owner
  p: number;  // Price
  q: number;  // Quantity
  s: boolean; // Symbol
  t: boolean; // Trade ID
}




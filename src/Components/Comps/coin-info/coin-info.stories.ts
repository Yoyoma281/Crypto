import { moduleMetadata } from '@storybook/angular';
import { CoinInfoComponent } from './coin-info.component';
import { Coin } from '../../../models/Coin';

// Define mock data for Coin input property
const mockCoin: Coin = {
  symbol: 'BTCUSDT',
  priceChange: 0,
  priceChangePercent: 0,
  HourlyPriceChangePercent: 0,
  weightedAvgPrice: 0,
  openPrice: 0,
  highPrice: 0,
  lowPrice: 0,
  lastPrice: 0,
  volume: 0,
  quoteVolume: 0,
  openTime: 0,
  closeTime: 0,
  firstId: 0,
  lastId: 0,
  count: 0,
};

export default {
  title: 'Coin Info',
  decorators: [
    moduleMetadata({
      declarations: [CoinInfoComponent],
      imports: [], // Add any necessary imports here
    }),
  ],
};

export const Basic = () => ({
  component: CoinInfoComponent,
  props: {
    Coin: mockCoin,
  },
});

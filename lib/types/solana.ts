export interface TokenData {
  address: string;
  name: string;
  symbol: string;
  price: number;
  marketCap: number;
  volume24h: number;
  priceChange24h: number;
  holders: number;
  createdAt: string;
}

export interface TrendingToken extends TokenData {
  trendingScore: number;
  timeframe: string;
}

export type TimeFrame = '5m' | '15m' | '30m' | '1h' | '4h' | '12h' | '24h';

export interface TokenAnalysis {
  token: TokenData;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  analysis: string;
  recommendations: string[];
}
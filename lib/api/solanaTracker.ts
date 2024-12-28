import { SOLANA_TRACKER_CONFIG } from '../config';
import { TokenData, TrendingToken, TimeFrame } from '../types/solana';

const headers = {
  'Authorization': `Bearer ${SOLANA_TRACKER_CONFIG.API_KEY}`,
  'Content-Type': 'application/json'
};

export class SolanaTrackerAPI {
  private static baseUrl = SOLANA_TRACKER_CONFIG.BASE_URL;

  static async getTrendingTokens(timeframe: TimeFrame = '1h'): Promise<TrendingToken[]> {
    const response = await fetch(
      `${this.baseUrl}/tokens/trending/${timeframe}`,
      { headers }
    );
    if (!response.ok) throw new Error('Failed to fetch trending tokens');
    return response.json();
  }

  static async getTokenDetails(address: string): Promise<TokenData> {
    const response = await fetch(
      `${this.baseUrl}/tokens/${address}`,
      { headers }
    );
    if (!response.ok) throw new Error('Failed to fetch token details');
    return response.json();
  }

  static async getMultiTokenData(): Promise<{
    latest: TokenData[];
    graduating: TokenData[];
    trending: TokenData[];
  }> {
    const response = await fetch(
      `${this.baseUrl}/tokens/multi/all`,
      { headers }
    );
    if (!response.ok) throw new Error('Failed to fetch multi token data');
    return response.json();
  }
}
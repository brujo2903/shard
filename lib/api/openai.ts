import OpenAI from 'openai';
import { OPENAI_CONFIG } from '../config';
import { TokenData, TokenAnalysis } from '../types/solana';

const OPENAI_API_KEY = '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';

export class OpenAIService {
  private static openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
  });

  private static async initializeOpenAI() {
    if (!this.openai) {
      this.openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      });
    }
    return this.openai;
  }

  static async getPersonalityResponse(prompt: string) {
    await this.initializeOpenAI();
    
    const response = await this.openai.chat.completions.create({
      model: OPENAI_CONFIG.MODEL,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: OPENAI_CONFIG.MAX_TOKENS,
      temperature: OPENAI_CONFIG.TEMPERATURE,
    });

    const content = response.choices[0]?.message?.content || '';
    
    return {
      content,
      confidence: this.calculateConfidence(content)
    };
  }

  private static calculateConfidence(content: string): number {
    // Analyze response certainty based on language used
    const certaintyTerms = ['definitely', 'certainly', 'clearly', 'absolutely'];
    const uncertaintyTerms = ['maybe', 'perhaps', 'possibly', 'might'];
    
    let confidence = 0.7; // Base confidence
    
    certaintyTerms.forEach(term => {
      if (content.toLowerCase().includes(term)) confidence += 0.05;
    });
    
    uncertaintyTerms.forEach(term => {
      if (content.toLowerCase().includes(term)) confidence -= 0.05;
    });
    
    return Math.max(0, Math.min(1, confidence));
  }

  static async analyzeToken(token: TokenData): Promise<TokenAnalysis> {
    const prompt = `Analyze the following Solana token:
      Name: ${token.name}
      Symbol: ${token.symbol}
      Price: $${token.price}
      Market Cap: $${token.marketCap}
      24h Volume: $${token.volume24h}
      24h Price Change: ${token.priceChange24h}%
      Holders: ${token.holders}
      
      Provide a detailed analysis including:
      1. Market sentiment
      2. Key metrics evaluation
      3. Trading recommendations
      4. Risk assessment`;

    const response = await this.openai.chat.completions.create({
      model: OPENAI_CONFIG.MODEL,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: OPENAI_CONFIG.MAX_TOKENS,
      temperature: OPENAI_CONFIG.TEMPERATURE,
    });

    const analysis = response.choices[0]?.message?.content || '';
    
    return {
      token,
      sentiment: this.determineSentiment(analysis),
      analysis,
      recommendations: this.extractRecommendations(analysis),
    };
  }

  private static determineSentiment(analysis: string): 'bullish' | 'bearish' | 'neutral' {
    const bullishTerms = ['bullish', 'positive', 'growth', 'uptrend', 'buy'];
    const bearishTerms = ['bearish', 'negative', 'decline', 'downtrend', 'sell'];
    
    const bullishCount = bullishTerms.filter(term => analysis.toLowerCase().includes(term)).length;
    const bearishCount = bearishTerms.filter(term => analysis.toLowerCase().includes(term)).length;
    
    if (bullishCount > bearishCount) return 'bullish';
    if (bearishCount > bullishCount) return 'bearish';
    return 'neutral';
  }

  private static extractRecommendations(analysis: string): string[] {
    // Extract recommendations from the analysis text
    // This is a simple implementation - could be enhanced with more sophisticated NLP
    return analysis
      .split('\n')
      .filter(line => line.toLowerCase().includes('recommend'))
      .map(line => line.trim());
  }
}
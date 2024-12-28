import { AgentPersonality, PersonalityResponse } from '../types/personality';
import { TokenData } from '../types/solana';
import { OpenAIService } from '../api/openai';
import { SheepPersonality } from './sheepPersonality';

export class PersonalityService {
  static async generateResponse(
    personality: AgentPersonality,
    context: {
      query: string;
      tokenData?: TokenData;
      marketConditions?: string;
      agentName?: string;
    }
  ): Promise<PersonalityResponse> {
    let prompt;
    
    // Use Sheep's special personality if it's the Sheep agent
    if (context.agentName?.toLowerCase() === 'sheep') {
      prompt = SheepPersonality.buildPrompt(context);
    } else {
      prompt = this.buildPrompt(personality, context);
    }
    
    const response = await OpenAIService.getPersonalityResponse(prompt);
    
    return {
      content: response.content,
      sentiment: this.analyzeSentiment(response.content),
      confidence: response.confidence
    };
  }

  private static buildPrompt(
    personality: AgentPersonality,
    context: { query: string; tokenData?: TokenData; marketConditions?: string }
  ): string {
    const { traits, tradingStyle, communicationStyle, riskTolerance } = personality;
    
    let prompt = `You are an AI trading agent with the following personality traits:\n`;
    
    // Add personality traits
    traits.forEach(trait => {
      prompt += `- ${trait.trait} (Strength: ${trait.weight})\n`;
    });
    
    prompt += `\nTrading Style: ${tradingStyle}\n`;
    prompt += `Communication Style: ${communicationStyle}\n`;
    prompt += `Risk Tolerance: ${riskTolerance}\n\n`;
    
    // Add context
    prompt += `User Query: ${context.query}\n`;
    
    if (context.tokenData) {
      prompt += `\nToken Data:\n`;
      prompt += `Name: ${context.tokenData.name}\n`;
      prompt += `Symbol: ${context.tokenData.symbol}\n`;
      prompt += `Price: $${context.tokenData.price}\n`;
      prompt += `24h Change: ${context.tokenData.priceChange24h}%\n`;
    }
    
    if (context.marketConditions) {
      prompt += `\nMarket Conditions: ${context.marketConditions}\n`;
    }
    
    prompt += `\nRespond in a way that reflects your personality traits and trading style. Consider your risk tolerance when making recommendations.`;
    
    return prompt;
  }

  private static analyzeSentiment(content: string): 'positive' | 'neutral' | 'negative' {
    const positiveTerms = ['bullish', 'growth', 'opportunity', 'gain', 'profit'];
    const negativeTerms = ['bearish', 'risk', 'loss', 'decline', 'caution'];
    
    let positiveScore = 0;
    let negativeScore = 0;
    
    positiveTerms.forEach(term => {
      const regex = new RegExp(term, 'gi');
      const matches = content.match(regex);
      if (matches) positiveScore += matches.length;
    });
    
    negativeTerms.forEach(term => {
      const regex = new RegExp(term, 'gi');
      const matches = content.match(regex);
      if (matches) negativeScore += matches.length;
    });
    
    if (positiveScore > negativeScore) return 'positive';
    if (negativeScore > positiveScore) return 'negative';
    return 'neutral';
  }
}
export interface PersonalityTrait {
  trait: string;
  weight: number; // 0-1, influences how strongly this trait affects responses
}

export interface AgentPersonality {
  traits: PersonalityTrait[];
  tradingStyle: 'conservative' | 'moderate' | 'aggressive';
  communicationStyle: 'formal' | 'casual' | 'technical';
  riskTolerance: number; // 0-1
}

export interface PersonalityResponse {
  content: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
}
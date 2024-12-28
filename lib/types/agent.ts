export interface AgentType {
  id: string;
  name: string;
  image: string;
  creator?: string;
  description?: string;
  marketCap?: string;
  percentUp?: number;
  percentDown?: number;
  apiKey?: string;
}

export interface ChatMessage {
  text: string;
  sender: 'user' | 'agent';
}
'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SolanaTrackerAPI } from '@/lib/api/solanaTracker';
import { OpenAIService } from '@/lib/api/openai';
import { TokenAnalysisView } from '@/components/features/TokenAnalysis';
import { AgentType } from '@/lib/types/agent';
import Image from 'next/image';
import { TokenAnalysis } from '@/lib/types/solana';
import { ChatMessage } from '@/lib/types/agent';
import { TokenAnalysis } from '@/lib/types/solana';

const TOKEN_ADDRESS_REGEX = /[1-9A-HJ-NP-Za-km-z]{32,44}/;

interface AgentChatProps {
  agent: AgentType;
  onClose: () => void;
}

export function AgentChat({ agent, onClose }: AgentChatProps) {
  const [message, setMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [tokenAnalysis, setTokenAnalysis] = useState<TokenAnalysis | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'agent',
      text: `Hello! I'm ${agent.name}, your autonomous trading agent. How can I assist you today?`
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleMessage = async (messageText: string) => {
    try {
      const tokenAddress = messageText.match(TOKEN_ADDRESS_REGEX)?.[0];
      let tokenData;
      let response: { content: string } | undefined;

      if (tokenAddress) {
        tokenData = await SolanaTrackerAPI.getTokenDetails(tokenAddress);
      }
    
      response = await OpenAIService.getPersonalityResponse(messageText);
      
      if (response?.content) {
        setMessages(prev => [...prev, {
          text: response.content,
          sender: 'agent'
        }]);
        
        if (tokenData) {
          const analysis = await OpenAIService.analyzeToken(tokenData);
          if (analysis) {
            setTokenAnalysis(analysis);
          }
        }
      }
    } catch (error) {
      console.error('Error handling message:', error);
      setMessages(prev => [...prev, {
        text: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.',
        sender: 'agent'
      }]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    
    setIsAnalyzing(true);
    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    setMessage('');
    
    handleMessage(message);
  };

  return (
    <div className={`fixed right-6 bottom-6 w-96 bg-[#0F1729]/95 border border-white/10 rounded-lg backdrop-blur-md shadow-xl transition-all duration-300 ${
      isMinimized ? 'h-16' : 'h-[600px]'
    }`}>
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={agent.image}
              alt={`${agent.name} avatar`}
              fill
              className="object-cover"
              sizes="32px"
              quality={90}
              priority
              loading="eager"
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">{agent.name}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="flex-1 overflow-y-auto p-4 h-[calc(100%-8rem)] space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/5 text-gray-300'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {tokenAnalysis && (
              <div className="w-full">
                <TokenAnalysisView analysis={tokenAnalysis} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
            <div className="flex gap-2">
              <Input
                disabled={isAnalyzing}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Message your agent..."
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600"
              />
              <Button
                disabled={isAnalyzing}
                onClick={sendMessage}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            {isAnalyzing && (
              <div className="text-xs text-gray-400 mt-2 text-center">
                Analyzing token data...
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
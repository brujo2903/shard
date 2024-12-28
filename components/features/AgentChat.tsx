'use client';

import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SolanaTrackerAPI } from '@/lib/api/solanaTracker';
import { OpenAIService } from '@/lib/api/openai';
import { TokenAnalysisView } from '@/components/features/TokenAnalysis';
import Image from 'next/image';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions'; // Add this import

// ... other imports and interfaces remain the same ...

const handleMessage = async (message: string) => {
  try {
    const tokenAddress = message.match(TOKEN_ADDRESS_REGEX)?.[0];
    let tokenData;
    let response: { content: string } | undefined;
    
    if (!personality) {
      throw new Error('Agent personality not initialized');
    }

    if (tokenAddress) {
      tokenData = await SolanaTrackerAPI.getTokenDetails(tokenAddress);
    }
  
    response = await OpenAIService.getPersonalityResponse(message);
    
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

// ... rest of the file remains the same ...
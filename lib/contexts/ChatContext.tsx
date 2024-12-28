'use client';

import { createContext, useContext } from 'react';
import { AgentType } from '@/lib/types/agent';

interface ChatContextType {
  activeChat: { agent: AgentType } | null;
  setActiveChat: (chat: { agent: AgentType } | null) => void;
}

export const ChatContext = createContext<ChatContextType>({
  activeChat: null,
  setActiveChat: () => {},
});

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
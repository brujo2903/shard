'use client';

import { useState, ReactNode } from 'react';
import { ChatContext } from '@/lib/contexts/ChatContext';
import { AgentType } from '@/lib/types/agent';

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [activeChat, setActiveChat] = useState<{ agent: AgentType } | null>(null);

  return (
    <ChatContext.Provider value={{ activeChat, setActiveChat }}>
      {children}
    </ChatContext.Provider>
  );
}
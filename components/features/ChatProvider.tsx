'use client';

import { useState, ReactNode } from 'react';
import { ChatContext } from './AgentChat';

interface ChatProviderProps {
  children: ReactNode;
}

export function ChatProvider({ children }: ChatProviderProps) {
  const [activeChat, setActiveChat] = useState<{ agent: any } | null>(null);

  return (
    <ChatContext.Provider value={{ activeChat, setActiveChat }}>
      {children}
    </ChatContext.Provider>
  );
}
'use client';

import { AgentSidebar } from '@/components/layout/AgentSidebar';
import { ExploreAgentsList } from '@/components/features/ExploreAgentsList';
import { ChatProvider } from '@/components/features/chat/ChatProvider';
import { AgentChat } from '@/components/features/chat/AgentChat';
import { useChatContext } from '@/lib/contexts/ChatContext';

function ActiveChat() {
  const { activeChat, setActiveChat } = useChatContext();

  if (!activeChat) return null;

  return (
    <AgentChat
      agent={activeChat.agent}
      onClose={() => setActiveChat(null)}
    />
  );
}

export function ExplorePageClient() {
  return (
    <ChatProvider>
      <div className="flex min-h-screen pt-20 bg-[#0F1729]">
        <AgentSidebar />
        <main className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white">Explore Agents</h1>
              <p className="text-gray-400 mt-2">Discover and interact with autonomous AI agents</p>
            </div>
            <ExploreAgentsList />
          </div>
        </main>
        <ActiveChat />
      </div>
    </ChatProvider>
  );
}
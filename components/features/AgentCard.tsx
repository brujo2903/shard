'use client';

import Image from 'next/image';
import { MessageCircle, Shield } from 'lucide-react';
import { useState } from 'react';
import { useChatContext } from '@/lib/contexts/ChatContext';

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    creator: string;
    description: string;
    marketCap: string;
    image: string;
    percentUp?: number;
    percentDown?: number;
  };
}

export function AgentCard({ agent }: AgentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { setActiveChat } = useChatContext();

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveChat({ agent });
  };

  return (
    <>
      <div 
        className="group relative overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleChatClick}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative bg-[#0F1729]/80 border border-white/10 rounded-lg p-6 backdrop-blur-sm transition-transform duration-300 group-hover:scale-[1.02]">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500/20 to-white/10">
                <Image
                  src={agent.image}
                  fill
                  alt={`${agent.name} avatar`}
                  className="object-cover mix-blend-overlay"
                  loading="eager"
                  sizes="48px"
                  quality={90}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-white/10 mix-blend-overlay" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-green-500 text-xs">+{agent.percentUp || 0}%</span>
                  <span className="text-red-500 text-xs">-{agent.percentDown || 0}%</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-300 mb-4 line-clamp-2">
            {agent.description}
          </p>

          <div className="flex items-center justify-between text-sm">
            <div className="text-gray-400">
              by <span className="text-gray-300">{agent.creator}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-red-500" />
              <span className="text-red-500 font-semibold">Deployed</span>
            </div>
          </div>
        </div>

        {isHovered && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-white flex items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              <span>Chat with Agent</span>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-white/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </div>
    </>
  );
}
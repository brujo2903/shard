'use client';

import Image from 'next/image';
import { MessageCircle, Shield, Star } from 'lucide-react';
import { useState } from 'react';
import { useChatContext } from '@/lib/contexts/ChatContext';

interface PinnedAgentProps {
  agent: {
    id: string;
    name: string;
    creator: string;
    description: string;
    marketCap: string;
    image: string;
    percentUp?: number;
    percentDown?: number;
    apiKey: string;
  };
}

export function PinnedAgentCard({ agent }: PinnedAgentProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { setActiveChat } = useChatContext();

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveChat({ agent });
  };

  return (
    <div 
      className="group relative overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleChatClick}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative bg-[#0F1729]/90 border border-yellow-500/20 rounded-lg p-8 backdrop-blur-sm transition-transform duration-300 group-hover:scale-[1.01]">
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-2 bg-yellow-500/10 px-3 py-1.5 rounded-full">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="text-yellow-500 text-sm font-medium">Featured Agent</span>
          </div>
        </div>

        <div className="flex items-start gap-6">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-white/10">
            <Image
              src={agent.image}
              fill
              alt={`${agent.name} avatar`}
              className="object-cover"
              loading="eager"
              sizes="80px"
              quality={95}
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-white/10 mix-blend-overlay" />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{agent.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-green-500 text-sm font-medium">+{agent.percentUp || 0}%</span>
                  <span className="text-red-500 text-sm font-medium">-{agent.percentDown || 0}%</span>
                </div>
              </div>
            </div>

            <p className="text-gray-300 mb-4">
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
        </div>

        {isHovered && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-white flex items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              <span>Chat with Agent</span>
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 via-blue-400 to-white/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </div>
    </div>
  );
}
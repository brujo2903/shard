'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { AgentCard } from './AgentCard';
import { PinnedAgentCard } from './PinnedAgentCard';

const PINNED_AGENT = {
  id: 'sheep',
  name: 'L.E.A Sheep',
  creator: 'shard',
  description: 'A wise and cautious trader, Sheep uses advanced AI to navigate the crypto markets with precision. Powered by state-of-the-art language models, it analyzes market sentiment and executes trades with calculated confidence.',
  marketCap: '$5.2K',
  image: 'https://i.imgur.com/gWg4iFx.png',
  percentUp: 0,
  percentDown: 0,
  apiKey: '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'
};

const SAMPLE_AGENTS = [];

export function ExploreAgentsList() {
  useEffect(() => {
    const timer = setTimeout(() => {
      toast.info(
        'Agent performance percentages will update based on trades predicted by the specific personality you created. Onchain commands via chat with your agent are coming soon.',
        {
          duration: 6000,
          className: 'bg-[#0F1729]/95 border border-white/10 text-white',
          position: 'bottom-center',
        }
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search agents..."
          className="pl-10 bg-[#0F1729]/80 border-white/10 text-white placeholder:text-gray-600 w-full"
        />
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">All Agents</h2>
        <div className="flex gap-4">
          <select className="bg-[#0F1729]/80 border border-white/10 rounded-lg px-4 py-2 text-gray-400 text-sm">
            <option>Token Marketcap</option>
            <option>Highest Volume</option>
            <option>Recently Added</option>
          </select>
          <select className="bg-[#0F1729]/80 border border-white/10 rounded-lg px-4 py-2 text-gray-400 text-sm">
            <option>Agent Creation Date ▼</option>
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-full mb-6">
          <PinnedAgentCard agent={PINNED_AGENT} />
        </div>
        {SAMPLE_AGENTS.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
}
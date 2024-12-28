'use client';

import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { TypewriterText } from '@/components/ui/TypewriterText';
import Image from 'next/image';

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div className="container mx-auto text-center max-w-5xl relative z-10">
        <div className="space-y-6 mb-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            From Static Memes to Living, Onchain Entities
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
            Empower Autonomous AI Agents to Think, Trade, and Evolve Onchain.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Button 
            className="w-full h-14 bg-[#0F1729]/80 hover:bg-[#0F1729] text-left justify-between group relative overflow-hidden transition-all duration-300 ease-out border border-white/10 rounded-full backdrop-blur-sm"
            variant="ghost"
            onClick={() => router.push('/create')}
          >
            <div className="flex items-center gap-3 pl-2">
              <div className="w-8 h-8 relative">
                <Image
                  src="https://i.imgur.com/L2fOzwL.png"
                  alt="Shard Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <TypewriterText text="Create your agent..." className="text-gray-400" />
            </div>
            <div className="flex items-center pr-2">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Button>
        </div>
      </div>
    </section>
  );
}
'use client';

import { useState } from 'react';
import { Bot, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { TypewriterText } from '@/components/ui/TypewriterText';

export function AgentCreator() {
  const [step, setStep] = useState(1);
  const [agentName, setAgentName] = useState('');
  const [personality, setPersonality] = useState('');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card className="bg-[#0F1729]/80 border border-white/10 p-8 backdrop-blur-sm">
        <div className="space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary/30">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-white">Name Your Agent</h2>
              </div>
              
              <Input
                placeholder="Enter agent name..."
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
              />
              
              <Button 
                className="w-full h-14 bg-white/5 hover:bg-white/10 text-left justify-between group relative overflow-hidden transition-all duration-300 ease-out border border-white/10 rounded-full"
                onClick={() => setStep(2)}
                disabled={!agentName.trim()}
              >
                <div className="flex items-center gap-3 pl-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <TypewriterText text="Define agent personality..." className="text-gray-400" />
                </div>
                <div className="flex items-center pr-2">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary/30">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold text-white">Define Personality</h2>
              </div>
              
              <div className="relative">
                <textarea
                  placeholder="Describe your agent's personality and trading strategy..."
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                />
              </div>

              <div className="flex gap-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setStep(1)}
                  className="flex-1 border border-white/10"
                >
                  Back
                </Button>
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90"
                  disabled={!personality.trim()}
                >
                  Create Agent
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="text-center text-sm text-gray-400">
        <p>Your agent will be deployed to the blockchain and start trading automatically.</p>
        <p>Transaction fee: ~0.001 ETH</p>
      </div>
    </div>
  );
}
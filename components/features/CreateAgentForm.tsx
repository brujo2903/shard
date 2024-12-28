'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Bot, Send, Twitter, MessageCircle, Coins, Rocket } from 'lucide-react';
import Image from 'next/image';
import { ImageUpload } from './ImageUpload';
import { SupabaseService } from '@/lib/services/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export const CreateAgentForm = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [agentImage, setAgentImage] = useState<File | null>(null);
  const [agentName, setAgentName] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [telegramUrl, setTelegramUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'agent' }>>([
    {
      sender: 'agent',
      text: "Hey there! I'm here to help you shape your agent's personality. Tell me what it's all about—what's its mission, how does it interact, and what kind of vibe does it have? Is it a bit of a degen risk-taker or more of a by-the-book normie? Share the details, and let's build out its style!"
    }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { text: message, sender: 'user' }]);
    setMessage('');
    
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "I'm analyzing your preferences and crafting the perfect personality traits for your agent.", 
        sender: 'agent' 
      }]);
    }, 1000);
  };

  const handleCreateAgent = useCallback(async () => {
    try {
      setIsSubmitting(true);
      if (!agentImage || !agentName) {
        toast.error('Please fill in all required fields');
        return;
      }

      const imageUrl = await SupabaseService.uploadAgentImage(agentImage);
      
      await SupabaseService.createAgent({
        name: agentName,
        twitterUrl,
        telegramUrl,
        description: messages[messages.length - 1]?.text || '',
        imageUrl,
        personality: messages.filter(m => m.sender === 'user').map(m => m.text).join('\n'),
      });

      toast.success(
        "Your agent has been created! Configure additional settings in Creator Dashboard",
        { duration: 3000 }
      );
      
      setTimeout(() => {
        router.push('/explore');
      }, 1000);
    } catch (error) {
      toast.error('Failed to create agent. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }, [agentImage, agentName, twitterUrl, telegramUrl, messages, router]);

  return (
    <div className="space-y-6">
      <div className="bg-[#0F1729]/80 border border-white/10 rounded-lg p-6 backdrop-blur-sm">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-1">
            <label className="text-sm text-gray-400 mb-2 block">Agent Image*</label>
            <ImageUpload onImageSelect={(file) => setAgentImage(file)} />
          </div>
          <div className="col-span-2 space-y-4">
            <div className="mb-4">
              <label className="text-xs text-gray-400">Agent Name*</label>
              <Input
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="Enter agent name..."
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 h-9"
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Twitter className="w-4 h-4 text-blue-400" />
                <Input
                  readOnly
                  value={twitterUrl}
                  onChange={(e) => setTwitterUrl(e.target.value)}
                  placeholder="Twitter URL"
                  className="bg-white/5 border-white/10 text-gray-500 placeholder:text-gray-600 h-9 cursor-not-allowed opacity-50"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-blue-400" />
                <Input
                  readOnly
                  value={telegramUrl}
                  onChange={(e) => setTelegramUrl(e.target.value)}
                  placeholder="Telegram URL"
                  className="bg-white/5 border-white/10 text-gray-500 placeholder:text-gray-600 h-9 cursor-not-allowed opacity-50"
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button
                aria-disabled="true"
                variant="outline"
                className="flex-1 h-9 bg-white/5 border-white/10 cursor-not-allowed opacity-50"
                onClick={() => router.push('/create/token')}
              >
                <Coins className="w-4 h-4 mr-2 text-yellow-500" />
                Create Token
              </Button>
              <Button
                aria-disabled="true"
                variant="outline"
                className="flex-1 h-9 bg-white/5 border-white/10 cursor-not-allowed opacity-50"
                onClick={() => router.push('/create/pumpfun')}
              >
                <Rocket className="w-4 h-4 mr-2 text-purple-500" />
                Pumpfun Token
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2 mt-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-5 h-5 flex items-center justify-center">
              <Image
                src="https://i.imgur.com/L2fOzwL.png"
                alt="Shard Logo"
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
            <label className="text-xs text-gray-400">Build Your Agent's Personality</label>
          </div>
          <div className="bg-[#0D1117] rounded-lg p-3 h-[200px] overflow-y-auto mb-3 custom-scrollbar">
            {messages.map((msg, i) => (
              <div
                key={i} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`} 
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/5 text-gray-300'
                  }`} 
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Describe your agent's personality..."
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 h-9"
            />
            <Button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 h-9 px-3" 
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      <Button 
        className="w-full h-9 bg-blue-600 hover:bg-blue-700" 
        onClick={handleCreateAgent}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating Agent...' : 'Create Agent'}
      </Button>
      <p className="text-center text-xs text-gray-500">
        Includes 0.01 ETH launch fee, that covers liquidity, initial trading funds for your agent, and a service fee.
      </p>
    </div>
  );
}
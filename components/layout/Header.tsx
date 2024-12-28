'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from './Logo';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLaunchApp = useCallback(() => {
    router.push('/create');
  }, [router]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F1729]/80 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Logo />

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/docs" className="text-gray-400 hover:text-white transition-colors">
              Docs
            </Link>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleLaunchApp}
            >
              Launch App
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#0F1729]/95 backdrop-blur-sm border-t border-white/10">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link href="/docs" className="block text-gray-400 hover:text-white transition-colors">
              Docs
            </Link>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={handleLaunchApp}
            >
              Launch App
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bot, LineChart, LayoutDashboard } from 'lucide-react';

export function AgentSidebar() {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  
  useEffect(() => {
    // Reset active item when pathname changes
    setActiveItem(null);
  }, [pathname]);

  const MENU_ITEMS = [
    { id: 'explore', label: 'Explore Agents', icon: LineChart, path: '/explore' },
    { id: 'dashboard', label: 'Creator Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  ];

  return (
    <aside className="w-64 fixed left-0 top-20 h-[calc(100vh-5rem)] bg-[#0F1729]/80 border-r border-white/10 backdrop-blur-sm overflow-hidden">
      <div className="flex flex-col h-full">
        <div className="p-4 mb-2">
          <Link href="/create">
            <button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2 transition-colors">
              <Bot className="w-5 h-5" />
              <span>Create Agent</span>
            </button>
          </Link>
        </div>

        <nav className="px-2 space-y-1">
          {MENU_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeItem === item.id 
                  ? 'bg-white/10 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
              onClick={() => setActiveItem(item.id)}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-8 px-4 flex-1 overflow-hidden">
          <h3 className="text-sm font-semibold text-gray-400 mb-4 px-2">LEADERBOARD</h3>
          <div className="space-y-1">
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-sm text-gray-300 text-center">
                Agents will be voted on in 24 hours as people gather trading information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
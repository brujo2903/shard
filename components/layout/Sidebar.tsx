'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bot, LineChart, LayoutDashboard } from 'lucide-react';

export function Sidebar() {
  const [activeItem, setActiveItem] = useState('create');
  
  const menuItems = [
    { id: 'create', label: 'Create a New Agent', icon: Bot },
    { id: 'explore', label: 'Explore Agents', icon: LineChart },
    { id: 'dashboard', label: 'Creator Dashboard', icon: LayoutDashboard },
  ];

  return (
    <aside className="w-64 h-screen bg-[#1A1B23] border-r border-white/10 fixed left-0 top-0">
      <div className="p-6">
        <div className="space-y-6">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={`/${item.id}`}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
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
        </div>
      </div>
    </aside>
  );
}
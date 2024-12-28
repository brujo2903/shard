'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TradingTable, TradingTableType } from './TradingTable';

export function TradingView() {
  const [activeTab, setActiveTab] = useState<TradingTableType>('positions');

  const handleTabChange = (value: string) => {
    setActiveTab(value as TradingTableType);
  };

  return (
    <div className="flex-1 bg-[#242731] p-6 rounded-lg">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="balances">Balances</TabsTrigger>
          <TabsTrigger value="orders">Open Orders</TabsTrigger>
          <TabsTrigger value="history">Trade History</TabsTrigger>
        </TabsList>
        
        <div className="mt-4">
          <TradingTable type={activeTab} />
        </div>
      </Tabs>
    </div>
  );
}
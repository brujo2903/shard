'use client';

import { Suspense } from 'react';
import { AgentSidebar } from '@/components/layout/AgentSidebar';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import dynamic from 'next/dynamic';

const DynamicCreateAgentForm = dynamic(
  () => import('@/components/features/CreateAgentForm').then(mod => mod.CreateAgentForm),
  { ssr: false }
);

export default function CreatePage() {
  return (
    <div className="flex min-h-screen bg-[#0F1729]">
      <AgentSidebar />
      <main className="flex-1 ml-64 pt-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-white">Create New Agent</h1>
            <p className="text-sm text-gray-400 mt-1">Deploy your autonomous AI agent to trade and evolve onchain</p>
          </div>
          <Suspense fallback={<LoadingSpinner />}>
            <DynamicCreateAgentForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
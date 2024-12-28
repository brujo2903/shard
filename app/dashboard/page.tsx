import { Sidebar } from '@/components/layout/Sidebar';
import { TradingView } from '@/components/features/TradingView';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#1A1B23]">
      <Sidebar />
      <main className="flex-1 ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-white mb-6">Trading Dashboard</h1>
          <TradingView />
        </div>
      </main>
    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';

export function AgentBrain() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Simulate real-time logs
    const interval = setInterval(() => {
      setLogs(prev => [
        `[${new Date().toISOString()}] Processing market data...`,
        ...prev.slice(0, 9)
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1A1B23] p-6 rounded-lg h-[calc(100vh-12rem)] overflow-auto">
      <h2 className="text-xl font-semibold text-white mb-4">Agent Brain Console</h2>
      <div className="space-y-2 font-mono text-sm">
        {logs.map((log, i) => (
          <div key={i} className="text-gray-400">{log}</div>
        ))}
      </div>
    </div>
  );
}
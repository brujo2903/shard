'use client';

import { useState, useEffect } from 'react';
import { TokenAnalysis } from '@/lib/types/solana';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

interface TokenAnalysisProps {
  analysis: TokenAnalysis;
}

export function TokenAnalysisView({ analysis }: TokenAnalysisProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const SentimentIcon = {
    bullish: ArrowUp,
    bearish: ArrowDown,
    neutral: Minus
  }[analysis.sentiment];

  const sentimentColors = {
    bullish: 'bg-green-500/10 text-green-500',
    bearish: 'bg-red-500/10 text-red-500',
    neutral: 'bg-gray-500/10 text-gray-500'
  }[analysis.sentiment];

  return (
    <Card className="bg-[#0F1729]/80 border border-white/10 p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">{analysis.token.name} Analysis</h2>
        <Badge className={`flex items-center gap-1 ${sentimentColors}`}>
          <SentimentIcon className="w-4 h-4" />
          {analysis.sentiment.charAt(0).toUpperCase() + analysis.sentiment.slice(1)}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="text-sm text-gray-400">Price</div>
            <div className="text-lg font-semibold text-white">${analysis.token.price.toFixed(6)}</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="text-sm text-gray-400">Market Cap</div>
            <div className="text-lg font-semibold text-white">${analysis.token.marketCap.toLocaleString()}</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="text-sm text-gray-400">24h Volume</div>
            <div className="text-lg font-semibold text-white">${analysis.token.volume24h.toLocaleString()}</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg">
            <div className="text-sm text-gray-400">Holders</div>
            <div className="text-lg font-semibold text-white">{analysis.token.holders.toLocaleString()}</div>
          </div>
        </div>

        <div className="bg-white/5 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-2">Analysis</h3>
          <p className="text-gray-300 whitespace-pre-line">{analysis.analysis}</p>
        </div>

        {analysis.recommendations.length > 0 && (
          <div className="bg-white/5 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Recommendations</h3>
            <ul className="space-y-2">
              {analysis.recommendations.map((rec, index) => (
                <li key={index} className="text-gray-300 flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}
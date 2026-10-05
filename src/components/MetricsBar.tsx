import React from 'react';

interface Props {
  initialFloor: number;
  requestsCount: number;
  servedCount: number;
  totalCost: number;
  nodesExpanded: number;
  status: 'IDLE' | 'SEARCHING' | 'GOAL REACHED' | 'FAILED';
}

export const MetricsBar: React.FC<Props> = ({
  initialFloor,
  requestsCount,
  servedCount,
  totalCost,
  nodesExpanded,
  status
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-3 mb-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        <div className="flex-1 min-w-[120px] px-4 py-2 border-r border-slate-800/50">
          <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Status</div>
          <div className={`text-sm font-bold tracking-wider flex items-center gap-2 ${
            status === 'GOAL REACHED' ? 'text-green-400' : 
            status === 'SEARCHING' ? 'text-cyan-400' : 
            status === 'FAILED' ? 'text-red-400' : 'text-slate-300'
          }`}>
            {status === 'SEARCHING' && <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>}
            {status}
          </div>
        </div>

        <div className="flex-1 min-w-[120px] px-4 py-2 border-r border-slate-800/50">
          <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Current Floor</div>
          <div className="text-xl font-mono text-slate-200">{String(initialFloor).padStart(2, '0')}</div>
        </div>

        <div className="flex-1 min-w-[120px] px-4 py-2 border-r border-slate-800/50">
          <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Requests Served</div>
          <div className="text-xl font-mono text-slate-200">
            <span className={servedCount === requestsCount && requestsCount > 0 ? "text-green-400" : ""}>
              {String(servedCount).padStart(2, '0')}
            </span>
            <span className="text-slate-600 text-sm mx-1">/</span>
            <span className="text-slate-400">{String(requestsCount).padStart(2, '0')}</span>
          </div>
        </div>

        <div className="flex-1 min-w-[120px] px-4 py-2 border-r border-slate-800/50 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-900/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
          <div className="text-[10px] text-cyan-500 uppercase tracking-widest font-bold mb-1 relative z-10">Total Cost</div>
          <div className="text-2xl font-mono text-cyan-400 font-bold relative z-10">{String(totalCost).padStart(2, '0')}</div>
        </div>

        <div className="flex-1 min-w-[120px] px-4 py-2">
          <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">States Explored</div>
          <div className="text-xl font-mono text-slate-300">{String(nodesExpanded).padStart(2, '0')}</div>
        </div>

      </div>
    </div>
  );
};

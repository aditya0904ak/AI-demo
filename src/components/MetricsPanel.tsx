import React from 'react';

interface Props {
  initialFloor: number;
  requestsCount: number;
  servedCount: number;
  totalCost: number;
  nodesExpanded: number;
  routeLength: number;
  status: 'IDLE' | 'SEARCHING' | 'GOAL REACHED' | 'FAILED';
}

export const MetricsPanel: React.FC<Props> = ({
  initialFloor,
  requestsCount,
  servedCount,
  totalCost,
  nodesExpanded,
  routeLength,
  status
}) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
      <h3 className="text-lg font-semibold text-slate-200 mb-4 pb-2 border-b border-slate-800">Metrics</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-slate-950 p-3 rounded border border-slate-800">
          <span className="text-xs text-slate-500 block mb-1 uppercase tracking-wider">Initial Floor</span>
          <span className="text-xl font-bold text-slate-200">{initialFloor}</span>
        </div>
        <div className="bg-slate-950 p-3 rounded border border-slate-800">
          <span className="text-xs text-slate-500 block mb-1 uppercase tracking-wider">Requests</span>
          <span className="text-xl font-bold text-slate-200">{servedCount} / {requestsCount}</span>
        </div>
        <div className="bg-slate-950 p-3 rounded border border-cyan-900/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-cyan-500/5"></div>
          <span className="text-xs text-cyan-400 block mb-1 uppercase tracking-wider relative z-10">Total Travel Cost</span>
          <span className="text-2xl font-bold text-cyan-50 relative z-10">{totalCost}</span>
        </div>
        <div className="bg-slate-950 p-3 rounded border border-slate-800">
          <span className="text-xs text-slate-500 block mb-1 uppercase tracking-wider">Nodes Expanded</span>
          <span className="text-xl font-bold text-slate-200">{nodesExpanded}</span>
        </div>
        <div className="bg-slate-950 p-3 rounded border border-slate-800">
          <span className="text-xs text-slate-500 block mb-1 uppercase tracking-wider">Route Stops</span>
          <span className="text-xl font-bold text-slate-200">{routeLength}</span>
        </div>
        <div className={`p-3 rounded border flex flex-col justify-center ${
          status === 'GOAL REACHED' ? 'bg-green-950/30 border-green-900/50' : 
          status === 'SEARCHING' ? 'bg-amber-950/30 border-amber-900/50' : 
          status === 'FAILED' ? 'bg-red-950/30 border-red-900/50' :
          'bg-slate-950 border-slate-800'
        }`}>
          <span className="text-xs opacity-70 block mb-1 uppercase tracking-wider">Status</span>
          <span className={`text-sm font-bold ${
            status === 'GOAL REACHED' ? 'text-green-400' : 
            status === 'SEARCHING' ? 'text-amber-400 animate-pulse' : 
            status === 'FAILED' ? 'text-red-400' :
            'text-slate-400'
          }`}>{status}</span>
        </div>
      </div>
    </div>
  );
};

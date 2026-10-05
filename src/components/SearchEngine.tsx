import React from 'react';
import type { AStarNode } from '../algorithms/astar';
import { Database, Network } from 'lucide-react';

interface Props {
  node: AStarNode | null;
  frontier: AStarNode[];
}

export const SearchEngine: React.FC<Props> = ({ node, frontier }) => {
  if (!node) {
    return (
      <div className="bg-[#0b1121] border border-slate-800 rounded-lg p-5 h-full flex items-center justify-center">
        <div className="text-center text-slate-500">
          <Database size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm font-bold tracking-widest uppercase">Engine Idle</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0b1121] border border-slate-800 rounded-lg overflow-hidden flex flex-col h-full shadow-lg relative isolate">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="px-5 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/50">
        <div className="flex items-center gap-2">
          <Network size={16} className="text-cyan-400" />
          <h2 className="text-xs font-bold tracking-widest text-slate-200 uppercase">A* Search Engine</h2>
        </div>
        <div className="flex items-center gap-1.5 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-900/50">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_5px_rgba(6,182,212,0.8)]"></span>
          <span className="text-[9px] text-cyan-400 tracking-widest uppercase font-bold">Computing</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-6">
        
        {/* CURRENT STATE */}
        <div>
          <h3 className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3 border-b border-slate-800/50 pb-2">Current Expanded State</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500"></div>
              <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1">Floor</span>
              <span className="text-3xl font-mono text-cyan-50 font-bold">{String(node.state.currentFloor).padStart(2, '0')}</span>
            </div>
            <div className="bg-slate-950 rounded-lg p-3 border border-slate-800">
              <span className="block text-[10px] text-slate-500 uppercase tracking-widest mb-1">Pending</span>
              <span className="text-lg font-mono text-slate-300 tracking-wider">
                {node.state.pendingRequests.length > 0 ? 
                  `{${node.state.pendingRequests.map(r => String(r).padStart(2,'0')).join(' · ')}}` : 
                  '{}'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-slate-900/50 border border-slate-800 rounded p-2 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-1">g(n)</span>
              <span className="font-mono text-lg text-slate-300">{String(node.g).padStart(2, '0')}</span>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded p-2 text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-1">h(n)</span>
              <span className="font-mono text-lg text-slate-300">{String(node.h).padStart(2, '0')}</span>
            </div>
            <div className="bg-cyan-950/30 border border-cyan-800/50 rounded p-2 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-cyan-400/5"></div>
              <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest block mb-1 relative z-10">f(n)</span>
              <span className="font-mono text-2xl font-bold text-cyan-400 relative z-10">{String(node.f).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
        
        {/* FRONTIER */}
        <div className="flex-1 flex flex-col min-h-0">
          <h3 className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-3 border-b border-slate-800/50 pb-2">Priority Queue (Frontier)</h3>
          
          {frontier.length === 0 ? (
            <div className="flex-1 flex items-center justify-center border border-slate-800/50 border-dashed rounded-lg text-sm text-slate-500 uppercase tracking-widest font-bold">
              Empty
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto pr-2 space-y-2">
              {frontier.map((fNode, idx) => {
                const isBest = idx === 0;
                return (
                  <div key={idx} className={`rounded-md p-2 flex items-center justify-between border ${
                    isBest 
                      ? 'bg-cyan-950/40 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)] relative overflow-hidden' 
                      : 'bg-slate-900/30 border-slate-800/80 hover:bg-slate-900/60'
                  }`}>
                    {isBest && <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-400"></div>}
                    
                    <div className={`font-mono text-xs pl-2 ${isBest ? 'text-cyan-50' : 'text-slate-400'}`}>
                      F{String(fNode.state.currentFloor).padStart(2, '0')}
                      <span className="mx-2 text-slate-600">|</span>
                      {`{${fNode.state.pendingRequests.join(',')}}`}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs font-mono">
                      <div className="text-slate-500 hidden sm:block">g:{fNode.g}</div>
                      <div className="text-slate-500 hidden sm:block">h:{fNode.h}</div>
                      <div className={`font-bold ${isBest ? 'text-cyan-400 text-sm' : 'text-slate-300'}`}>
                        f = {String(fNode.f).padStart(2, '0')}
                      </div>
                      {isBest && (
                        <div className="text-[9px] uppercase tracking-widest font-bold text-cyan-300 bg-cyan-900/60 px-1.5 py-0.5 rounded ml-1">
                          ← Best
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import type { AStarTraceStep } from '../algorithms/astar';
import { Share2 } from 'lucide-react';

interface Props {
  trace: AStarTraceStep[];
  currentStepIndex: number;
}

export const StateSpaceGraph: React.FC<Props> = ({ trace, currentStepIndex }) => {
  if (trace.length === 0 || currentStepIndex < 0) return null;

  const currentStep = trace[currentStepIndex];
  if (!currentStep) return null;

  const { currentNode, successors } = currentStep;

  return (
    <div className="bg-[#0b1121] border border-slate-800 rounded-lg p-5 shadow-lg h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800/80">
        <Share2 size={16} className="text-blue-400" />
        <h3 className="text-xs font-bold tracking-widest text-slate-200 uppercase">State Space Expansion</h3>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Parent Node */}
        <div className="relative">
          <div className="bg-cyan-950/40 border-2 border-cyan-500/50 rounded-lg p-3 w-40 text-center shadow-[0_0_15px_rgba(6,182,212,0.2)] z-10 relative">
            <div className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold mb-1">Current State</div>
            <div className="text-lg font-mono text-slate-100 font-bold mb-1">Floor {String(currentNode.state.currentFloor).padStart(2, '0')}</div>
            <div className="text-xs font-mono text-slate-400">
              {`{${currentNode.state.pendingRequests.join(',')}}`}
            </div>
            <div className="mt-2 text-xs font-mono font-bold text-cyan-300">
              f = {currentNode.f}
            </div>
          </div>
          
          {/* Edges & Successors */}
          {successors.length > 0 && (
            <div className="mt-8 relative flex justify-center gap-4 md:gap-8">
              {/* Connecting vertical line from parent */}
              <div className="absolute top-[-32px] left-1/2 w-0.5 h-8 bg-slate-700 -translate-x-1/2 -z-10"></div>
              
              {/* Horizontal connector line */}
              {successors.length > 1 && (
                <div className="absolute top-[-16px] h-0.5 bg-slate-700 -z-10" 
                     style={{ 
                       left: `calc(${100 / (successors.length * 2)}%)`, 
                       right: `calc(${100 / (successors.length * 2)}%)` 
                     }}></div>
              )}
              
              {successors.map((succ, idx) => {
                // Find if this is the lowest f(n) among successors (could be tied)
                const minF = Math.min(...successors.map(s => s.f));
                const isBest = succ.f === minF;
                
                return (
                  <div key={idx} className="relative flex flex-col items-center">
                    {/* Vertical line to child */}
                    <div className="w-0.5 h-4 bg-slate-700 -mt-4 mb-2 -z-10"></div>
                    
                    <div className={`rounded-lg p-2 w-28 text-center border transition-all ${
                      isBest 
                        ? 'bg-slate-900 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.15)]' 
                        : 'bg-slate-950/80 border-slate-800'
                    }`}>
                      <div className="text-sm font-mono text-slate-200 font-bold">F{String(succ.state.currentFloor).padStart(2, '0')}</div>
                      <div className="text-[10px] font-mono text-slate-500 my-1">
                        {`{${succ.state.pendingRequests.join(',')}}`}
                      </div>
                      <div className={`text-[10px] font-mono font-bold ${isBest ? 'text-cyan-400' : 'text-slate-400'}`}>
                        f={succ.f}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {successors.length === 0 && currentNode.state.pendingRequests.length === 0 && (
            <div className="mt-6 flex justify-center">
              <div className="w-0.5 h-6 bg-green-500/50 mb-2"></div>
              <div className="absolute top-full mt-6 bg-green-950/40 border border-green-500/50 text-green-400 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                Goal Reached
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

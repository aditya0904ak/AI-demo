import React from 'react';
import type { AStarTraceStep } from '../algorithms/astar';
import { Activity, ArrowRight } from 'lucide-react';

interface Props {
  trace: AStarTraceStep[];
  currentStepIndex: number;
  status: 'IDLE' | 'SEARCHING' | 'GOAL REACHED' | 'FAILED';
}

export const ExecutionTrace: React.FC<Props> = ({ trace, currentStepIndex, status }) => {
  const visibleTrace = trace.slice(0, currentStepIndex + 1);

  return (
    <div className="bg-[#0b1121] border border-slate-800 rounded-lg overflow-hidden flex flex-col h-full shadow-lg">
      <div className="px-5 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/50">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-cyan-500" />
          <h2 className="text-xs font-bold tracking-widest text-slate-200 uppercase">Execution Trace</h2>
        </div>
      </div>

      <div className="p-5 flex-1 overflow-y-auto">
        {visibleTrace.length === 0 ? (
          <div className="h-full flex items-center justify-center text-sm font-bold tracking-widest uppercase text-slate-600">
            Awaiting Execution
          </div>
        ) : (
          <div className="relative border-l-2 border-slate-800/80 ml-3 space-y-6 pb-4">
            {visibleTrace.map((t, idx) => {
              const isLast = idx === visibleTrace.length - 1;
              const isGoal = isLast && status === 'GOAL REACHED';
              
              return (
                <div key={idx} className="relative pl-6">
                  {/* Timeline dot */}
                  <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-[#0b1121] ${
                    isGoal ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]' : 
                    isLast ? 'bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-pulse' : 
                    'bg-slate-700'
                  }`}></div>
                  
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">
                      Step {String(t.step).padStart(2, '0')}
                    </span>
                    <span className={`text-xs font-bold tracking-wider ${isGoal ? 'text-green-400' : 'text-slate-200'}`}>
                      {idx === 0 ? 'INITIAL STATE' : isGoal ? 'GOAL REACHED' : `EXPAND FLOOR ${String(t.currentNode.state.currentFloor).padStart(2, '0')}`}
                    </span>
                  </div>
                  
                  <div className={`bg-slate-900/50 border rounded-lg p-3 mt-2 ${
                    isGoal ? 'border-green-900/50 shadow-inner' : 
                    isLast ? 'border-cyan-900/50' : 
                    'border-slate-800/80'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-xs font-mono text-slate-400">
                        State: ({String(t.currentNode.state.currentFloor).padStart(2, '0')}, {`{${t.currentNode.state.pendingRequests.join(',')}}`})
                      </div>
                      <div className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                        isGoal ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-300'
                      }`}>
                        f(n) = {t.currentNode.f}
                      </div>
                    </div>

                    {!isGoal && t.successors.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-800/50">
                        <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-2">Generated Successors:</div>
                        <div className="space-y-1.5">
                          {t.successors.map((succ, sIdx) => {
                            // Find if this successor was chosen in the next step
                            const isChosen = visibleTrace[idx + 1]?.currentNode.state.currentFloor === succ.state.currentFloor;
                            
                            return (
                              <div key={sIdx} className={`flex items-center justify-between text-xs font-mono rounded px-2 py-1 border ${
                                isChosen 
                                  ? 'bg-cyan-950/30 border-cyan-800/50 text-cyan-300' 
                                  : 'bg-slate-950/50 border-slate-800/50 text-slate-400'
                              }`}>
                                <div className="flex items-center gap-2">
                                  <ArrowRight size={12} className={isChosen ? 'text-cyan-400' : 'text-slate-600'} />
                                  <span>Move to {String(succ.state.currentFloor).padStart(2, '0')}</span>
                                </div>
                                <div className="flex gap-3">
                                  <span>+cost:{Math.abs(t.currentNode.state.currentFloor - succ.state.currentFloor)}</span>
                                  <span className={isChosen ? 'font-bold text-cyan-400' : ''}>f:{succ.f}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
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
  );
};

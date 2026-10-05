import React from 'react';
import type { AStarTraceStep } from '../algorithms/astar';

interface Props {
  trace: AStarTraceStep[];
  currentStepIndex: number;
}

export const SearchTrace: React.FC<Props> = ({ trace, currentStepIndex }) => {
  const visibleTrace = trace.slice(0, currentStepIndex + 1);

  if (visibleTrace.length === 0) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 h-full">
        <h3 className="text-lg font-semibold text-slate-200 mb-2">A* Search Trace</h3>
        <p className="text-slate-400 text-sm">Waiting for search to start...</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col h-full max-h-[500px]">
      <h3 className="text-lg font-semibold text-slate-200 mb-4 pb-2 border-b border-slate-800">A* Search Trace</h3>
      <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4">
        {visibleTrace.map((t, idx) => (
          <div key={idx} className="bg-slate-950 border border-slate-800 rounded p-3 text-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-cyan-400">Step {t.step}</span>
              <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300 font-mono">
                f = {t.currentNode.f}
              </span>
            </div>
            <div className="text-slate-300 font-mono text-xs mb-3 space-y-1">
              <div>Floor: <span className="text-slate-100">{t.currentNode.state.currentFloor}</span></div>
              <div>Pending: {t.currentNode.state.pendingRequests.length > 0 ? `{${t.currentNode.state.pendingRequests.join(',')}}` : '{}'}</div>
              <div>g = {t.currentNode.g}, h = {t.currentNode.h}</div>
            </div>
            
            {t.successors.length > 0 ? (
              <div>
                <div className="text-xs text-slate-400 mb-1 border-b border-slate-800 pb-1">Expanded successors:</div>
                <div className="space-y-2 mt-2">
                  {t.successors.map((succ, sIdx) => (
                    <div key={sIdx} className="bg-slate-900 border border-slate-800 rounded p-2 text-xs font-mono">
                      <div className="text-cyan-300 mb-1">→ Move to {succ.state.currentFloor}</div>
                      <div className="flex justify-between text-slate-400">
                        <span>g = {succ.g}</span>
                        <span>h = {succ.h}</span>
                        <span className="text-slate-200 font-bold">f = {succ.f}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-2 text-xs text-green-400 bg-green-900/20 p-2 rounded border border-green-900/50">
                {t.currentNode.state.pendingRequests.length === 0 ? 'Goal Reached!' : 'No successors (Dead end)'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';
import { Lightbulb } from 'lucide-react';

export const WhyAStar: React.FC = () => {
  return (
    <div className="bg-[#0b1121] border border-slate-800 rounded-lg p-5 shadow-lg h-full">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800/80">
        <Lightbulb size={16} className="text-amber-400" />
        <h3 className="text-xs font-bold tracking-widest text-slate-200 uppercase">Why Did A* Choose This?</h3>
      </div>
      
      <div className="space-y-4">
        <div className="bg-slate-900/80 p-3 rounded border border-slate-800/80">
          <div className="text-center font-mono text-cyan-400 font-bold text-lg mb-2">
            f(n) = g(n) + h(n)
          </div>
          <p className="text-xs text-slate-400 text-center">
            A* evaluates possible next states using this cost function.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex gap-3 items-start">
            <div className="font-mono text-xs font-bold text-slate-300 w-10 shrink-0">g(n)</div>
            <div className="text-xs text-slate-400">Actual travel cost already performed from the start node to state n.</div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="font-mono text-xs font-bold text-slate-300 w-10 shrink-0">h(n)</div>
            <div className="text-xs text-slate-400">Estimated remaining travel cost (Heuristic). Here, we use the <span className="text-cyan-400 font-semibold">Maximum Distance</span> to any unvisited request.</div>
          </div>
          <div className="flex gap-3 items-start">
            <div className="font-mono text-xs font-bold text-cyan-400 w-10 shrink-0">f(n)</div>
            <div className="text-xs text-slate-400">Estimated total movement cost. The algorithm always expands the node with the lowest f(n) first.</div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800/50">
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <span>Lowest f(n)</span>
            <span className="text-cyan-500">→</span>
            <span>Next State</span>
            <span className="text-cyan-500">→</span>
            <span>Goal</span>
          </div>
        </div>
      </div>
    </div>
  );
};

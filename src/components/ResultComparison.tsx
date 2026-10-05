import React from 'react';
import { CheckCircle2, TrendingUp } from 'lucide-react';

interface RouteStat {
  name: string;
  route: number[];
  cost: number;
  isOptimal?: boolean;
}

interface Props {
  routes: RouteStat[];
  requestsCount: number;
}

export const ResultComparison: React.FC<Props> = ({ routes, requestsCount }) => {
  if (routes.length === 0) return null;

  const maxCost = Math.max(...routes.map(r => r.cost));
  const optimalRoute = routes.find(r => r.isOptimal);

  return (
    <div className="bg-[#0b1121] border border-slate-800 rounded-lg p-6 shadow-xl flex flex-col md:flex-row gap-8 items-stretch relative isolate overflow-hidden">
      {/* Background glow for win state */}
      <div className="absolute left-0 bottom-0 w-1/3 h-full bg-green-500/5 blur-3xl -z-10"></div>
      
      {/* WIN STATE */}
      <div className="flex-1 border-r border-slate-800/80 pr-8 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 size={24} className="text-green-400" />
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">OPTIMAL ROUTE FOUND</h2>
        </div>
        
        {optimalRoute && (
          <>
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-lg p-5 mb-6">
              <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-2">Final Path</div>
              <div className="text-2xl font-mono text-cyan-400 font-bold break-words leading-relaxed">
                {optimalRoute.route.map(r => String(r).padStart(2, '0')).join(' → ')}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-1">Movement Cost</div>
                <div className="text-3xl font-mono text-green-400 font-bold">{String(optimalRoute.cost).padStart(2, '0')}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-1">Requests Served</div>
                <div className="text-3xl font-mono text-slate-200 font-bold">{String(requestsCount).padStart(2, '0')} <span className="text-slate-500 text-lg">/ {String(requestsCount).padStart(2, '0')}</span></div>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 mt-6 leading-relaxed border-t border-slate-800/50 pt-4">
              A* evaluated possible states and successfully selected the minimum-cost solution without exhaustive search.
            </p>
          </>
        )}
      </div>

      {/* COMPARISON CHART */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp size={16} className="text-slate-400" />
          <h3 className="text-xs font-bold tracking-widest text-slate-300 uppercase">Algorithm Comparison</h3>
        </div>
        
        <div className="space-y-6">
          {routes.map((r, idx) => {
            const widthPct = maxCost > 0 ? (r.cost / maxCost) * 100 : 100;
            return (
              <div key={idx} className="relative">
                <div className="flex justify-between items-end mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold tracking-widest uppercase ${r.isOptimal ? 'text-green-400' : 'text-slate-400'}`}>
                      {r.name}
                    </span>
                    {r.isOptimal && (
                      <span className="text-[9px] uppercase tracking-widest bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded border border-green-500/30">
                        Optimal
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-mono font-bold text-slate-300">
                    Cost: {r.cost}
                  </div>
                </div>
                
                {/* Bar */}
                <div className="h-4 bg-slate-950 rounded overflow-hidden flex items-center border border-slate-800">
                  <div 
                    className={`h-full transition-all duration-1000 ease-out ${
                      r.isOptimal ? 'bg-gradient-to-r from-green-600 to-green-400' : 'bg-slate-700'
                    }`}
                    style={{ width: `${widthPct}%` }}
                  ></div>
                </div>
                
                <div className="text-[10px] font-mono text-slate-500 mt-1 truncate">
                  {r.route.join(' → ')}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
    </div>
  );
};

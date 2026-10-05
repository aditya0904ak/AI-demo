import React from 'react';

interface RouteStat {
  name: string;
  route: number[];
  cost: number;
  isOptimal?: boolean;
}

interface Props {
  routes: RouteStat[];
}

export const RouteComparison: React.FC<Props> = ({ routes }) => {
  if (routes.length === 0) {
    return null;
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
      <h3 className="text-lg font-semibold text-slate-200 mb-4 pb-2 border-b border-slate-800">Algorithm Comparison</h3>
      <div className="space-y-3">
        {routes.map((r, idx) => (
          <div key={idx} className={`p-3 rounded border ${r.isOptimal ? 'bg-cyan-950/30 border-cyan-800/50' : 'bg-slate-950 border-slate-800'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className={`font-semibold text-sm ${r.isOptimal ? 'text-cyan-400' : 'text-slate-300'}`}>
                {r.name}
              </span>
              {r.isOptimal && (
                <span className="text-[10px] uppercase tracking-wider bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded">
                  Optimal
                </span>
              )}
            </div>
            <div className="text-xs font-mono text-slate-400 mb-2">
              {r.route.join(' → ')}
            </div>
            <div className="text-sm">
              <span className="text-slate-500">Total Cost: </span>
              <span className={`font-bold ${r.isOptimal ? 'text-cyan-400' : 'text-slate-200'}`}>{r.cost} floors</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Play, RotateCcw, BookOpen, Settings, Hash } from 'lucide-react';

interface Props {
  onRunSearch: (initialFloor: number, minFloor: number, maxFloor: number, requests: number[]) => void;
  onReset: () => void;
  onLoadExample: () => void;
  disabled: boolean;
  status: 'IDLE' | 'SEARCHING' | 'GOAL REACHED' | 'FAILED';
}

export const ControlConsole: React.FC<Props> = ({
  onRunSearch,
  onReset,
  onLoadExample,
  disabled,
  status
}) => {
  const [initialFloor, setInitialFloor] = useState<string>('02');
  const [minFloor, setMinFloor] = useState<string>('00');
  const [maxFloor, setMaxFloor] = useState<string>('10');
  const [requestsStr, setRequestsStr] = useState<string>('03, 05, 08');
  const [error, setError] = useState<string | null>(null);

  const handleRun = () => {
    setError(null);
    const min = parseInt(minFloor);
    const max = parseInt(maxFloor);
    const initial = parseInt(initialFloor);
    
    if (isNaN(min) || isNaN(max) || min >= max) {
      setError("Invalid building range.");
      return;
    }
    if (isNaN(initial) || initial < min || initial > max) {
      setError(`Initial must be ${min}-${max}.`);
      return;
    }

    const reqs = requestsStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    
    if (reqs.some(r => r < min || r > max)) {
      setError(`Requests must be ${min}-${max}.`);
      return;
    }
    
    const uniqueReqs = [...new Set(reqs)];
    onRunSearch(initial, min, max, uniqueReqs);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-300">
          <Settings size={16} className="text-cyan-500" />
          <h2 className="text-xs font-bold tracking-widest uppercase">Simulation Control</h2>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          <span className="text-[9px] text-slate-500 tracking-widest uppercase">Manual</span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Initial Floor</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Hash size={14} className="text-slate-600" />
              </div>
              <input 
                type="text" 
                value={initialFloor} 
                onChange={e => setInitialFloor(e.target.value)}
                className="bg-slate-950 border border-slate-700/50 rounded-md py-2 pl-9 pr-3 w-full text-sm font-mono text-cyan-50 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner"
                disabled={disabled}
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Range</label>
            <div className="flex gap-1 items-center">
              <input 
                type="text" 
                value={minFloor} 
                onChange={e => setMinFloor(e.target.value)}
                className="bg-slate-950 border border-slate-700/50 rounded-md py-2 px-2 w-full text-sm font-mono text-center text-slate-300 outline-none focus:border-cyan-500 transition-all"
                disabled={disabled}
              />
              <span className="text-slate-600">—</span>
              <input 
                type="text" 
                value={maxFloor} 
                onChange={e => setMaxFloor(e.target.value)}
                className="bg-slate-950 border border-slate-700/50 rounded-md py-2 px-2 w-full text-sm font-mono text-center text-slate-300 outline-none focus:border-cyan-500 transition-all"
                disabled={disabled}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Pending Requests</label>
          <input 
            type="text" 
            value={requestsStr} 
            onChange={e => setRequestsStr(e.target.value)}
            className="bg-slate-950 border border-slate-700/50 rounded-md py-3 px-4 w-full text-base font-mono tracking-widest text-cyan-50 outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner"
            placeholder="03, 05, 08"
            disabled={disabled}
          />
        </div>

        {error && (
          <div className="text-[11px] text-red-400 bg-red-950/30 px-3 py-2 rounded border border-red-900/50 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
            {error}
          </div>
        )}

        <div className="mt-auto pt-4 flex flex-col gap-3">
          <button 
            onClick={handleRun}
            disabled={disabled || status === 'SEARCHING'}
            className={`w-full py-3 px-4 rounded-md font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${
              status === 'SEARCHING'
                ? 'bg-cyan-900/50 text-cyan-400 border border-cyan-800 cursor-not-allowed'
                : status === 'GOAL REACHED'
                ? 'bg-green-600 hover:bg-green-500 text-white shadow-green-900/50'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-900/50 hover:shadow-cyan-500/30'
            }`}
          >
            {status === 'SEARCHING' ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin"></span>
                Searching...
              </>
            ) : status === 'GOAL REACHED' ? (
              <>
                <RotateCcw size={16} />
                Run Again
              </>
            ) : (
              <>
                <Play size={16} fill="currentColor" />
                Run A* Search
              </>
            )}
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onReset}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors border border-slate-700"
            >
              <RotateCcw size={14} />
              Reset
            </button>
            <button 
              onClick={() => {
                setInitialFloor('02');
                setMinFloor('00');
                setMaxFloor('10');
                setRequestsStr('03, 05, 08');
                onLoadExample();
              }}
              disabled={disabled}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 py-2.5 rounded text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors border border-slate-700 disabled:opacity-50"
            >
              <BookOpen size={14} />
              Case Study
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

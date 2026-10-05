import React, { useState } from 'react';
import { Play, RotateCcw, BookOpen, Settings2 } from 'lucide-react';

interface Props {
  onRunSearch: (initialFloor: number, minFloor: number, maxFloor: number, requests: number[]) => void;
  onReset: () => void;
  onLoadExample: () => void;
  disabled: boolean;
}

export const InputPanel: React.FC<Props> = ({
  onRunSearch,
  onReset,
  onLoadExample,
  disabled
}) => {
  const [initialFloor, setInitialFloor] = useState<string>('2');
  const [minFloor, setMinFloor] = useState<string>('0');
  const [maxFloor, setMaxFloor] = useState<string>('10');
  const [requestsStr, setRequestsStr] = useState<string>('3, 5, 8');
  const [error, setError] = useState<string | null>(null);

  const handleRun = () => {
    setError(null);
    const min = parseInt(minFloor);
    const max = parseInt(maxFloor);
    const initial = parseInt(initialFloor);
    
    if (isNaN(min) || isNaN(max) || min >= max) {
      setError("Invalid building floors range.");
      return;
    }
    if (isNaN(initial) || initial < min || initial > max) {
      setError(`Initial floor must be between ${min} and ${max}.`);
      return;
    }

    const reqs = requestsStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    
    // Validation
    if (reqs.some(r => r < min || r > max)) {
      setError(`All requests must be within ${min} and ${max}.`);
      return;
    }
    
    // Remove duplicates
    const uniqueReqs = [...new Set(reqs)];

    onRunSearch(initial, min, max, uniqueReqs);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
      <div className="flex items-center gap-2 mb-4 text-slate-200 border-b border-slate-800 pb-3">
        <Settings2 size={20} className="text-cyan-400" />
        <h2 className="text-lg font-semibold">Simulation Configuration</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Building Floors</label>
          <div className="flex gap-2">
            <input 
              type="number" 
              value={minFloor} 
              onChange={e => setMinFloor(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded px-3 py-2 w-full text-sm text-slate-200 outline-none focus:border-cyan-500 transition-colors"
              placeholder="Min"
              disabled={disabled}
            />
            <span className="text-slate-500 self-center">to</span>
            <input 
              type="number" 
              value={maxFloor} 
              onChange={e => setMaxFloor(e.target.value)}
              className="bg-slate-950 border border-slate-700 rounded px-3 py-2 w-full text-sm text-slate-200 outline-none focus:border-cyan-500 transition-colors"
              placeholder="Max"
              disabled={disabled}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Initial Elevator Floor</label>
          <input 
            type="number" 
            value={initialFloor} 
            onChange={e => setInitialFloor(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded px-3 py-2 w-full text-sm text-slate-200 outline-none focus:border-cyan-500 transition-colors"
            disabled={disabled}
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Pending Requests (comma separated)</label>
          <input 
            type="text" 
            value={requestsStr} 
            onChange={e => setRequestsStr(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded px-3 py-2 w-full text-sm text-slate-200 outline-none focus:border-cyan-500 transition-colors"
            placeholder="e.g. 3, 5, 8"
            disabled={disabled}
          />
        </div>

        {error && (
          <div className="text-red-400 text-sm bg-red-950/30 p-2 rounded border border-red-900/50">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-2 pt-2 border-t border-slate-800">
          <button 
            onClick={handleRun}
            disabled={disabled}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-4 rounded font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(6,182,212,0.3)] hover:shadow-[0_0_15px_rgba(6,182,212,0.5)]"
          >
            <Play size={18} />
            Run A* Search
          </button>
          
          <div className="flex gap-2">
            <button 
              onClick={onReset}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 px-4 rounded font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw size={16} />
              Reset
            </button>
            <button 
              onClick={() => {
                setInitialFloor('2');
                setMinFloor('0');
                setMaxFloor('10');
                setRequestsStr('3, 5, 8');
                onLoadExample();
              }}
              disabled={disabled}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 px-4 rounded font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
              <BookOpen size={16} />
              Load Example
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

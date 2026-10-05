import React from 'react';
import { Cpu, MonitorPlay, XSquare } from 'lucide-react';

interface Props {
  presentationMode: boolean;
  onTogglePresentation: () => void;
}

export const Header: React.FC<Props> = ({ presentationMode, onTogglePresentation }) => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-slate-800/80">
      <div className="flex items-start gap-4">
        <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-700 shadow-[0_0_15px_rgba(30,41,59,0.5)]">
          <Cpu size={32} className="text-cyan-400" />
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[10px] tracking-widest font-bold px-2 py-0.5 bg-slate-900 text-slate-400 rounded border border-slate-800 uppercase">
              AI Optimization System
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-green-400 tracking-widest font-bold uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.8)]"></span>
              System Online
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-100">
            INTELLIGENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">ELEVATOR SCHEDULING</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1 uppercase tracking-widest font-medium">
            A* Search Based Movement Optimization
          </p>
        </div>
      </div>
      
      <div className="mt-4 md:mt-0 flex flex-col items-end gap-3">
        <div className="text-right hidden md:block">
          <div className="text-[10px] text-slate-500 tracking-widest font-mono mb-1 uppercase">Mode</div>
          <div className="text-sm font-bold text-cyan-400 tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 border border-cyan-400 bg-cyan-900/50 rotate-45 inline-block"></span>
            LIVE SIMULATION
          </div>
        </div>
        
        <button 
          onClick={onTogglePresentation}
          className={`flex items-center gap-2 px-4 py-2 rounded-md font-bold text-xs uppercase tracking-wider transition-all duration-300 border ${
            presentationMode 
              ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border-amber-500/30 hover:border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]' 
              : 'bg-slate-800/50 hover:bg-slate-700 text-slate-300 border-slate-700 hover:border-slate-500'
          }`}
        >
          {presentationMode ? <XSquare size={16} /> : <MonitorPlay size={16} />}
          {presentationMode ? 'Exit Presentation' : 'Presentation Mode'}
        </button>
      </div>
    </header>
  );
};

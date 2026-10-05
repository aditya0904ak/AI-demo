import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, Check } from 'lucide-react';

interface Props {
  minFloor: number;
  maxFloor: number;
  currentFloor: number;
  targetFloor: number | null;
  pendingRequests: number[];
  servedRequests: number[];
  status: 'IDLE' | 'SEARCHING' | 'GOAL REACHED' | 'FAILED';
}

export const ElevatorShaft: React.FC<Props> = ({
  minFloor,
  maxFloor,
  currentFloor,
  targetFloor,
  pendingRequests,
  servedRequests,
  status
}) => {
  const floors = [];
  for (let i = maxFloor; i >= minFloor; i--) {
    floors.push(i);
  }

  const isMovingUp = targetFloor !== null && targetFloor > currentFloor;
  const isMovingDown = targetFloor !== null && targetFloor < currentFloor;

  return (
    <div className="bg-[#0b1121] border border-slate-800 rounded-lg shadow-2xl overflow-hidden flex flex-col h-full relative isolate">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 -z-10"></div>
      
      <div className="flex-1 relative flex justify-center py-8">
        
        {/* Shaft structure */}
        <div className="w-80 relative bg-slate-950/80 border-l border-r border-slate-700/50 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] flex flex-col justify-between">
          
          {floors.map((floor) => {
            const isPending = pendingRequests.includes(floor);
            const isServed = servedRequests.includes(floor);
            const isCurrentTarget = targetFloor === floor;
            
            return (
              <div key={floor} className="flex-1 relative border-b border-slate-800/30 flex items-center px-4 group">
                <div className="w-12 text-right pr-4 border-r border-slate-800/50">
                  <span className={`font-mono text-lg transition-colors ${
                    isCurrentTarget ? 'text-cyan-400 font-bold' : 
                    isPending ? 'text-amber-500' : 
                    'text-slate-600'
                  }`}>
                    {String(floor).padStart(2, '0')}
                  </span>
                </div>
                
                <div className="flex-1 pl-4 flex items-center justify-between">
                  {/* Status Indicator */}
                  <div className="flex items-center gap-2">
                    {isPending && (
                      <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest text-amber-400 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        Request
                      </div>
                    )}
                    {isServed && !isPending && (
                      <div className="flex items-center gap-1 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest text-green-500 uppercase">
                        <Check size={12} />
                        Served
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Elevator Cabin */}
          <motion.div
            className="absolute left-14 right-4 flex justify-center z-20 pointer-events-none"
            initial={false}
            animate={{
              bottom: `${((currentFloor - minFloor) / (maxFloor - minFloor)) * 100}%`,
              height: `${100 / (maxFloor - minFloor + 1)}%`
            }}
            transition={{ type: "spring", stiffness: 40, damping: 12, mass: 1.2 }}
            style={{
              transform: 'translateY(50%)'
            }}
          >
            <div className={`w-full max-w-[140px] h-full min-h-[48px] border-y-2 border-x-4 bg-gradient-to-b from-slate-800 to-slate-900 rounded-sm flex items-center justify-center relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-colors duration-300 ${
              status === 'GOAL REACHED' ? 'border-green-500/80 shadow-[0_0_30px_rgba(34,197,94,0.3)]' :
              status === 'SEARCHING' ? 'border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]' :
              'border-slate-500'
            }`}>
              
              {/* Cabin interior details */}
              <div className="absolute inset-x-2 top-0 bottom-0 border-x border-slate-700/50 flex">
                <div className="flex-1 bg-slate-950/40"></div>
                <div className="w-0.5 bg-black/50 h-full"></div>
                <div className="flex-1 bg-slate-950/40"></div>
              </div>
              
              {/* Floor Display inside cabin */}
              <div className="relative z-10 bg-black px-3 py-1 rounded border border-slate-700 flex items-center gap-2 shadow-inner">
                {isMovingUp && <ChevronUp size={14} className="text-cyan-400 animate-pulse" />}
                {isMovingDown && <ChevronDown size={14} className="text-cyan-400 animate-pulse" />}
                {!isMovingUp && !isMovingDown && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse mr-1"></span>}
                <span className={`font-mono text-lg font-bold ${
                  status === 'GOAL REACHED' ? 'text-green-400' : 'text-cyan-400'
                }`}>
                  {String(currentFloor).padStart(2, '0')}
                </span>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
};

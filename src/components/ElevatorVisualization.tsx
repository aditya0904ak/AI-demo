import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  minFloor: number;
  maxFloor: number;
  currentFloor: number;
  pendingRequests: number[];
  servedRequests: number[];
}

export const ElevatorVisualization: React.FC<Props> = ({
  minFloor,
  maxFloor,
  currentFloor,
  pendingRequests,
  servedRequests
}) => {
  const floors = [];
  for (let i = maxFloor; i >= minFloor; i--) {
    floors.push(i);
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 flex flex-col h-full relative">
      <h3 className="text-lg font-semibold text-slate-200 mb-4">Elevator Shaft</h3>
      <div className="flex-1 relative flex justify-center py-4">
        {/* Shaft container */}
        <div className="w-64 relative border-l-2 border-r-2 border-slate-700 bg-slate-950/50 flex flex-col justify-between">
          {floors.map((floor) => {
            const isPending = pendingRequests.includes(floor);
            const isServed = servedRequests.includes(floor);
            
            return (
              <div key={floor} className="flex-1 relative border-b border-slate-800/50 flex items-center justify-between px-2">
                <span className="text-slate-500 font-mono text-sm w-6 text-right select-none">{floor}</span>
                <div className="flex-1 px-4 flex justify-end items-center h-full">
                  {isPending && (
                    <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500 inline-block animate-pulse"></span>
                      REQUEST
                    </span>
                  )}
                  {isServed && !isPending && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">
                      SERVED
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          
          {/* Elevator Cabin */}
          <motion.div
            className="absolute left-0 right-0 w-full px-8 flex justify-center z-10"
            initial={false}
            animate={{
              bottom: `${((currentFloor - minFloor) / (maxFloor - minFloor)) * 100}%`,
              height: `${100 / (maxFloor - minFloor + 1)}%`
            }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
            style={{
              transform: 'translateY(50%)' // Center it on the floor line
            }}
          >
            <div className="w-16 h-full min-h-[40px] border-2 border-cyan-500 bg-cyan-900/40 rounded flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] backdrop-blur-sm">
              <span className="text-cyan-100 font-bold text-sm">
                ELEV
              </span>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="mt-4 flex gap-4 text-sm justify-center border-t border-slate-800 pt-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-amber-500 block"></span>
          <span className="text-slate-400">Pending</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500 block"></span>
          <span className="text-slate-400">Served</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border border-cyan-500 bg-cyan-900/40 rounded block"></div>
          <span className="text-slate-400">Elevator</span>
        </div>
      </div>
    </div>
  );
};

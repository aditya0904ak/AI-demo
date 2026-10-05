import React, { useState, useEffect } from 'react';
import { runAStar, runFIFO, runNearest } from './algorithms/astar';
import type { AStarResult, AStarNode } from './algorithms/astar';

import { Header } from './components/Header';
import { MetricsBar } from './components/MetricsBar';
import { ControlConsole } from './components/ControlConsole';
import { ElevatorShaft } from './components/ElevatorShaft';
import { SearchEngine } from './components/SearchEngine';
import { StateSpaceGraph } from './components/StateSpaceGraph';
import { ExecutionTrace } from './components/ExecutionTrace';
import { ResultComparison } from './components/ResultComparison';
import { WhyAStar } from './components/WhyAStar';

type SimulationStatus = 'IDLE' | 'SEARCHING' | 'GOAL REACHED' | 'FAILED';

function App() {
  const [minFloor, setMinFloor] = useState(0);
  const [maxFloor, setMaxFloor] = useState(10);
  const [initialFloor, setInitialFloor] = useState(2);
  const [requests, setRequests] = useState<number[]>([3, 5, 8]);
  
  const [aStarResult, setAStarResult] = useState<AStarResult | null>(null);
  
  // Animation state
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [status, setStatus] = useState<SimulationStatus>('IDLE');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(1000); 
  const [presentationMode, setPresentationMode] = useState(false);

  // Derived state for visualization
  const currentTraceStep = aStarResult?.trace[currentStepIndex];
  const currentNode: AStarNode | null = currentTraceStep?.currentNode || null;
  const currentFrontier = currentTraceStep?.frontier || [];
  
  const visualCurrentFloor = currentNode ? currentNode.state.currentFloor : initialFloor;
  
  // Determine target floor for animation
  let targetFloor = null;
  if (isPlaying && currentStepIndex < (aStarResult?.trace.length || 0) - 1) {
    const nextStep = aStarResult?.trace[currentStepIndex + 1];
    if (nextStep) {
      targetFloor = nextStep.currentNode.state.currentFloor;
    }
  }

  const visualPendingRequests = currentNode ? currentNode.state.pendingRequests : requests;
  const visualServedRequests = requests.filter(r => !visualPendingRequests.includes(r));
  const visualTotalCost = currentNode ? currentNode.g : 0;
  const nodesExpanded = currentStepIndex >= 0 ? currentStepIndex + 1 : 0;

  // Player effect
  useEffect(() => {
    let timer: number;
    if (isPlaying && aStarResult && currentStepIndex < aStarResult.trace.length - 1) {
      timer = window.setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, speedMs);
    } else if (isPlaying && aStarResult && currentStepIndex >= aStarResult.trace.length - 1) {
      setIsPlaying(false);
      setStatus(aStarResult.success ? 'GOAL REACHED' : 'FAILED');
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, aStarResult, speedMs]);

  const handleRunSearch = (initFl: number, minFl: number, maxFl: number, reqs: number[]) => {
    setInitialFloor(initFl);
    setMinFloor(minFl);
    setMaxFloor(maxFl);
    setRequests(reqs);
    
    const result = runAStar(initFl, reqs);
    setAStarResult(result);
    setCurrentStepIndex(0);
    setStatus('SEARCHING');
    setIsPlaying(true);
  };

  const handleReset = () => {
    setAStarResult(null);
    setCurrentStepIndex(-1);
    setStatus('IDLE');
    setIsPlaying(false);
  };

  const handleLoadExample = () => {
    handleReset();
    setInitialFloor(2);
    setMinFloor(0);
    setMaxFloor(10);
    setRequests([3, 5, 8]);
  };

  // Comparisons
  const comparisons = React.useMemo(() => {
    if (!aStarResult) return [];
    
    const fifo = runFIFO(initialFloor, requests);
    const nearest = runNearest(initialFloor, requests);
    
    return [
      {
        name: 'A* Search',
        route: aStarResult.path,
        cost: aStarResult.totalCost,
        isOptimal: true
      },
      {
        name: 'Nearest Request First',
        route: nearest.path,
        cost: nearest.totalCost,
        isOptimal: false
      },
      {
        name: 'First-In First-Out',
        route: fifo.path,
        cost: fifo.totalCost,
        isOptimal: false
      }
    ].sort((a, b) => a.cost - b.cost);
  }, [aStarResult, initialFloor, requests]);

  return (
    <div className="min-h-screen bg-[#050914] text-slate-200 p-4 md:p-8 font-sans selection:bg-cyan-500/30">
      <div className="max-w-[1600px] mx-auto">
        
        <Header 
          presentationMode={presentationMode} 
          onTogglePresentation={() => setPresentationMode(!presentationMode)} 
        />

        <MetricsBar 
          initialFloor={initialFloor}
          requestsCount={requests.length}
          servedCount={visualServedRequests.length}
          totalCost={visualTotalCost}
          nodesExpanded={nodesExpanded}
          status={status}
        />

        {/* CONTROLS (Only visible if searching/done) */}
        {aStarResult && (
          <div className="flex flex-wrap items-center justify-between bg-slate-900/60 border border-slate-800 p-3 rounded-lg mb-6 shadow-lg sticky top-4 z-50">
            <div className="flex gap-2">
              <button onClick={() => setIsPlaying(!isPlaying)} disabled={status === 'GOAL REACHED' || status === 'FAILED'} className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 text-white text-xs font-bold uppercase tracking-widest rounded transition-colors">
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button onClick={() => {
                  if (aStarResult) {
                    setCurrentStepIndex(aStarResult.trace.length - 1);
                    setIsPlaying(false);
                    setStatus(aStarResult.success ? 'GOAL REACHED' : 'FAILED');
                  }
                }} 
                disabled={status === 'GOAL REACHED' || status === 'FAILED'} 
                className="px-4 py-1.5 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-widest rounded transition-colors">
                Skip to End
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex bg-slate-950 rounded border border-slate-800 p-1">
                {[
                  { label: 'Slow', ms: 2000 },
                  { label: 'Normal', ms: 1000 },
                  { label: 'Fast', ms: 300 }
                ].map(speed => (
                  <button 
                    key={speed.label}
                    onClick={() => setSpeedMs(speed.ms)}
                    className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded transition-colors ${speedMs === speed.ms ? 'bg-cyan-900/50 text-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    {speed.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* MAIN LAYOUT */}
        <div className={`grid gap-6 ${presentationMode ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1 lg:grid-cols-12'} mb-6`}>
          
          {/* LEFT: CONTROL CONSOLE */}
          {!presentationMode && (
            <div className="lg:col-span-3">
              <ControlConsole 
                onRunSearch={handleRunSearch}
                onReset={handleReset}
                onLoadExample={handleLoadExample}
                disabled={isPlaying}
                status={status}
              />
            </div>
          )}

          {/* CENTER: ELEVATOR */}
          <div className={`${presentationMode ? 'lg:col-span-1 h-[700px]' : 'lg:col-span-4 min-h-[600px] lg:h-auto'}`}>
            <ElevatorShaft 
              minFloor={minFloor}
              maxFloor={maxFloor}
              currentFloor={visualCurrentFloor}
              targetFloor={targetFloor}
              pendingRequests={visualPendingRequests}
              servedRequests={visualServedRequests}
              status={status}
            />
          </div>

          {/* RIGHT: SEARCH ENGINE */}
          <div className={`${presentationMode ? 'lg:col-span-2 h-[700px]' : 'lg:col-span-5 h-[600px] lg:h-auto'}`}>
            <SearchEngine 
              node={currentNode} 
              frontier={currentFrontier} 
            />
          </div>

        </div>

        {/* BOTTOM SECTION */}
        {aStarResult && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* ROW 1: STATE SPACE & TRACE */}
            <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 h-[400px]">
                <StateSpaceGraph 
                  trace={aStarResult.trace} 
                  currentStepIndex={currentStepIndex} 
                />
              </div>
              <div className="lg:col-span-5 h-[400px]">
                <ExecutionTrace 
                  trace={aStarResult.trace} 
                  currentStepIndex={currentStepIndex} 
                  status={status}
                />
              </div>
            </div>

            {/* ROW 2: RESULTS & WHY A* */}
            {status === 'GOAL REACHED' && (
              <>
                <div className="lg:col-span-8">
                  <ResultComparison 
                    routes={comparisons} 
                    requestsCount={requests.length} 
                  />
                </div>
                <div className="lg:col-span-4">
                  <WhyAStar />
                </div>
              </>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default App;

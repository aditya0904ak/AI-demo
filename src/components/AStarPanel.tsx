import React from 'react';
import type { AStarNode } from '../algorithms/astar';

interface Props {
  node: AStarNode | null;
  frontier: AStarNode[];
}

export const AStarPanel: React.FC<Props> = ({ node, frontier }) => {
  if (!node) {
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-slate-200 mb-2">A* Search Explainer</h3>
        <p className="text-slate-400 text-sm">Run the search to see A* evaluation.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-200 mb-2 border-b border-slate-800 pb-2">Current State</h3>
        <div className="grid grid-cols-2 gap-4 text-sm mt-2">
          <div>
            <span className="text-slate-400 block text-xs">Elevator Floor</span>
            <span className="text-xl font-bold text-slate-100">{node.state.currentFloor}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-xs">Pending</span>
            <span className="text-slate-200 font-mono">
              {node.state.pendingRequests.length > 0 ? `{${node.state.pendingRequests.join(', ')}}` : '{}'}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-slate-800 rounded p-2 text-center">
            <span className="text-slate-400 text-xs block">g(n)</span>
            <span className="font-mono text-cyan-400">{node.g}</span>
          </div>
          <div className="bg-slate-800 rounded p-2 text-center">
            <span className="text-slate-400 text-xs block">h(n)</span>
            <span className="font-mono text-cyan-400">{node.h}</span>
          </div>
          <div className="bg-slate-800 rounded p-2 text-center">
            <span className="text-slate-400 text-xs block">f(n)</span>
            <span className="font-mono text-cyan-400 font-bold">{node.f}</span>
          </div>
        </div>
        <div className="text-xs text-slate-500 mt-2 text-center">
          f(n) = g(n) + h(n)
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-slate-200 mb-2 border-b border-slate-800 pb-2">A* Frontier</h3>
        {frontier.length === 0 ? (
          <div className="text-sm text-slate-400">Frontier is empty.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
                <tr>
                  <th className="px-2 py-1">State</th>
                  <th className="px-2 py-1">g</th>
                  <th className="px-2 py-1">h</th>
                  <th className="px-2 py-1">f</th>
                </tr>
              </thead>
              <tbody>
                {frontier.map((fNode, idx) => (
                  <tr key={idx} className={`${idx === 0 ? 'bg-cyan-900/20 border-l-2 border-cyan-500' : 'border-b border-slate-800/50'}`}>
                    <td className="px-2 py-1 font-mono text-xs">
                      F{fNode.state.currentFloor} | {`{${fNode.state.pendingRequests.join(',')}}`}
                    </td>
                    <td className="px-2 py-1 text-slate-300">{fNode.g}</td>
                    <td className="px-2 py-1 text-slate-300">{fNode.h}</td>
                    <td className={`px-2 py-1 font-bold ${idx === 0 ? 'text-cyan-400' : 'text-slate-200'}`}>{fNode.f}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="bg-slate-800/50 p-3 rounded text-sm text-slate-300">
        <h4 className="font-semibold text-slate-200 mb-1 text-xs uppercase tracking-wider">Why this route?</h4>
        <p className="text-xs leading-relaxed">
          A* evaluates possible next states using <code className="text-cyan-400 bg-slate-800 px-1 rounded">f(n) = g(n) + h(n)</code>. 
          At each step, the state with the lowest estimated total cost is expanded.
        </p>
      </div>
      
      <div className="bg-slate-800/50 p-3 rounded text-sm text-slate-300">
        <h4 className="font-semibold text-slate-200 mb-1 text-xs uppercase tracking-wider">Heuristic h(n)</h4>
        <p className="text-xs leading-relaxed mb-2">
          h(n) estimates cost to complete remaining requests.
        </p>
        {node.state.pendingRequests.length > 0 ? (
          <div className="text-xs font-mono bg-slate-900 p-2 rounded">
            Distances from {node.state.currentFloor}:<br/>
            {node.state.pendingRequests.map(r => (
              <span key={r} className="block pl-2">
                → {r} = {Math.abs(node.state.currentFloor - r)}
              </span>
            ))}
            <div className="mt-1 border-t border-slate-700 pt-1 text-cyan-400 font-bold">
              h(n) = max(...) = {node.h}
            </div>
          </div>
        ) : (
          <div className="text-xs font-mono bg-slate-900 p-2 rounded text-green-400">
            No pending requests. h(n) = 0.
          </div>
        )}
      </div>
    </div>
  );
};

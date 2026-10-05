export type State = {
  currentFloor: number;
  pendingRequests: number[];
};

export type AStarNode = {
  state: State;
  g: number;
  h: number;
  f: number;
  parent: AStarNode | null;
  action: number | null; // The floor we moved to
};

export const heuristic = (currentFloor: number, pendingRequests: number[]): number => {
  if (pendingRequests.length === 0) return 0;
  return Math.max(...pendingRequests.map((req) => Math.abs(currentFloor - req)));
};

export const generateSuccessors = (node: AStarNode): AStarNode[] => {
  const successors: AStarNode[] = [];
  
  for (const req of node.state.pendingRequests) {
    const cost = Math.abs(node.state.currentFloor - req);
    const newG = node.g + cost;
    const newPending = node.state.pendingRequests.filter((r) => r !== req);
    const newH = heuristic(req, newPending);
    
    successors.push({
      state: {
        currentFloor: req,
        pendingRequests: newPending,
      },
      g: newG,
      h: newH,
      f: newG + newH,
      parent: node,
      action: req,
    });
  }
  
  return successors;
};

export type AStarTraceStep = {
  step: number;
  currentNode: AStarNode;
  successors: AStarNode[];
  frontier: AStarNode[];
};

export type AStarResult = {
  path: number[];
  totalCost: number;
  nodesExpanded: number;
  trace: AStarTraceStep[];
  success: boolean;
};

export const runAStar = (initialFloor: number, requests: number[]): AStarResult => {
  // Deep copy requests to avoid mutation
  const initialPending = [...requests];
  
  const initialState: State = {
    currentFloor: initialFloor,
    pendingRequests: initialPending,
  };
  
  const h = heuristic(initialFloor, initialPending);
  const rootNode: AStarNode = {
    state: initialState,
    g: 0,
    h,
    f: h,
    parent: null,
    action: null,
  };
  
  const frontier: AStarNode[] = [rootNode];
  let nodesExpanded = 0;
  const trace: AStarTraceStep[] = [];
  
  let step = 1;

  while (frontier.length > 0) {
    // Sort frontier by f score ascending. 
    // In case of tie, we can break tie by h (smaller h is better).
    frontier.sort((a, b) => {
      if (a.f !== b.f) return a.f - b.f;
      return a.h - b.h;
    });
    
    const current = frontier.shift()!;
    nodesExpanded++;
    
    // Check goal
    if (current.state.pendingRequests.length === 0) {
      // Reconstruct path
      const path: number[] = [];
      let curr: AStarNode | null = current;
      while (curr !== null) {
        path.push(curr.state.currentFloor);
        curr = curr.parent;
      }
      path.reverse(); // Now it's from initial -> ... -> goal
      
      trace.push({
        step,
        currentNode: current,
        successors: [],
        frontier: [...frontier]
      });
      
      return {
        path,
        totalCost: current.g,
        nodesExpanded,
        trace,
        success: true
      };
    }
    
    // Generate successors
    const successors = generateSuccessors(current);
    
    trace.push({
      step,
      currentNode: current,
      successors: [...successors],
      frontier: [...frontier]
    });
    
    step++;
    
    // Add to frontier
    frontier.push(...successors);
  }
  
  return {
    path: [],
    totalCost: 0,
    nodesExpanded,
    trace,
    success: false
  };
};

export const runFIFO = (initialFloor: number, requests: number[]) => {
  let currentFloor = initialFloor;
  let totalCost = 0;
  const path = [initialFloor];
  
  for (const req of requests) {
    totalCost += Math.abs(currentFloor - req);
    currentFloor = req;
    path.push(req);
  }
  
  return { path, totalCost };
};

export const runNearest = (initialFloor: number, requests: number[]) => {
  let currentFloor = initialFloor;
  let totalCost = 0;
  const path = [initialFloor];
  let pending = [...requests];
  
  while (pending.length > 0) {
    // Find closest
    let closestReq = pending[0];
    let minDiff = Math.abs(currentFloor - closestReq);
    
    for (let i = 1; i < pending.length; i++) {
      const diff = Math.abs(currentFloor - pending[i]);
      if (diff < minDiff) {
        minDiff = diff;
        closestReq = pending[i];
      }
    }
    
    totalCost += minDiff;
    currentFloor = closestReq;
    path.push(closestReq);
    pending = pending.filter(r => r !== closestReq);
  }
  
  return { path, totalCost };
};

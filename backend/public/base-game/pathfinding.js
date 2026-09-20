const CARDINAL = [[1,0],[-1,0],[0,1],[0,-1]];
const DIAGONAL = [[1,1],[1,-1],[-1,1],[-1,-1]];

const key = (x, y) => `${x},${y}`;

export function findPath(start, goal, canWalk) {
  const startKey = key(start.x, start.y);
  const goalKey = key(goal.x, goal.y);
  const open = [{ ...start, score: 0 }];
  const cameFrom = new Map();
  const gScore = new Map([[startKey, 0]]);
  const closed = new Set();
  const heuristic = (node) => Math.hypot(goal.x - node.x, goal.y - node.y);

  while (open.length) {
    open.sort((a, b) => (gScore.get(key(a.x, a.y)) + heuristic(a)) - (gScore.get(key(b.x, b.y)) + heuristic(b)));
    const current = open.shift();
    const currentKey = key(current.x, current.y);
    if (currentKey === goalKey) {
      const path = [{ x: current.x, y: current.y }];
      let cursor = currentKey;
      while (cameFrom.has(cursor)) {
        const previous = cameFrom.get(cursor);
        path.push({ x: previous.x, y: previous.y });
        cursor = key(previous.x, previous.y);
      }
      return path.reverse();
    }
    closed.add(currentKey);
    for (const [dx, dy] of [...CARDINAL, ...DIAGONAL]) {
      const next = { x: current.x + dx, y: current.y + dy };
      const nextKey = key(next.x, next.y);
      if (closed.has(nextKey) || !canWalk(next.x, next.y)) continue;
      if (dx && dy && (!canWalk(current.x + dx, current.y) || !canWalk(current.x, current.y + dy))) continue;
      const nextScore = (gScore.get(currentKey) ?? Infinity) + (dx && dy ? 1.414 : 1);
      if (nextScore >= (gScore.get(nextKey) ?? Infinity)) continue;
      cameFrom.set(nextKey, current);
      gScore.set(nextKey, nextScore);
      if (!open.some((item) => item.x === next.x && item.y === next.y)) open.push({ ...next, score: nextScore + heuristic(next) });
    }
  }
  return [];
}

export function simplifyPath(path) {
  if (path.length < 3) return path;
  const result = [path[0]];
  let previousDirection = null;
  for (let index = 1; index < path.length; index += 1) {
    const direction = [Math.sign(path[index].x - path[index - 1].x), Math.sign(path[index].y - path[index - 1].y)];
    if (previousDirection && (direction[0] !== previousDirection[0] || direction[1] !== previousDirection[1])) result.push(path[index - 1]);
    previousDirection = direction;
  }
  result.push(path[path.length - 1]);
  return result;
}

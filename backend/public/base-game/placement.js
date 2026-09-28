export const GROUND = { x: 724, y: 585, rx: 485, ry: 302 };
export const CELL = { x: 17, y: 11 };
export const PLOT_SIZES = { hub: 4, archery: 3, eagle: 3, stable: 4, research: 3, sentry: 2, arch: 3, notice: 2, infantry: 2, admin: 2, hospital: 3 };
export function toGround(x,y){return {u:((x-GROUND.x)/CELL.x+(y-GROUND.y)/CELL.y)/2,v:((y-GROUND.y)/CELL.y-(x-GROUND.x)/CELL.x)/2};}
export function fromGround(u,v){return {x:GROUND.x+(u-v)*CELL.x,y:GROUND.y+(u+v)*CELL.y};}
export function snapPoint(x,y,size){const p=toGround(x,y), offset=size%2?.5:0;return fromGround(Math.round(p.u-offset)+offset,Math.round(p.v-offset)+offset);}
export function corners(b,size){const p=toGround(b.x,b.y),h=size/2;return [[-h,-h],[h,-h],[h,h],[-h,h]].map(([u,v])=>fromGround(p.u+u,p.v+v));}
export function inside(x,y){return ((x-GROUND.x)/GROUND.rx)**2+((y-GROUND.y)/GROUND.ry)**2<1;}
export function fits(b,size){return corners(b,size).every(p=>inside(p.x,p.y));}
export function collides(a,as,b,bs){const p=toGround(a.x,a.y),q=toGround(b.x,b.y),h=(as+bs)/2;return Math.abs(p.u-q.u)<h-1e-6&&Math.abs(p.v-q.v)<h-1e-6;}
export function roadKey(u,v){return `${u},${v}`;}
export function roadFits(u,v){return Number.isInteger(u)&&Number.isInteger(v)&&fits(fromGround(u,v),1);}
export function roadBlocked(u,v,buildings,plotSizes){
 const point=fromGround(u,v);
 return buildings.some(building=>collides(point,1,building,plotSizes[building.type]));
}

// A small connected street network for older layouts that predate editable roads.
export function starterRoads(buildings, plotSizes = PLOT_SIZES){
 const open=(u,v)=>roadFits(u,v)&&!roadBlocked(u,v,buildings,plotSizes);
 let origin=null;
 for(let radius=0;radius<10&&!origin;radius++){
  for(let u=-radius;u<=radius&&!origin;u++)for(let v=-radius;v<=radius;v++){
   if(Math.max(Math.abs(u),Math.abs(v))===radius&&open(u,v)){origin={u,v};break;}
  }
 }
 if(!origin)return [];
 const roads=new Map([[roadKey(origin.u,origin.v),origin]]);
 for(const building of buildings){
  const p=toGround(building.x,building.y), size=plotSizes[building.type];
  const candidates=[];
  for(let u=Math.floor(p.u-size-2);u<=Math.ceil(p.u+size+2);u++){
   for(let v=Math.floor(p.v-size-2);v<=Math.ceil(p.v+size+2);v++){
    if(!open(u,v))continue;
    const gap=Math.max(Math.abs(u-p.u),Math.abs(v-p.v))-size/2;
    if(gap<.4||gap>1.6)continue;
    const distance=Math.min(...[...roads.values()].map(road=>Math.abs(road.u-u)+Math.abs(road.v-v)));
    candidates.push({u,v,score:distance+gap*.1});
   }
  }
  candidates.sort((a,b)=>a.score-b.score);
  const goal=candidates[0];
  if(!goal)continue;
  const sources=[...roads.values()].sort((a,b)=>(Math.abs(a.u-goal.u)+Math.abs(a.v-goal.v))-(Math.abs(b.u-goal.u)+Math.abs(b.v-goal.v)));
  const start=sources[0], queue=[start], previous=new Map([[roadKey(start.u,start.v),null]]);
  for(let index=0;index<queue.length;index++){
   const current=queue[index];
   if(current.u===goal.u&&current.v===goal.v)break;
   for(const [du,dv] of [[1,0],[-1,0],[0,1],[0,-1]]){
    const next={u:current.u+du,v:current.v+dv},key=roadKey(next.u,next.v);
    if(previous.has(key)||!open(next.u,next.v))continue;
    previous.set(key,current);queue.push(next);
   }
  }
  if(!previous.has(roadKey(goal.u,goal.v)))continue;
  for(let cursor=goal;cursor;cursor=previous.get(roadKey(cursor.u,cursor.v))){
   roads.set(roadKey(cursor.u,cursor.v),{u:cursor.u,v:cursor.v});
  }
 }
 return [...roads.values()];
}

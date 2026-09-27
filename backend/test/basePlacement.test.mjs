import assert from 'node:assert/strict';
import {PLOT_SIZES,fromGround,toGround,snapPoint,corners,fits,collides,roadFits,roadBlocked,roadKey,starterRoads} from '../public/base-game/placement.js';
for(let u=-30;u<=30;u++) for(let v=-30;v<=30;v++) {
 const p=fromGround(u,v),q=toGround(p.x,p.y); assert.equal(q.u,u);assert.equal(q.v,v);
 for(const n of [3,4,5]) {
  const b=snapPoint(p.x+3,p.y-2,n);assert.deepEqual(snapPoint(b.x,b.y,n),b);
  for(const c of corners(b,n)){ const g=toGround(c.x,c.y);assert.ok(Math.abs(g.u-Math.round(g.u))<1e-8);assert.ok(Math.abs(g.v-Math.round(g.v))<1e-8); }
 }
}
const a=fromGround(0,0), touching=fromGround(4,0), overlap=fromGround(3,0);
assert.equal(collides(a,4,touching,4),false);assert.equal(collides(a,4,overlap,4),true);
assert.ok(fits(a,5));assert.equal(fits({x:1170,y:602},5),false);assert.equal(fits({x:724,y:870},3),false);
assert.equal(PLOT_SIZES.eagle,3);
assert.equal(roadFits(0,0),true);
assert.equal(roadFits(100,0),false);
assert.equal(roadBlocked(0,0,[{type:'eagle',...fromGround(0,0)}],PLOT_SIZES),true);
assert.equal(roadBlocked(2,0,[{type:'eagle',...fromGround(0,0)}],PLOT_SIZES),false);
const buildings=[{type:'eagle',...fromGround(5,0)},{type:'hub',...fromGround(-6,-2)}];
const streets=starterRoads(buildings);
assert.ok(streets.length>2);
assert.equal(new Set(streets.map(({u,v})=>roadKey(u,v))).size,streets.length);
assert.ok(streets.every(({u,v})=>roadFits(u,v)&&!roadBlocked(u,v,buildings,PLOT_SIZES)));
const connected=new Set([roadKey(streets[0].u,streets[0].v)]),remaining=new Map(streets.slice(1).map(road=>[roadKey(road.u,road.v),road]));
for(let changed=true;changed;){changed=false;for(const [key,road] of remaining){if([[1,0],[-1,0],[0,1],[0,-1]].some(([du,dv])=>connected.has(roadKey(road.u+du,road.v+dv)))){connected.add(key);remaining.delete(key);changed=true;}}}
assert.equal(remaining.size,0);
console.log('Placement checks passed: projection, snap stability, aligned corners, overlap, touching edges, wall boundary.');

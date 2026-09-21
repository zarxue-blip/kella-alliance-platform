import assert from 'node:assert/strict';
import {fromGround,toGround,snapPoint,corners,fits,collides} from '../public/base-game/placement.js';
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
console.log('Placement checks passed: projection, snap stability, aligned corners, overlap, touching edges, wall boundary.');

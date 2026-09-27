export const GROUND = { x: 724, y: 585, rx: 485, ry: 302 };
export const CELL = { x: 17, y: 11 };
export const PLOT_SIZES = { hub: 4, archery: 3, eagle: 3, stable: 4, research: 3, sentry: 2, arch: 3, notice: 2, infantry: 2, admin: 2 };
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

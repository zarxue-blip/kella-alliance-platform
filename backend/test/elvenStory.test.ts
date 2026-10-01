import assert from 'node:assert/strict';
import vm from 'node:vm';
import { portalHomeClient } from '../src/views/portalHome.js';

const source=portalHomeClient.slice(portalHomeClient.indexOf('function initializeKingdomEntrance()'),portalHomeClient.indexOf('function initializePortalDepth()'));
function setup(reduced=false,stored:string|null=null){
  const properties:Record<string,string>={};
  const listeners=new Map<string,Set<Function>>();
  const mediaListeners=new Map<string,Function>();
  const frames=new Map<number,Function>();
  let nextFrame=0,top=80,saved=stored,cleanup:Function=()=>{},time=0,seekCount=0,loadCount=0;
  const emit=(type:string)=>{for(const fn of listeners.get(type)||[])fn({type});};
  const nodes:Record<string,any>={};
  const node=(key:string)=>nodes[key]??=({textContent:'',hidden:false,setAttribute(k:string,v:string){this[k]=v;}});
  const classes=new Set<string>();
  const root:any={isConnected:true,offsetHeight:4500,style:{setProperty(k:string,v:string){properties[k]=v;}},
    classList:{toggle(k:string,on:boolean){if(on)classes.add(k);else classes.delete(k);}},
    getBoundingClientRect:()=>({top,bottom:top+4500}),querySelector:node,scrollIntoView(){top=80;}};
  const video:any={duration:10,readyState:0,seeking:false,src:'',muted:false,
    get currentTime(){return time;},set currentTime(value:number){time=value;this.seeking=true;seekCount++;},
    pause(){},load(){loadCount++;},getAttribute(k:string){return this[k]||null;},removeAttribute(k:string){this[k]='';},
    addEventListener(k:string,fn:Function){mediaListeners.set(k,fn);},removeEventListener(k:string){mediaListeners.delete(k);}};
  nodes['[data-kingdom-video]']=video;
  const context:any={app:{querySelector:()=>root},matchMedia:()=>({matches:reduced,addEventListener(){},removeEventListener(){}}),
    document:{hidden:false,querySelector:()=>({getBoundingClientRect:()=>({height:80})}),addEventListener(){},removeEventListener(){}},
    localStorage:{getItem:()=>saved,setItem(_k:string,v:string){saved=v;}},innerHeight:900,
    addEventListener(k:string,f:Function){if(!listeners.has(k))listeners.set(k,new Set());listeners.get(k)!.add(f);},
    removeEventListener(k:string,f:Function){listeners.get(k)?.delete(f);},
    requestAnimationFrame(f:Function){frames.set(++nextFrame,f);return nextFrame;},cancelAnimationFrame(id:number){frames.delete(id);},
    Event:class{constructor(public type:string){}},MutationObserver:class{constructor(fn:Function){cleanup=fn;}observe(){}disconnect(){}}};
  context.window={dispatchEvent:(e:any)=>emit(e.type)};
  vm.runInNewContext(source+';initializeKingdomEntrance();',context);
  function flush(){const work=[...frames.values()];frames.clear();work.forEach(fn=>fn());}
  return {properties,nodes,classes,video,listeners,get saved(){return saved;},get seeks(){return seekCount;},get loads(){return loadCount;},
    ready(){video.readyState=2;mediaListeners.get('loadeddata')?.();flush();},
    decoded(){video.seeking=false;mediaListeners.get('seeked')?.();flush();},
    at(p:number){top=80-p*3680;emit('scroll');flush();},
    error(){mediaListeners.get('error')?.();},
    preference(value:string){saved=value;emit('kella-motion-change');flush();},
    dispose(){root.isConnected=false;cleanup();},mediaListeners};
}
const scene=setup();
assert.equal(scene.video.muted,true);
assert.equal(scene.nodes['[data-story-toggle]'].textContent,'Animation On');
assert.ok(scene.video.src.endsWith('kingdom-0927-hd.mp4'));
assert.equal(scene.nodes['[data-kingdom-entry]'].hidden,true);
scene.ready();scene.at(.55);
assert.ok(Math.abs(scene.video.currentTime-6.1)<.001,'approach completes before slow door-opening portion');
const seeks=scene.seeks;
scene.at(1);
assert.equal(scene.seeks,seeks,'scroll requests coalesce while decoding');
assert.equal(scene.nodes['[data-kingdom-entry]'].hidden,true,'do not reveal invitation over stale closed-door frame');
scene.decoded();
assert.ok(Math.abs(scene.video.currentTime-9.6)<.001);
assert.equal(scene.nodes['[data-kingdom-entry]'].hidden,true,'wait for final frame to decode');
scene.decoded();
assert.equal(scene.nodes['[data-kingdom-entry]'].hidden,false);
scene.at(0);scene.decoded();
assert.equal(scene.video.currentTime,0,'reverse scrolling reverses the film');
assert.equal(scene.nodes['[data-kingdom-entry]'].hidden,true);
scene.nodes['[data-story-toggle]'].onclick();
assert.equal(scene.saved,'off');
assert.equal(scene.nodes['[data-story-toggle]'].textContent,'Animation Off');
assert.ok(scene.classes.has('kingdom-regular'));
assert.equal(scene.nodes['[data-kingdom-entry]'].hidden,false);
scene.preference('on');assert.ok(!scene.classes.has('kingdom-regular'));
scene.error();assert.ok(scene.classes.has('kingdom-regular'));
assert.equal(scene.nodes['[data-kingdom-entry]'].hidden,false,'load failure must keep base accessible');
scene.dispose();
assert.equal([...scene.listeners.values()].reduce((n,s)=>n+s.size,0),0);
assert.equal(scene.mediaListeners.size,0);
assert.equal(scene.video.src,'','release media on navigation');
for(const view of [setup(true),setup(false,'off')]){
  assert.ok(view.classes.has('kingdom-regular'));
  assert.equal(view.nodes['[data-kingdom-entry]'].hidden,false);
  assert.equal(view.video.src,'','static mode must not download the film');
  assert.equal(view.loads,0);
}
console.log('Scroll film timing, seek coalescing, decoded-frame invitation, reverse scrolling, preferences, reduced motion, fallback and cleanup passed.');

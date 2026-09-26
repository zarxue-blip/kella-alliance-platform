import assert from 'node:assert/strict';
import vm from 'node:vm';
import { portalHomeClient } from '../src/views/portalHome.js';

const source=portalHomeClient.slice(portalHomeClient.indexOf('function initializeElvenStory()'),portalHomeClient.indexOf('function initializeMiniCalendar('));
function setup(reduced=false,stored:string|null=null){
  const properties:Record<string,string>={};
  const nodes:Record<string,any>={};
  const node=(key:string)=>nodes[key]??=( {textContent:'',inert:false,setAttribute(k:string,v:string){this[k]=v;}} );
  const buildings=Array.from({length:10},()=>({style:{} as any}));
  let top=80,scroll:()=>void=()=>{},saved=stored;
  const classes=new Set<string>();
  const root:any={isConnected:true,offsetHeight:4500,style:{setProperty(k:string,v:string){properties[k]=v;}},
    classList:{toggle(k:string,on:boolean){if(on)classes.add(k);else classes.delete(k);}},
    getBoundingClientRect:()=>({top,bottom:top+4500}),
    querySelector:node,querySelectorAll:()=>buildings,scrollIntoView(){}};
  const context:any={app:{querySelector:()=>root},matchMedia:()=>({matches:reduced,addEventListener(){},removeEventListener(){}}),
    localStorage:{getItem:()=>saved,setItem(_k:string,v:string){saved=v;}},innerHeight:900,
    addEventListener(k:string,f:()=>void){if(k==='scroll')scroll=f;},removeEventListener(){},
    requestAnimationFrame(f:()=>void){f();return 0;},cancelAnimationFrame(){},MutationObserver:class{observe(){}disconnect(){}}};
  vm.runInNewContext(source+';initializeElvenStory();',context);
  return {properties,nodes,classes,buildings,get saved(){return saved;},at(p:number){top=80-p*3680;scroll();}};
}
const story=setup();
assert.equal(story.properties['--leaf-x'],'0%');
assert.equal(story.properties['--door-angle'],'0deg');
assert.equal(story.properties['--settlement-opacity'],'0');
story.at(.25);
assert.equal(story.properties['--leaf-opacity'],'0','leaf must clear before doorway opens');
assert.equal(story.properties['--door-angle'],'0deg','door stays closed during approach');
story.at(.49);
assert.ok(parseFloat(story.properties['--door-angle'])>0,'door opens near end of forest approach');
story.at(.6);
assert.equal(story.properties['--forest-opacity'],'0');
assert.equal(story.properties['--settlement-opacity'],'1');
story.at(1);
assert.ok(story.buildings.every(b=>b.style.opacity==='1'));
assert.equal(story.nodes['.portal-base-entry'].inert,false);
story.at(0);
assert.equal(story.properties['--door-angle'],'0deg','scrolling back restores closed door');
story.nodes['[data-story-toggle]'].onclick();
assert.equal(story.saved,'off');
assert.ok(story.classes.has('story-regular'));
assert.equal(story.properties['--forest-opacity'],'0');
for(const view of [setup(true),setup(false,'off')]){
  assert.ok(view.classes.has('story-regular'));
  assert.equal(view.properties['--settlement-opacity'],'1');
  assert.equal(view.nodes['.portal-base-entry'].inert,false);
}
console.log('Forest timeline, late doorway opening, reverse scrolling, base reveal, saved preference and reduced motion passed.');

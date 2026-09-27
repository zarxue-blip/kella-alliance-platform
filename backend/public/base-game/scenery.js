import * as THREE from 'three';

const WORLD_WIDTH = 1448;
const WORLD_HEIGHT = 1086;

// The painted ground remains in place so every road and building stays on its grid.
export function createScenery(image, motion) {
  let renderer, material, ready = false, last = -Infinity, lastMoving;
  const canvas = document.createElement('canvas');
  const width = WORLD_WIDTH, height = WORLD_HEIGHT;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
    renderer.setSize(width, height, false);
    renderer.setClearColor(0, 0);
  } catch { return { draw(ctx) { ctx.drawImage(image, 0, 0, width, height); } }; }
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2);
  camera.position.z = 1;
  const texture = new THREE.Texture(image);
  const foliage = [[370,65,110,90],[620,260,105,80],[330,408,65,60],[230,675,85,60],[1100,543,80,60],[1230,706,95,70],[740,950,65,55]];
  material = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: { map: { value: texture }, time: { value: 0 }, motion: { value: 1 }, plants: { value: foliage.map(p => new THREE.Vector4(...p)) } },
    vertexShader: 'varying vec2 uvMap; void main(){ uvMap=uv; gl_Position=vec4(position.xy,0.,1.); }',
    fragmentShader: `
      precision highp float;
      uniform sampler2D map; uniform float time; uniform float motion;
      uniform vec4 plants[7]; varying vec2 uvMap;
      float region(vec2 p, vec2 c, vec2 r){return 1.-smoothstep(.55,1.,length((p-c)/r));}
      void main(){
        vec2 p=vec2(uvMap.x,1.-uvMap.y)*vec2(1448.,1086.);
        vec2 shift=vec2(0.);
        // Move only the painted outcrops and foliage, never the playable grass.
        shift.y += region(p,vec2(214.,219.),vec2(68.,74.))*sin(time*.8)*4.;
        shift.y += region(p,vec2(863.,134.),vec2(53.,84.))*sin(time*.65+1.8)*3.5;
        shift.y += region(p,vec2(1110.,234.),vec2(123.,123.))*sin(time*.62+3.)*3.5;
        shift.y += region(p,vec2(1376.,528.),vec2(66.,96.))*sin(time*.75+4.2)*3.5;
        for(int i=0;i<7;i++){
          vec4 f=plants[i]; float a=region(p,f.xy,f.zw);
          shift.x+=a*sin(time*1.25+float(i)*1.3+p.y*.012)*1.7;
          shift.y+=a*sin(time*.9+float(i))*.8;
        }
        vec2 samplePoint=p-shift*motion;
        vec4 color=texture2D(map,vec2(samplePoint.x/1448.,1.-samplePoint.y/1086.));
        // Painted sunlight gives the flat grass a gentle bowl of depth.
        float ground=1.-smoothstep(.87,1.02,length((p-vec2(724.,585.))/vec2(452.,281.)));
        float center=1.-smoothstep(.18,1.,length((p-vec2(660.,490.))/vec2(535.,355.)));
        vec3 daylight=mix(vec3(.94,.97,.96),vec3(1.055,1.025,.96),center);
        color.rgb*=mix(vec3(1.),daylight,ground*.62);
        float canopy=(sin(p.x*.018+time*.19)*sin(p.y*.013-time*.15)+1.)*.5;
        color.rgb*=1.-ground*canopy*motion*.014;
        gl_FragColor=color;
      }`
  });
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));
  return { draw(ctx, now) {
    if (!image.complete || !image.naturalWidth) return;
    if (!ready) { texture.needsUpdate = true; ready = true; }
    const moving = !motion.matches;
    if (last === -Infinity || lastMoving !== moving || (moving && now-last > 33)) {
      material.uniforms.time.value = now/1000;
      material.uniforms.motion.value = moving ? 1 : 0;
      renderer.render(scene,camera); last=now; lastMoving=moving;
    }
    ctx.drawImage(canvas,0,0,width,height);
  }};
}

const shadows = new WeakMap();
export function drawBuildingShadow(ctx,image,x,y,w,h){
  let shadow=shadows.get(image);
  if(!shadow){
    shadow=document.createElement('canvas'); shadow.width=image.naturalWidth; shadow.height=image.naturalHeight;
    const s=shadow.getContext('2d'); s.drawImage(image,0,0); s.globalCompositeOperation='source-in'; s.fillStyle='#19341c'; s.fillRect(0,0,shadow.width,shadow.height); shadows.set(image,shadow);
  }
  ctx.save(); ctx.translate(x,y-5); ctx.transform(1,0,-.48,-.29,0,0); ctx.globalAlpha=.23;
  ctx.drawImage(shadow,-w/2,-h,w,h); ctx.restore();
}

const lightSprites = new Map();
function light(ctx,x,y,r,color,alpha){
  let sprite=lightSprites.get(color);
  if(!sprite){
    sprite=document.createElement('canvas');sprite.width=128;sprite.height=128;
    const s=sprite.getContext('2d');
    const g=s.createRadialGradient(64,64,0,64,64,64);
    g.addColorStop(0,color);g.addColorStop(.18,color);g.addColorStop(1,'rgba(0,0,0,0)');
    s.fillStyle=g;s.fillRect(0,0,128,128);lightSprites.set(color,sprite);
  }
  ctx.save();ctx.globalAlpha=alpha;ctx.globalCompositeOperation='screen';
  ctx.drawImage(sprite,x-r,y-r,r*2,r*2);ctx.restore();
}

export function drawBuildingMagic(ctx,b,w,h,now,reduced){
  const t=reduced?0:now/1000;
  const configs={hub:[0,.82,'#72eafa',15],research:[-.1,.77,'#dcfa86',19],arch:[.16,.19,'#80e1b2',13],eagle:[-.08,.62,'#f3d488',10],stable:[.08,.6,'#b7da9f',9],notice:[-.05,.65,'#ffe092',8],sentry:[0,.69,'#8de8b0',9],infantry:[0,.68,'#ffd07f',9],admin:[.02,.7,'#c7a6fa',14],archery:[0,.7,'#b4f0ad',9]};
  const c=configs[b.type]; if(!c)return;
  const x=b.x+w*c[0], y=b.y-h*c[1];
  light(ctx,x,y,c[3],c[2],.32+Math.sin(t*1.25+b.x)*.035);
  if(!['hub','research','arch'].includes(b.type))return;
  for(let i=0;i<4;i++){
    const phase=(t*.13+i/4)%1;
    const px=x+Math.sin(i*2.4+t*.45)*8, py=y-phase*25;
    light(ctx,px,py,2.6,c[2],Math.sin(phase*Math.PI)*.5);
  }
}

const edgeLights = [[790,228],[1205,440],[318,263],[220,418],[1127,568],[478,813],[802,840],[300,631]];
const fireflies = [[388,396],[551,340],[745,331],[955,370],[1100,482],[1168,650],[1040,771],[881,841],[648,867],[451,766],[311,611],[298,467]];
export function drawAtmosphere(ctx,now,reduced){
  const t=reduced?0:now/1000;
  // Thin mist stays inside the wall; the playable ground remains easy to read.
  ctx.save();ctx.beginPath();ctx.ellipse(724,590,430,265,0,0,Math.PI*2);ctx.clip();
  for(let i=0;i<3;i++){
    const x=375+((t*5+i*290)%740), y=475+i*100+Math.sin(t*.14+i)*12;
    ctx.save();ctx.translate(x,y);ctx.scale(3.5,.2);light(ctx,0,0,62,'#e3f1d1',.045);ctx.restore();
  }
  ctx.restore();
  for(const [x,y] of edgeLights)light(ctx,x,y,13,'#8dece5',.10+Math.sin(t*.9+x)*.018);
  for(let i=0;i<fireflies.length;i++){
    const [baseX,baseY]=fireflies[i], phase=t*.55+i*2.21;
    const x=baseX+Math.sin(phase)*7, y=baseY+Math.sin(phase*.8+i)*6;
    const alpha=.11+.13*(.5+.5*Math.sin(phase*1.8));
    light(ctx,x,y,4.5,'#fff4ad',alpha);
  }
}

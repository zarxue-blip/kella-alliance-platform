import * as THREE from 'three';

// Animate the existing scenery texture; the playable ground and walls stay fixed.
export function createScenery(image, motion) {
  let renderer, material, ready = false, last = -Infinity;
  const canvas = document.createElement('canvas');
  const width = 1448, height = 1086;
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
        // Existing floating rock outcrops, with soft falloff into their hanging vines.
        shift.y += region(p,vec2(214.,219.),vec2(68.,74.))*sin(time*.8)*6.;
        shift.y += region(p,vec2(863.,134.),vec2(53.,84.))*sin(time*.65+1.8)*5.;
        shift.y += region(p,vec2(1110.,234.),vec2(123.,123.))*sin(time*.62+3.)*5.;
        shift.y += region(p,vec2(1376.,528.),vec2(66.,96.))*sin(time*.75+4.2)*5.;
        for(int i=0;i<7;i++){
          vec4 f=plants[i]; float a=region(p,f.xy,f.zw);
          shift.x+=a*sin(time*1.55+float(i)*1.3+p.y*.012)*2.4;
          shift.y+=a*sin(time*1.2+float(i))*1.1;
        }
        vec2 samplePoint=p-shift*motion;
        vec4 color=texture2D(map,vec2(samplePoint.x/1448.,1.-samplePoint.y/1086.));
        gl_FragColor=color;
      }`
  });
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));
  return { draw(ctx, now) {
    if (!image.complete || !image.naturalWidth) return;
    if (!ready) { texture.needsUpdate = true; ready = true; }
    if (now-last > 33 || last === -Infinity) {
      material.uniforms.time.value = now/1000;
      material.uniforms.motion.value = motion.matches ? 0 : 1;
      renderer.render(scene,camera); last=now;
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

function light(ctx,x,y,r,color,alpha){
  ctx.save();ctx.globalAlpha=alpha;ctx.globalCompositeOperation='screen';
  const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,color);g.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);ctx.restore();
}

export function drawBuildingMagic(ctx,b,w,h,now,reduced){
  const t=reduced?0:now/1000;
  const configs={hub:[0,.82,'#72eafa',15],research:[-.1,.77,'#dcfa86',19],arch:[.16,.19,'#80e1b2',13],eagle:[-.08,.62,'#f3d488',10],stable:[.08,.6,'#b7da9f',9],notice:[-.05,.65,'#ffe092',8]};
  const c=configs[b.type]; if(!c)return;
  const x=b.x+w*c[0], y=b.y-h*c[1];
  light(ctx,x,y,c[3],c[2],.37+Math.sin(t*1.6+b.x)*.06);
  if(!['hub','research','arch'].includes(b.type))return;
  for(let i=0;i<6;i++){
    const phase=(t*.17+i/6)%1;
    const px=x+Math.sin(i*2.4+t*.65)*9, py=y-phase*28;
    light(ctx,px,py,2.8,c[2],Math.sin(phase*Math.PI)*.6);
  }
}

export function drawAtmosphere(ctx,now,reduced){
  const t=reduced?0:now/1000;
  // Low, translucent mist passes over the grass, clipped inside the walls.
  ctx.save();ctx.beginPath();ctx.ellipse(724,590,430,265,0,0,Math.PI*2);ctx.clip();
  for(let i=0;i<4;i++){
    const x=300+((t*8+i*230)%900), y=460+i*72+Math.sin(t*.14+i)*18;
    ctx.save();ctx.translate(x,y);ctx.scale(3.8,.24);light(ctx,0,0,65,'#e3f1d1',.065);ctx.restore();
  }
  ctx.restore();
  for(const [x,y] of [[790,228],[1205,440],[318,263],[220,418]])light(ctx,x,y,16,'#5ccfe7',.12+Math.sin(t*1.1+x)*.025);
}

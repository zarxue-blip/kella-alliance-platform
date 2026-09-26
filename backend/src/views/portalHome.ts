// Runs inside the existing dashboard closure; data and authorization stay shared.
export const portalHomeClient = String.raw`
      function renderAllianceBoard(events = []) {
        const destinations = [
          ['/calendar','icons/events.png','Alliance Calendar','Gather for the next adventure.'],
          ['/wiki','icons/embed-sender.png','The Alliance Archives','Rules, guides, and shared wisdom.'],
          ['/members','icons/members.png','Our Champions','The strength behind our banner.'],
          ['/attendance','icons/events.png','Attendance','Make your presence count.'],
          ['/research','buffs/research.png','Research','Plan your next breakthrough.'],
          ['/training-tools','icons/training-tools.png','Training','Prepare your legions for battle.'],
          ['/migration','migration-gold.png','Migration','Your next chapter begins here.']
        ];
        if (hasAdminAccess()) destinations.push(['/officer','icons/settings.png','Admin Tools','Lead, organize, and keep us moving.']);
        const links = destinations.map(function(item,index){return '<a class="portal-feature" href="'+item[0]+'" data-link><span class="portal-feature-number">0'+(index+1)+'</span><img src="/assets/'+item[1]+'" alt="" width="62" height="62" loading="lazy"/><div><strong>'+item[2]+'</strong><p>'+item[3]+'</p></div><span class="portal-feature-arrow" aria-hidden="true">↗</span></a>';}).join('');
        return '<div class="portal-home portal-parallax">' +
          '<section class="kingdom-journey" data-kingdom-journey aria-label="Journey into the elven kingdom"><div class="kingdom-stage"><div class="kingdom-film" aria-hidden="true"><img class="kingdom-still" src="/assets/base-game/assets/kingdom-open.jpg" alt="" width="1280" height="720"/><video data-kingdom-video muted playsinline preload="none" poster="/assets/base-game/assets/kingdom-start.jpg" width="1280" height="720" disablepictureinpicture disableremoteplayback tabindex="-1"></video></div><div class="kingdom-shade" aria-hidden="true"></div><div class="kingdom-topline"><span>EVOLUTION / THE ELVEN KINGDOM</span><button type="button" class="secondary" data-story-toggle aria-pressed="true">Story mode · On</button></div><div class="kingdom-intro"><p class="portal-eyebrow">ONE BANNER. COUNTLESS ADVENTURES.</p><h1><img src="/assets/evo-wordmark.svg" alt="EVO" width="360" height="120" fetchpriority="high"/></h1><p>A world beyond the ordinary.</p></div><div class="kingdom-enter" data-kingdom-entry hidden><span class="portal-eyebrow">YOUR KINGDOM AWAITS</span><a class="primary" href="/base">Enter Kingdom <span aria-hidden="true">↗</span></a></div><div class="kingdom-bottomline"><a class="kingdom-support" href="https://paypal.me/exuzz" target="_blank" rel="noopener noreferrer">Support Creator ↗</a><p data-kingdom-hint role="status">Scroll to enter the forest <span aria-hidden="true">↓</span></p><a href="#portal-explore">Member tools ↓</a></div><div class="kingdom-progress" aria-hidden="true"><i></i></div></div></section>' +
          '<section class="portal-realm" id="portal-explore"><div class="portal-realm-scenery" data-depth="0.10" aria-hidden="true"></div><div class="portal-body"><div class="portal-section-heading"><div><p class="portal-eyebrow">THE REALM / AT YOUR COMMAND</p><h2>Everything for<br>the next adventure.</h2></div><a class="portal-text-link" href="/migration" data-link>Migration ↗</a></div><div class="portal-tools-layout"><div class="portal-features">'+links+'</div><section class="hero-calendar" aria-label="Alliance calendar" data-mini-calendar></section></div><div class="portal-live" data-portal-live></div></div></section>' +
          '<section class="portal-honour"><div class="portal-honour-art" data-depth="0.06" aria-hidden="true"><img src="/assets/base-game/assets/sacred-hall.png" alt="" loading="lazy"/></div><div class="portal-body portal-community"><div class="portal-honour-copy"><p class="portal-eyebrow">OUR PEOPLE / OUR STRENGTH</p><h2>Legends live<br>among us.</h2><p>Every victory begins with the people beside you.</p><a class="portal-text-link" href="/members" data-link>Meet the alliance ↗</a></div><div class="portal-champions"></div></div></section><div class="portal-body"><footer class="portal-footer"><img src="/assets/kella-logo.png" width="40" height="40" alt=""/><div><strong>EVO · EVOLUTION</strong><p>Built for our alliance.</p></div><a href="/profile" data-link>Your profile ↗</a></footer></div></div>';
      }

      function initializeKingdomEntrance() {
        const root=app.querySelector('[data-kingdom-journey]');
        if(!root) return;
        const video=root.querySelector('[data-kingdom-video]');
        const entry=root.querySelector('[data-kingdom-entry]');
        const toggle=root.querySelector('[data-story-toggle]');
        const hint=root.querySelector('[data-kingdom-hint]');
        const motion=matchMedia('(prefers-reduced-motion: reduce)');
        const header=document.querySelector('.shell > .sidebar');
        let frame=0,enabled=true,failed=false,disposed=false,progress=0,targetTime=0,lastHint='';
        const clamp=function(n){return Math.max(0,Math.min(1,n));};
        function animated(){return enabled&&!motion.matches&&!failed;}
        function message(value){if(lastHint!==value){hint.textContent=value;lastHint=value;}}
        function updateEntry(){
          // Never show the invitation over an old frame while a seek is still decoding.
          const ready=!animated() || (progress>=.94 && !video.seeking && video.readyState>=2 && video.currentTime>=video.duration*.85);
          entry.hidden=!ready;
          root.classList.toggle('kingdom-ready',ready);
          if(failed)message('The film could not load. You can still enter the kingdom.');
          else if(!animated())message('Your kingdom is ready.');
          else if(video.readyState<2)message('Preparing the forest…');
          else if(ready)message('The gates are open.');
          else if(progress<.1)message('Scroll to enter the forest ↓');
          else if(progress<.6)message('Follow the path ↓');
          else message('Keep scrolling to open the door ↓');
        }
        function seek(){
          if(disposed||!animated()||video.readyState<2||!Number.isFinite(video.duration)||video.seeking)return;
          if(Math.abs(video.currentTime-targetTime)>1/48){video.currentTime=targetTime;}
          updateEntry();
        }
        function draw(){
          frame=0;if(disposed)return;
          const headerHeight=header?Math.round(header.getBoundingClientRect().height):0;
          root.style.setProperty('--kingdom-header',headerHeight+'px');
          const height=Math.max(1,innerHeight-headerHeight);
          progress=animated()?clamp((headerHeight-root.getBoundingClientRect().top)/Math.max(1,root.offsetHeight-height)):1;
          // Give the opening nearly half the scroll distance, slowing the final reveal.
          const filmProgress=progress<.55?progress/.55*.61:.61+(progress-.55)/.45*.35;
          targetTime=Number.isFinite(video.duration)?Math.max(0,Math.min(video.duration-.08,video.duration*filmProgress)):0;
          root.style.setProperty('--kingdom-progress',String(progress));
          root.style.setProperty('--kingdom-intro',String(animated()?1-clamp(progress/.16):0));
          root.classList.toggle('kingdom-intro-hidden',progress>=.16);
          seek();updateEntry();
        }
        function queue(){if(!disposed&&!frame&&!document.hidden)frame=requestAnimationFrame(draw);}
        function onSeeked(){seek();updateEntry();}
        function onError(){failed=true;apply();}
        function apply(){
          if(disposed)return;
          root.classList.toggle('kingdom-regular',!animated());
          toggle.setAttribute('aria-pressed',String(enabled&&!motion.matches));
          toggle.textContent=motion.matches?'Story mode · Reduced':enabled?'Story mode · On':'Story mode · Off';
          video.muted=true;video.pause();
          if(animated()&&!video.getAttribute('src')){
            video.preload='auto';video.src='/assets/base-game/assets/kingdom-entrance.mp4';video.load();
          }
          draw();
        }
        function syncPreference(){try{enabled=localStorage.getItem('kella-story-mode')!=='off';}catch{}apply();}
        toggle.onclick=function(){
          const rect=root.getBoundingClientRect();
          const here=rect.top<innerHeight&&rect.bottom>0;
          enabled=!enabled;
          try{localStorage.setItem('kella-story-mode',enabled?'on':'off');}catch{}
          window.dispatchEvent(new Event('kella-motion-change'));apply();
          if(here)root.scrollIntoView({behavior:'instant',block:'start'});
          queue();
        };
        ['loadedmetadata','loadeddata','canplay'].forEach(function(event){video.addEventListener(event,queue);});
        video.addEventListener('seeked',onSeeked);video.addEventListener('error',onError);
        addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);
        addEventListener('kella-motion-change',syncPreference);addEventListener('storage',syncPreference);
        document.addEventListener('visibilitychange',queue);motion.addEventListener('change',apply);
        const observer=new MutationObserver(function(){if(!root.isConnected){
          disposed=true;cancelAnimationFrame(frame);video.pause();
          ['loadedmetadata','loadeddata','canplay'].forEach(function(event){video.removeEventListener(event,queue);});
          video.removeEventListener('seeked',onSeeked);video.removeEventListener('error',onError);
          video.removeAttribute('src');video.load();
          removeEventListener('scroll',queue);removeEventListener('resize',queue);
          removeEventListener('kella-motion-change',syncPreference);removeEventListener('storage',syncPreference);
          document.removeEventListener('visibilitychange',queue);motion.removeEventListener('change',apply);observer.disconnect();
        }});
        observer.observe(app,{childList:true});syncPreference();
      }

      function initializePortalDepth() {
        const root = app.querySelector('.portal-parallax');
        if(!root) return;
        const layers = Array.from(root.querySelectorAll('[data-depth]'));
        const motion = matchMedia('(prefers-reduced-motion: reduce)');
        let frame=0, enabled=true;
        function draw(){
          frame=0;
          const mobile=innerWidth<700;
          layers.forEach(function(layer){
            const rect=layer.parentElement.getBoundingClientRect();
            const distance=Math.max(-innerHeight,Math.min(innerHeight,innerHeight*.45-rect.top-rect.height*.5));
            const offset=enabled&&!motion.matches&&!document.hidden?distance*Number(layer.dataset.depth)*(mobile?.35:1):0;
            layer.style.setProperty('--depth-y',offset.toFixed(2)+'px');
          });
        }
        function queue(){if(!frame)frame=requestAnimationFrame(draw);}
        function sync(){try{enabled=localStorage.getItem('kella-story-mode')!=='off';}catch{}draw();}
        addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue);
        addEventListener('kella-motion-change',sync);addEventListener('storage',sync);
        document.addEventListener('visibilitychange',sync);motion.addEventListener('change',sync);
        const observer=new MutationObserver(function(){if(!root.isConnected){
          removeEventListener('scroll',queue);removeEventListener('resize',queue);
          removeEventListener('kella-motion-change',sync);removeEventListener('storage',sync);
          document.removeEventListener('visibilitychange',sync);motion.removeEventListener('change',sync);
          cancelAnimationFrame(frame);observer.disconnect();
        }});
        observer.observe(app,{childList:true});sync();
      }

      function initializeMiniCalendar(events) {
        const target=app.querySelector('[data-mini-calendar]');
        if(!target)return;
        let month=new Date();
        function draw(){
          const year=month.getUTCFullYear(),m=month.getUTCMonth();
          const offset=new Date(Date.UTC(year,m,1)).getUTCDay();
          const count=new Date(Date.UTC(year,m+1,0)).getUTCDate();
          const today=new Date().toISOString().slice(0,10);
          let days='<span aria-hidden="true"></span>'.repeat(offset);
          for(let d=1;d<=count;d++){
            const key=new Date(Date.UTC(year,m,d)).toISOString().slice(0,10);
            const matches=events.filter(e=>Number.isFinite(Date.parse(e.startsAt))&&new Date(e.startsAt).toISOString().slice(0,10)===key);
            const href=matches.length?'/attendance/'+encodeURIComponent(matches[0].id):'/calendar';
            days+='<a data-link href="'+href+'" class="'+(key===today?'today ':'')+(matches.length?'has-event':'')+'" aria-label="'+key+(matches.length?' · '+matches.length+' events':'')+'">'+d+(matches.length?'<i></i>':'')+'</a>';
          }
          target.innerHTML='<header><div><span class="portal-eyebrow">ALLIANCE CALENDAR · UTC</span><h2>'+monthTitle(month)+'</h2></div><div><button data-mini-shift="-1" aria-label="Previous calendar month">‹</button><button data-mini-shift="1" aria-label="Next calendar month">›</button></div></header><div class="mini-week">'+['S','M','T','W','T','F','S'].map(d=>'<span>'+d+'</span>').join('')+'</div><div class="mini-days">'+days+'</div><footer><span><i></i> Alliance event</span><a href="/calendar" data-link>Full calendar ↗</a></footer>';
          target.querySelectorAll('[data-mini-shift]').forEach(b=>b.onclick=()=>{month=new Date(Date.UTC(year,m+Number(b.dataset.miniShift),1));draw();});
        }
        draw();
      }

      function initializeCharacterVideo() {
        // A transparent original portrait is the safe first paint on every browser.
        const character = document.querySelector('[data-portal-kella]');
        const hero = document.querySelector('.portal-hero');
        if (!character || !hero) return;
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        let inView = true;
        const animate = function() {
          const animated = !motion.matches && !document.hidden && inView;
          character.src = animated ? '/assets/kella-toss-v3.webp' : '/assets/kella-character.png';
          character.classList.toggle('is-animated',animated);
          hero.classList.toggle('motion-paused', !animated);
        };
        animate();
        document.addEventListener('visibilitychange', animate);
        motion.addEventListener('change', animate);
        const visibility = new IntersectionObserver(function(entries) { inView = entries[0].isIntersecting; animate(); });
        visibility.observe(hero);
        const observer = new MutationObserver(function() {
          if (!hero.isConnected) {
            document.removeEventListener('visibilitychange',animate);
            motion.removeEventListener('change',animate);
            visibility.disconnect();
            observer.disconnect();
          }
        });
        observer.observe(app,{childList:true});
      }

      async function loadPortalParticipation() {
        const target = document.querySelector('[data-portal-participation]');
        try {
          const polls = await loadPolls();
          if (!target?.isConnected) return;
          const open = polls.filter(function(p){return p.status === 'Open';}).slice(0,3);
          if (!open.length) return;
          target.insertAdjacentHTML('beforeend','<div class="portal-polls">'+open.map(function(p){return '<article><span class="portal-eyebrow">OPEN POLL · '+Number(p.totalVotes || 0)+' RESPONSES</span><h3>'+escapeHtml(p.question)+'</h3><a href="/attendance" data-link>View participation →</a></article>';}).join('')+'</div>');
        } catch { /* Attendance remains accessible even if optional poll data fails. */ }
      }

      async function loadPortalStats() {
        const target = document.querySelector('[data-portal-live]');
        try {
          const data = await fetchJson('/api/dashboard/summary');
          if (!target?.isConnected) return;
          const stats = [['totalMembers','ALLIANCE MEMBERS'],['todayCheckIns','CHECK-INS TODAY']];
          target.innerHTML = stats.filter(function(s){return typeof data[s[0]] === 'number' && Number.isFinite(data[s[0]]);}).map(function(s){return '<div><strong>'+formatNumber(data[s[0]])+'</strong><span>'+s[1]+'</span></div>';}).join('');
        } catch { /* Missing stats are hidden, never represented as invented zeroes. */ }
      }

      const ambientMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      function updateAmbientMotion() {
        const paused = document.hidden || ambientMotion.matches;
        document.body.classList.toggle('ambient-paused',paused);
        const logo = document.getElementById('guildAvatar');
        if (logo) logo.src = paused ? '/assets/kella-header-v2-still.png' : '/assets/kella-header-v2.webp';
      }
      document.addEventListener('visibilitychange',updateAmbientMotion);
      ambientMotion.addEventListener('change',updateAmbientMotion);
      updateAmbientMotion();


      // One sprite canvas keeps thousands of coins out of the document layout.
      (function initializeHeaderCoins() {
        const canvas = document.querySelector('canvas.header-coins');
        if (!canvas) return;
        const header = canvas.parentElement;
        const ctx = canvas.getContext('2d', {alpha:true});
        if (!ctx) return;
        const sprite = new Image();
        let width=0, height=0, coins=[], frame=0, last=0, visible=true;
        const pointer={x:0,y:0,active:false};
        function resize() {
          const box=header.getBoundingClientRect();
          width=box.width; height=box.height;
          const ratio=Math.min(window.devicePixelRatio||1,2);
          canvas.width=Math.round(width*ratio); canvas.height=Math.round(height*ratio);
          ctx.setTransform(ratio,0,0,ratio,0,0);
          const count=width<700?90:320;
          canvas.dataset.coinCount=String(count);
          coins=Array.from({length:count},function(){return {
            x:Math.random()*width,y:Math.random()*height,
            vx:(Math.random()-.5)*.6,vy:(Math.random()-.5)*.5,
            size:4,phase:Math.random()*6.28,trail:[]
          };});
          draw(0); sync();
        }
        function draw(delta) {
          if(!sprite.complete||!sprite.naturalWidth)return;
          ctx.clearRect(0,0,width,height);
          for(const coin of coins){
            if(delta){
              coin.trail.unshift({x:coin.x,y:coin.y});
              if(coin.trail.length>6)coin.trail.pop();
              if(pointer.active){
                const dx=pointer.x-coin.x,dy=pointer.y-coin.y,d=Math.hypot(dx,dy);
                if(d<220&&d>6){coin.vx+=(dx/d*.11-dy/d*.035)*delta;coin.vy+=(dy/d*.11+dx/d*.035)*delta;}
              }
              coin.vx=coin.vx*.988+Math.sin(coin.phase)*.006;
              coin.vy=coin.vy*.988+Math.cos(coin.phase)*.006;
              coin.x+=Math.max(-3,Math.min(3,coin.vx))*delta;
              coin.y+=Math.max(-3,Math.min(3,coin.vy))*delta;
              if(coin.x<0||coin.x>width){coin.vx*=-1;coin.x=Math.max(0,Math.min(width,coin.x));}
              if(coin.y<0||coin.y>height){coin.vy*=-1;coin.y=Math.max(0,Math.min(height,coin.y));}
              coin.phase+=.017*delta;
            }
          }
          // Batch fading gold tails by age, avoiding thousands of gradients or shadows.
          if(!ambientMotion.matches){
            ctx.lineCap='round';
            for(let age=5;age>=0;age--){
              ctx.beginPath();
              ctx.strokeStyle=age<2?'#ffe9a0':'#d69a32';
              ctx.globalAlpha=(6-age)*.065;
              ctx.lineWidth=age<2?1.5:1;
              for(const coin of coins){
                const from=age===0?coin:coin.trail[age-1],to=coin.trail[age];
                if(from&&to){ctx.moveTo(from.x,from.y);ctx.lineTo(to.x,to.y);}
              }
              ctx.stroke();
            }
          }
          ctx.globalAlpha=.78;
          for(const coin of coins){
            ctx.drawImage(sprite,coin.x-coin.size/2,coin.y-coin.size/2,coin.size,coin.size);
          }
          ctx.globalAlpha=1;
        }
        function tick(time){
          frame=0;
          if(time-last>=32){draw(Math.min((time-last)/16.67,2.5));last=time;}
          frame=requestAnimationFrame(tick);
        }
        function sync(){
          cancelAnimationFrame(frame);frame=0;last=performance.now();
          if(!document.hidden&&!ambientMotion.matches&&visible)frame=requestAnimationFrame(tick);
          else draw(0);
        }
        header.addEventListener('pointermove',function(event){
          if(event.pointerType==='touch')return;
          const box=header.getBoundingClientRect();
          pointer.x=event.clientX-box.left;pointer.y=event.clientY-box.top;pointer.active=true;
        },{passive:true});
        header.addEventListener('pointerleave',function(){pointer.active=false;});
        new ResizeObserver(resize).observe(header);
        new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;sync();}).observe(header);
        document.addEventListener('visibilitychange',sync);
        ambientMotion.addEventListener('change',sync);
        sprite.onload=function(){resize();};sprite.src='/assets/gold-coin.png';
      })();
`;

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
        const coins = Array.from({length:8}, function(_,i) { return '<i class="portal-coin" style="--x:'+([6,19,39,58,72,88,94,52,83,31,65,9,91,48][i])+'%;--y:'+([19,66,12,31,9,45,76,81,65,88,55,85,17,48][i])+'%;--size:'+(18+(i*11)%38)+'px;--duration:'+(7+i%6)+'s;--delay:-'+i+'s"><span>✦</span></i>'; }).join('');
        return '<div class="portal-home"><section class="portal-hero" aria-labelledby="portal-title"><div class="portal-scenery" aria-hidden="true"></div><div class="portal-coins" aria-hidden="true">'+coins+'</div><div class="portal-hero-copy"><p class="portal-eyebrow"><span></span> CALL OF DRAGONS · EVOLUTION</p><h1 id="portal-title"><em class="evo-mark"><img src="/assets/evo-wordmark.svg" alt="EVO" width="360" height="120" fetchpriority="high"/></em></h1><p class="portal-subtitle">EVOLUTION</p><p class="portal-intro">One banner. Countless adventures.<br>Your alliance, always within reach.</p><div class="portal-actions"><a class="primary" href="/calendar" data-link>Alliance Calendar <span>↗</span></a><a class="secondary" href="/migration" data-link>Migration</a></div><a class="evo-support" href="https://paypal.me/exuzz" target="_blank" rel="noopener noreferrer"><picture><source media="(prefers-reduced-motion: reduce)" srcset="/assets/support-creator-still.png"/><img src="/assets/support-creator.webp" alt="" width="30" height="54"/></picture>Support Creator <span>↗</span></a><a class="portal-archive-link" href="/wiki" data-link>Explore the archives <span>→</span></a></div><section class="hero-calendar" aria-label="Alliance calendar" data-mini-calendar></section><div class="portal-character"><img data-portal-kella src="/assets/kella-character.png" alt="Kella, our halfling caravan keeper" width="340" height="390" fetchpriority="high"/></div><div class="portal-hero-foot"><span>EVO <b>◆</b> EVOLUTION</span><a href="#portal-explore">Discover the realm ↓</a></div></section><div class="portal-body"><section class="portal-section" id="portal-explore"><div class="portal-section-heading"><div><p class="portal-eyebrow">EVERYTHING FOR THE JOURNEY</p><h2>Explore the realm</h2></div><span>Plan. Prepare. Prevail.</span></div><div class="portal-features">'+destinations.map(function(item,index){return '<a class="portal-feature" href="'+item[0]+'" data-link><span class="portal-feature-number">0'+(index+1)+'</span><img src="/assets/'+item[1]+'" alt="" width="62" height="62" loading="lazy"/><strong>'+item[2]+'</strong><p>'+item[3]+'</p><span class="portal-feature-arrow">↗</span></a>';}).join('')+'</div></section><div class="portal-live" data-portal-live></div><section class="portal-section portal-community"><div class="portal-champions"></div><div class="portal-participation" data-portal-participation><p class="portal-eyebrow">STAND WITH YOUR ALLIANCE</p><h2>Every voice counts.</h2><p>Check attendance, take part in polls, and help shape our next move.</p><a class="secondary" href="/attendance" data-link>Attendance & polls →</a></div></section><footer class="portal-footer"><img src="/assets/kella-logo.png" width="40" height="40" alt=""/><div><strong>EVO</strong><p>Evolution · Built for our alliance.</p></div><a href="/profile" data-link>Your profile ↗</a></footer></div></div>';
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

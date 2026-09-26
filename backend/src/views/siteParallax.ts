// Decorative shell only. Route rendering, permissions and member data remain owned
// by the dashboard. Call once after the dashboard's body has been created.
export const siteParallaxClient = String.raw`
      let disposeSiteParallax = null;
      function initializeSiteParallax() {
        if (disposeSiteParallax) disposeSiteParallax();
        const body = document.body;
        const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
        const scene = document.createElement('div');
        scene.className = 'site-parallax-scene';
        scene.setAttribute('aria-hidden', 'true');
        scene.innerHTML = '<div class="site-parallax-distance"></div><div class="site-parallax-woodland"></div><div class="site-parallax-shade"></div><div class="site-parallax-canopy"></div>';
        body.prepend(scene);
        body.classList.add('site-parallax-ready');
        const account = document.querySelector('.account-panel');
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'site-motion-toggle';
        toggle.setAttribute('data-site-motion-toggle', '');
        if (account) account.append(toggle);
        let frame = 0, active = false, enabled = true, disposed = false;

        function readPreference() {
          try { enabled = localStorage.getItem('kella-story-mode') !== 'off'; } catch {}
        }
        function draw() {
          frame = 0;
          if (disposed) return;
          const animated = active && enabled && !reducedMotion.matches;
          const distance = animated ? Math.min(Math.max(0, window.scrollY || 0), 2400) : 0;
          const scale = innerWidth <= 700 ? .45 : 1;
          scene.style.setProperty('--scene-far-y', (-distance * .028 * scale).toFixed(2) + 'px');
          scene.style.setProperty('--scene-near-y', (-distance * .062 * scale).toFixed(2) + 'px');
          scene.style.setProperty('--scene-leaf-y', (-distance * .085 * scale).toFixed(2) + 'px');
        }
        function queue() {
          if (!disposed && !frame && !document.hidden && active && enabled && !reducedMotion.matches) frame = requestAnimationFrame(draw);
        }
        function refresh() {
          if (disposed) return;
          readPreference();
          const routeName = body.dataset.route || location.pathname.split('/')[1] || 'home';
          const embedded = body.classList.contains('embedded-tool') || new URLSearchParams(location.search).get('embedded') === '1';
          active = routeName !== 'home' && routeName !== 'base' && !embedded;
          body.classList.toggle('site-parallax-active', active);
          body.classList.toggle('site-motion-off', !enabled || reducedMotion.matches);
          scene.hidden = !active;
          toggle.hidden = embedded;
          toggle.setAttribute('aria-pressed', String(enabled && !reducedMotion.matches));
          toggle.setAttribute('aria-label', reducedMotion.matches ? 'Page motion follows your device’s reduced motion setting' : 'Turn page motion ' + (enabled ? 'off' : 'on'));
          toggle.textContent = reducedMotion.matches ? 'Page motion · Reduced' : 'Page motion · ' + (enabled ? 'On' : 'Off');
          if (frame) { cancelAnimationFrame(frame); frame = 0; }
          draw();
        }
        function changePreference() {
          readPreference();
          enabled = !enabled;
          try { localStorage.setItem('kella-story-mode', enabled ? 'on' : 'off'); } catch {}
          // The home story uses this same preference and event.
          window.dispatchEvent(new Event('kella-motion-change'));
        }
        function syncStorage(event) {
          if (event.key === 'kella-story-mode' || event.key === null) refresh();
        }
        function onPageHide(event) { if (!event.persisted) disposeSiteParallax(); }
        const routeObserver = new MutationObserver(refresh);
        routeObserver.observe(body, { attributes: true, attributeFilter: ['data-route'] });
        toggle.addEventListener('click', changePreference);
        window.addEventListener('scroll', queue, { passive: true });
        window.addEventListener('resize', queue, { passive: true });
        window.addEventListener('storage', syncStorage);
        window.addEventListener('kella-motion-change', refresh);
        window.addEventListener('pageshow', refresh);
        window.addEventListener('pagehide', onPageHide);
        document.addEventListener('visibilitychange', queue);
        reducedMotion.addEventListener('change', refresh);
        disposeSiteParallax = function() {
          disposed = true;
          if (frame) cancelAnimationFrame(frame);
          routeObserver.disconnect();
          window.removeEventListener('scroll', queue);
          window.removeEventListener('resize', queue);
          window.removeEventListener('storage', syncStorage);
          window.removeEventListener('kella-motion-change', refresh);
          window.removeEventListener('pageshow', refresh);
          window.removeEventListener('pagehide', onPageHide);
          document.removeEventListener('visibilitychange', queue);
          reducedMotion.removeEventListener('change', refresh);
          toggle.removeEventListener('click', changePreference);
          toggle.remove();
          scene.remove();
          body.classList.remove('site-parallax-ready', 'site-parallax-active', 'site-motion-off');
          disposeSiteParallax = null;
        };
        refresh();
      }
`;

import { migrationFields } from './backend/src/services/migrationFields.js';
import { canonicalAllianceTag } from './backend/src/services/memberIdentity.service.js';
// Local inspection only: no database, credentials, bot, scheduler, or write proxy.
import express from 'express';
import { kellaPageHtml, kellaPageAssets } from './backend/src/views/kellaPage.js';
import { rankMembers } from './backend/src/services/ranking.service.js';
const app = express();
// Role fixtures are exclusive to this loopback preview, never production auth.
app.use((req,res,next) => {
  const requested = String(req.query.__role || '');
  const role = ['member','editor','admin'].includes(requested) ? requested : /kella_preview_role=(member|editor|admin)/.exec(req.headers.cookie || '')?.[1] || 'member';
  if (requested) res.cookie('kella_preview_role', role, {httpOnly:true,sameSite:'strict'});
  res.locals.previewRole = role;
  if(req.method !== 'GET') return res.status(403).json({message:'Preview only: changes are not saved or sent to Discord.'});
  if(req.path === '/api/auth/me') return res.json({authenticated:true,user:{username:'Preview '+role,role:role==='admin'?'Owner':'Member'},isDashboardAdmin:role==='admin',isDashboardWikiEditor:role!=='member'});
  if(req.path === '/api/dashboard/my-attendance') return res.json({byEvent:{}});
  if(req.path === '/api/dashboard/summary/admin' && role==='admin') req.url='/api/dashboard/summary';
  if(req.path === '/api/dashboard/wiki/admin' && role!=='member') { req.url='/api/dashboard/wiki'; }
  if(req.path === '/api/dashboard/members/manage' && role==='admin') { req.url='/api/dashboard/members'+(req.query.q?'?q='+encodeURIComponent(String(req.query.q)):''); }
  if(role==='admin') {
    const fixtures:Record<string,unknown>={
      '/api/migration':{submissions:[],total:0,page:1},'/api/dashboard/access':{admin:true},'/api/dashboard/alerts':{alerts:[]},'/api/dashboard/uploads':{uploads:[]},'/api/dashboard/complaints':{complaints:[]},'/api/embed/channels':{channels:[]},'/api/embed/templates':{templates:[]}
    };
    if(req.path in fixtures) return res.json(fixtures[req.path]);
  }
  next();
});
const allowed = new Set(['/api/dashboard/summary','/api/dashboard/settings','/api/dashboard/members','/api/dashboard/events','/api/dashboard/wiki','/api/dashboard/polls','/api/dashboard/alerts']);
const cache = new Map<string,{at:number,status:number,body:string}>();
app.get('/assets/:file', (req,res,next) => { const item=kellaPageAssets.get(req.path); if(!item)return next(); res.type(item.type).send(item.body); });
app.use('/assets', express.static('backend/public'));
app.get('/api/migration/fields', (_req,res) => res.json({fields:migrationFields}));
app.get('/api/migration/identity', (_req,res) => res.json({discordId:null}));
app.use(async (req,res,next) => {
  if(req.path.startsWith('/api') || req.path.startsWith('/auth')) {
    if(req.method !== 'GET' || !allowed.has(req.path)) return res.status(req.path === '/api/auth/me' ? 401 : 403).json({message:'This local preview cannot sign in or change live data. An isolated staging backend is required.'});
    try {
      const key=req.url; let data=cache.get(key);
      if(!data || Date.now()-data.at>120000) {
        const upstream=await fetch('https://www.kella.online'+(req.path === '/api/dashboard/members' && req.query.view === 'dashboard' && req.query.metric !== 'power' ? '/api/dashboard/members' : key),{headers:{accept:'application/json'},redirect:'error',signal:AbortSignal.timeout(20000)});
        data={at:Date.now(),status:upstream.status,body:await upstream.text()}; cache.set(key,data);
      }
      if(req.path === '/api/dashboard/members' && req.query.view === 'dashboard' && data.status === 200) {
        const payload=JSON.parse(data.body);
        payload.members=rankMembers((payload.members || []).filter((member:any) => ["kog","lwl","mf"].includes(canonicalAllianceTag(member.alliance))),String(req.query.metric || 'power'),Number(req.query.limit) || 10);
        return res.json(payload);
      }
      return res.status(data.status).type('json').send(data.body);
    } catch { return res.status(502).json({message:'Live read-only data is unavailable. Try again shortly.'}); }
  }
  next();
});
app.get('/__preview/info.js',(_req,res)=>res.type('application/javascript').send(`
document.addEventListener('click', function(event) {
  const action = event.target instanceof Element ? event.target.closest('[data-action="discord-login"]') : null;
  if (!action) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const notice = document.getElementById('preview-notice');
  notice.textContent = 'Sign-in is unavailable in this local preview. You can browse the pages and use the calculators.';
  notice.focus();
}, true);
`));
const previewHtml = kellaPageHtml
  .replace('</head>', '<style>#preview-notice{padding:8px 16px;background:#29251e;color:#e4d3b4;font:14px/1.5 "Segoe UI",sans-serif;border-bottom:1px solid #5b503e}#preview-notice:focus{outline:2px solid #c7a86e;outline-offset:-2px}</style><script src="/__preview/info.js" defer></script></head>')
  .replace('<body>', '<body><aside id="preview-notice" role="status" tabindex="-1">Local preview · Sign-in and saving are unavailable.</aside>');
app.use(['/buff-schedule','/roots-of-war','/roots-registration','/roots-reports'],(_req,res)=>res.status(404).send('This feature has been removed.'));
app.get('*',(_req,res)=>res.type('html').send(previewHtml.replace('Local preview · Sign-in and saving are unavailable.', 'Local preview · '+res.locals.previewRole+' view · Saving disabled. <a href="/calendar?__role=member">Member</a> · <a href="/wiki?__role=editor">Wiki Editor</a> · <a href="/officer?__role=admin">Admin</a>')));
app.listen(4173,'127.0.0.1',()=>console.log('Local preview: http://127.0.0.1:4173'));

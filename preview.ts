import { canonicalAllianceTag } from './backend/src/services/memberIdentity.service.js';
// Local inspection only: no database, credentials, bot, scheduler, or write proxy.
import express from 'express';
import { kellaPageHtml, kellaPageAssets } from './backend/src/views/kellaPage.js';
import { rankMembers } from './backend/src/services/ranking.service.js';
const app = express();
const allowed = new Set(['/api/dashboard/summary','/api/dashboard/settings','/api/dashboard/members','/api/dashboard/events','/api/dashboard/buff-schedule','/api/dashboard/wiki','/api/dashboard/polls','/api/dashboard/roots-reports','/api/dashboard/alerts']);
const cache = new Map<string,{at:number,status:number,body:string}>();
app.get('/assets/:file', (req,res,next) => { const item=kellaPageAssets.get(req.path); if(!item)return next(); res.type(item.type).send(item.body); });
app.use('/assets', express.static('backend/public'));
app.use(async (req,res,next) => {
  if(req.path.startsWith('/api') || req.path.startsWith('/auth')) {
    if(req.method !== 'GET' || !allowed.has(req.path)) return res.status(req.path === '/api/auth/me' ? 401 : 403).json({message:'This local preview cannot sign in or change live data. An isolated staging backend is required.'});
    try {
      const key=req.originalUrl; let data=cache.get(key);
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
app.get('*',(_req,res)=>res.type('html').send(kellaPageHtml));
app.listen(4173,'127.0.0.1',()=>console.log('Local preview: http://127.0.0.1:4173'));

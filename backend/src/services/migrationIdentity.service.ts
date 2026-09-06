import jwt from 'jsonwebtoken';
import type { Request } from 'express';
import { env } from '../config/env.js';
export const migrationIdentityCookie = 'kella_migration_discord';
export function signMigrationIdentity(discordId: string) {
  return jwt.sign({type:'migration_identity',discordId},env.JWT_SECRET,{expiresIn:'1h'});
}
export function readMigrationIdentity(req:Request):string {
  const token=req.cookies?.[migrationIdentityCookie];
  if(!token) return '';
  try {
    const payload=jwt.verify(token,env.JWT_SECRET) as jwt.JwtPayload;
    return payload.type==='migration_identity' && /^\d{17,20}$/.test(payload.discordId) ? payload.discordId : '';
  } catch {return '';}
}

import { migrationFields } from './migrationFields.js';

function cell(value:unknown):string {
  let text=Array.isArray(value)?value.join('; '):value == null?'':String(value);
  // Applicant-controlled values must be text when opened in a spreadsheet.
  if (/^[\s]*[=+@-]/.test(text) || /^[\t\r\n]/.test(text) || /^\d{15,}$/.test(text)) text="'"+text;
  return '"'+text.replace(/"/g,'""')+'"';
}
export function migrationCsv(submissions:any[]):string {
  const fields=new Map(migrationFields.map(f=>[f.key,f.label]));
  for(const item of submissions) {
    for(const field of item.fields || []) if(!fields.has(field.key)) fields.set(field.key,field.label || field.key);
    for(const key of Object.keys(item.answers || {})) if(!fields.has(key)) fields.set(key,key);
  }
  const rows:unknown[][]=[['Application ID','Submitted (UTC)','Updated (UTC)','Status','Discord ID','Discord delivery','Applicant roles',...fields.values()]];
  for(const item of submissions) rows.push([
    item._id,item.createdAt?new Date(item.createdAt).toISOString():'',item.updatedAt?new Date(item.updatedAt).toISOString():'',item.status,item.discordId,item.deliveryStatus,item.roleStatus,
    ...Array.from(fields.keys(),key=>item.answers?.[key])
  ]);
  return '\uFEFF'+rows.map(row=>row.map(cell).join(',')).join('\r\n')+'\r\n';
}

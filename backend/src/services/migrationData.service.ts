import { z } from 'zod';
import { migrationFields } from './migrationFields.js';
export const migrationStatuses = ['Pending','Reviewing','Accepted','Declined'] as const;
export function validateMigration(input: unknown) {
  const raw = z.record(z.union([z.string(),z.number().finite(),z.array(z.string())])).parse(input);
  const answers:Record<string,string|number|string[]> = {};
  for (const field of migrationFields) {
    const value = raw[field.key];
    if (value === undefined || value === '' || (Array.isArray(value) && !value.length)) {
      if (field.required) throw new Error(`${field.label} is required.`);
      answers[field.key] = field.type === 'multi' ? [] : ''; continue;
    }
    if (field.type === 'number') {
      answers[field.key] = z.coerce.number().finite().min(0).max(Number.MAX_SAFE_INTEGER).parse(value);
    } else if (field.type === 'multi') {
      const choices = z.array(z.string()).max(field.options.length).parse(value);
      if (choices.some(choice=>!field.options.includes(choice))) throw new Error(`Invalid choice for ${field.label}.`);
      answers[field.key] = [...new Set(choices)];
    } else {
      const text = z.string().trim().max(field.type === 'textarea' ? 2000 : 200).min(1).parse(value);
      if (field.type === 'single' && !field.options.includes(text)) throw new Error(`Invalid choice for ${field.label}.`);
      answers[field.key] = text;
    }
  }
  if (!/^\d{5,12}$/.test(String(answers.playerId))) throw new Error('Enter a valid Player / Lord ID.');
  if (answers.groupMigration === 'Yes' && !answers.groupName) throw new Error('Enter your group name.');
  if (String(answers.adaptability).startsWith('Depends') && !answers.otherDetails) throw new Error('Please explain your adaptability in Other details.');
  return answers;
}
export function migrationDescriptions(answers: Record<string,unknown>, discordId: string, fields = migrationFields) {
  const escape = (v: unknown) => String(v).replace(/([\\`*_~|>])/g,'\\$1').replace(/@/g,'@\u200b');
  const sections = [...new Set(fields.map(f=>f.section))];
  const blocks = [`**Requester Discord:** ${escape(discordId || 'Visitor (Discord name below is self-reported)')}`];
  for (const section of sections) {
    const lines = fields.filter(f=>f.section === section).map(f=> {
      const value = answers[f.key];
      return `${f.label}: ${escape(Array.isArray(value) ? value.join(', ') || 'None' : value === '' ? 'Not provided' : value)}`;
    });
    blocks.push(`**${section}**\n${lines.join('\n')}`);
  }
  const pages:string[]=[]; let page='';
  // Discord embed descriptions are limited to 4096 characters. Split without
  // truncation, preserving all answers even for long free-text submissions.
  for (const block of blocks) {
    for (let offset=0;offset<block.length;offset+=3500) {
      const piece=block.slice(offset,offset+3500);
      if (page.length+piece.length+2>3900) {pages.push(page);page='';}
      page += (page?'\n\n':'')+piece;
    }
  }
  if(page) pages.push(page);
  return pages;
}

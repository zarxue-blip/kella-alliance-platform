import { HttpError } from '../utils/httpError.js';
export function validateChatImage(dataUrl: string, maxBytes = 500_000) {
  const match = /^data:image\/(png|jpeg|gif|webp);base64,([A-Za-z0-9+/]+={0,2})$/.exec(dataUrl);
  if (!match) throw new HttpError(400, 'Use PNG, JPEG, GIF or WebP images.');
  const bytes = Buffer.from(match[2], 'base64');
  if (bytes.length > maxBytes || bytes.length < 12 || bytes.toString('base64') !== match[2]) throw new HttpError(400, 'Image must be valid and at most ' + Math.floor(maxBytes / 1000) + ' KB.');
  const valid = match[1] === 'png' ? bytes.subarray(0,8).equals(Buffer.from('89504e470d0a1a0a','hex'))
    : match[1] === 'jpeg' ? bytes.subarray(0,3).equals(Buffer.from('ffd8ff','hex'))
    : match[1] === 'gif' ? /^GIF8[79]a$/.test(bytes.subarray(0,6).toString())
    : bytes.subarray(0,4).toString() === 'RIFF' && bytes.subarray(8,12).toString() === 'WEBP';
  if (!valid) throw new HttpError(400, 'Image content does not match its file type.');
  return dataUrl;
}

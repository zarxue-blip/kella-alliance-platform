import assert from 'node:assert/strict';
Object.assign(process.env,{DISCORD_BOT_TOKEN:'test',DISCORD_APPLICATION_ID:'test',BOT_API_TOKEN:'test-only-service-token',GROQ_API_KEY:'test-only-key'});
const {protectTranslationText,groqTranslate}=await import('../src/services/translationProtection.js');
const {translateForFlag,translationChunks}=await import('../src/services/translation.js');
const {handleMessageReactionAdd}=await import('../src/handlers/messageReactionAdd.js');
const {commands}=await import('../src/commands/index.js');
const source='Hello **Kella** <@123456789012345678> at X:123 Y:456 https://example.com 🇵🇭 🪙 `coins`';
const protectedText=protectTranslationText(source);assert.equal(protectedText.restore(protectedText.text),source);assert.throws(()=>protectedText.restore('missing'));
const long=('你好 '.repeat(300)+protectedText.text);assert.equal(translationChunks(long).join(''),long);assert.ok(translationChunks(long).every(x=>Buffer.byteLength(x)<=450));
let fail=false;let calls=0;const original=globalThis.fetch;
globalThis.fetch=async(input:any,init:any)=>{calls++;if(String(input).includes('groq.com')){if(fail)return new Response('',{status:429});const body=JSON.parse(init.body);const message=JSON.parse(body.messages[1].content).message;return Response.json({choices:[{finish_reason:'stop',message:{content:message.replace('Hello','Hola')}}]});}const q=new URL(input).searchParams.get('q')!;return Response.json([[[q.replace('Hello','Hola')]],null,'en']);};
try {
 assert.equal(await groqTranslate(source,'Spanish','test'),source.replace('Hello','Hola'));
 fail=true;assert.equal((await translateForFlag(source,'🇪🇸'))?.translatedText,source.replace('Hello','Hola'));fail=false;
 const replies:any[]=[];const reaction:any={partial:false,emoji:{name:'🇪🇸'},message:{id:'test-message',partial:false,author:{bot:false},content:source,attachments:{size:0},reply:async(x:any)=>replies.push(x)}};
 await handleMessageReactionAdd(reaction,{bot:false} as any);const before=calls;await handleMessageReactionAdd(reaction,{bot:false} as any);assert.equal(calls,before);assert.equal(replies.length,1);assert.equal(replies[0].content,undefined);assert.equal(replies[0].embeds[0].toJSON().title,'🌐 Kella Translation');assert.deepEqual(replies[0].allowedMentions,{parse:[],repliedUser:false});
 const names=commands.map(x=>x.data.name);for(const name of ['roots','rowlist','suggest'])assert.ok(!names.includes(name));for(const name of ['sum','poll','summit','shield','attack','complain'])assert.ok(names.includes(name));
 console.log('Translation protection, free fallback, embeds, deduplication and command removal checks passed.');
}finally{globalThis.fetch=original;}

import { SUMMARY_INSTRUCTIONS } from './chatSummary.js';

export async function summarizeWithGroq(chunks: string[], apiKey: string, request: typeof fetch = fetch): Promise<string> {
  const deadline = Date.now() + 120_000;
  async function summarize(text: string): Promise<string> {
    if (Date.now() >= deadline) throw new Error('The summary took too long. Please try again later.');
    const response = await request('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(Math.min(30_000, deadline - Date.now())),
      body: JSON.stringify({ model: 'llama-3.1-8b-instant', temperature: 0.2, max_completion_tokens: 350,
        messages: [{ role: 'system', content: SUMMARY_INSTRUCTIONS }, { role: 'user', content: text }] })
    });
    if (response.status === 429) throw new Error('Kella has reached the free summary quota. Please try again later.');
    if (!response.ok) throw new Error('The summary service is unavailable. Ask an admin to check the Groq configuration.');
    const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
    const result = data.choices?.[0]?.message?.content?.trim();
    if (!result) throw new Error('The summary service returned no summary. Please try again.');
    return result.slice(0, 3000);
  }
  if (!chunks.length) return 'No text conversation in this channel during the past five hours.';
  const notes: string[] = [];
  for (const chunk of chunks) notes.push(await summarize(chunk));
  let merged = notes;
  while (merged.length > 1) {
    const next: string[] = [];
    for (let index = 0; index < merged.length; index += 4) {
      next.push(await summarize('Combine these chronological partial summaries into one concise recap:\n' + merged.slice(index, index + 4).join('\n\n')));
    }
    merged = next;
  }
  return merged[0].replace(/<@!?\d+>|<@&\d+>|@everyone|@here/g, '[mention]').slice(0, 1800);
}

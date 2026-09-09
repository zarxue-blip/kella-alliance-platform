import { redactSensitiveText } from './privacy.js';
import { SUMMARY_INSTRUCTIONS } from './chatSummary.js';

export async function summarizeWithGroq(chunks: string[], apiKey: string, request: typeof fetch = fetch): Promise<string> {
  const deadline = Date.now() + 120_000;
  async function summarize(text: string): Promise<string> {
    if (Date.now() >= deadline) throw new Error('The summary took too long. Please try again later.');
    const response = await request('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(Math.min(30_000, deadline - Date.now())),
      body: JSON.stringify({ model: 'openai/gpt-oss-20b', temperature: 0.2, reasoning_effort: 'low', include_reasoning: false, max_completion_tokens: 1500,
        messages: [{ role: 'system', content: SUMMARY_INSTRUCTIONS }, { role: 'user', content: redactSensitiveText(text, [apiKey]) }] })
    });
    if (response.status === 429) throw new Error('Kella has reached the free summary quota. Please try again later.');
    if (!response.ok) {
      const payload = await response.json().catch(() => ({})) as { error?: { code?: string } };
      // Only report status and known error categories, never provider bodies or credentials.
      if (response.status === 401) throw new Error('Groq rejected the API key. An admin should check GROQ_API_KEY in Render.');
      if (payload.error?.code === 'model_decommissioned') throw new Error('Groq retired the configured summary model. Kella needs a model update.');
      if (response.status === 403 || response.status === 404) throw new Error('Groq denied access to the summary model. An admin should check model permissions in Groq.');
      throw new Error('Groq could not process the summary (HTTP ' + response.status + '). Please try again later.');
    }
    const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
    const result = data.choices?.[0]?.message?.content?.trim();
    if (!result) throw new Error('The summary service returned no summary. Please try again.');
    return redactSensitiveText(result, [apiKey]).slice(0, 3000);
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

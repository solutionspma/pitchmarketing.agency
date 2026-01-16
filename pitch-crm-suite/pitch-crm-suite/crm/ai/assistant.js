import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function processAI(prompt, context = {}) {
  const systemPrompt = `You are a helpful assistant for Pitch Marketing Agency CRM. 
You help with client management, scheduling, and marketing tasks.
Be concise and professional.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ],
    max_tokens: 1000
  });

  return response.choices[0].message.content;
}

export async function generateEmailDraft(clientName, purpose) {
  const prompt = `Write a professional email draft for ${clientName} regarding ${purpose}. 
Keep it brief and friendly.`;
  
  return processAI(prompt);
}

export async function summarizeClient(clientData) {
  const prompt = `Summarize this client profile in 2-3 sentences:
Name: ${clientData.name}
Email: ${clientData.email}
Sessions: ${clientData.sessions}
Elite: ${clientData.elite}
Subscription: ${JSON.stringify(clientData.subscription)}`;
  
  return processAI(prompt);
}

export async function suggestFollowUp(clientData, lastInteraction) {
  const prompt = `Suggest a follow-up action for client ${clientData.name}.
Last interaction: ${lastInteraction}
Sessions remaining: ${clientData.sessions}`;
  
  return processAI(prompt);
}

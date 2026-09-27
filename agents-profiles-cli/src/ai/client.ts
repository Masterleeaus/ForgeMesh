export interface AIConfig {
  baseUrl: string
  apiKey: string
  model: string
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function chatCompletion(config: AIConfig, messages: ChatMessage[]): Promise<string> {
  const url = `${config.baseUrl.replace(/\/+$/, '')}/chat/completions`

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      temperature: 0.3,
      max_tokens: 4096,
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`AI API error (${response.status}): ${text}`)
  }

  const data = await response.json() as {
    choices: Array<{ message: { content: string } }>
  }

  if (!data.choices?.[0]?.message?.content) {
    throw new Error('AI returned empty response')
  }

  return data.choices[0].message.content
}

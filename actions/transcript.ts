'use server';

import {
  AzureKeyCredential,
  OpenAIClient,
} from '@azure/openai';

// add azure open ai here
export const transcript = async (prevState: any, formData: FormData) => {
  const id = Math.random().toString(36);

  if (
    process.env.AZURE_API_KEY === undefined ||
    process.env.AZURE_API_KEY === '' ||
    process.env.AZURE_ENDPOINT === undefined ||
    process.env.AZURE_ENDPOINT === '' ||
    process.env.AZURE_DEPLOYMENT_NAME === undefined ||
    process.env.AZURE_DEPLOYMENT_NAME === '' ||
    process.env.AZURE_DEPLOYMENT_COMPLETIONS_NAME === undefined ||
    process.env.AZURE_DEPLOYMENT_COMPLETIONS_NAME === ''
  ) {
    console.error('Azure credentials not set');
    return {
      sender: '',
      response: 'Azure credentials not set',
    };
  }

  const file = formData.get('audio') as File;

  if (file.size === 0) {
    return {
      sender: '',
      response: 'No audio file provided',
    };
  }

  const arrayBuffer = await file.arrayBuffer();
  const audio = new Uint8Array(arrayBuffer);

  // get audio transcription from Azure Whisper AI service
  // transform voice into text
  const client = new OpenAIClient(
    process.env.AZURE_ENDPOINT,
    new AzureKeyCredential(process.env.AZURE_API_KEY)
  );

  const result = await client.getAudioTranscription(
    process.env.AZURE_DEPLOYMENT_NAME,
    audio
  );

  // get chat completion from Azure OpenAI
  const messages = [
    {
      role: 'system',
      content: '',
    },
    {
      role: 'user',
      content: result.text,
    },
  ];

  const completions = await client.getChatCompletions(
    process.env.AZURE_DEPLOYMENT_COMPLETIONS_NAME,
    messages,
    { maxTokens: 128 }
  );

  const response = completions.choices[0].message?.content

  return {
    sender: result.text,
    response: response,
    id,
  }
};

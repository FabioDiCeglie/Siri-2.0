'use server';

// add azure open ai here
export const transcript = async (prevState: any, formData: FormData) => {

// TODO: check here if a process env is empty string to stop it
  if (
    process.env.AZURE_API_KEY === undefined ||
    process.env.AZURE_ENDPOINT === undefined ||
    process.env.AZURE_DEPLOYMENT_NAME === undefined  ||
    process.env.AZURE_DEPLOYMENT_COMPLETIONS_NAME === undefined 
  ) {
    console.error('Azure credentials not set');
    return {
      sender: '',
      response: 'Azure credentials not set',
    };
  }

  const file = formData.get('audio') as File;

  if(file.size === 0){
    return{
        sender: '',
        response: 'No audio file provided'
    }
  }

  const arrayBuffer = await file.arrayBuffer();
  const audio = new Uint8Array(arrayBuffer);

  // get audio transcription from Azure Whisper AI service

};

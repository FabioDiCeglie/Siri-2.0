import { Dispatch, SetStateAction } from 'react';

export const mimeType = 'audio/webm';

export const initialState = {
  sender: '',
  response: '',
  id: '',
};

export const getMicrophonePermission = async (
  setMicrophonePermission: Dispatch<SetStateAction<boolean>>,
  setStream: Dispatch<SetStateAction<MediaStream | null>>
) => {
  if ('MediaRecorder' in window) {
    try {
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      setMicrophonePermission(true);
      setStream(streamData);
    } catch (error: any) {
      alert(error.message);
    }
  } else {
    alert('The MediaRecorder API is not supported in your browser.');
  }
};
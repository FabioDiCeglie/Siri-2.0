'use client';

import Image from 'next/image';
import activeAssistantIcon from '@/img/active.gif';
import noActiveAssistantIcon from '@/img/notactive.png';
import { useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { mimeType } from '@/utils/helpers';

type RecorderProps = {
  uploadAudio: (blob: Blob) => void;
};

const Recorder = ({ uploadAudio }: RecorderProps) => {
  const [microphonePermission, setMicrophonePermission] =
    useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<string>('inactive');
  const [audioChunk, setAudioChunk] = useState<Blob[] | []>([]);

  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const { pending } = useFormStatus();

  useEffect(() => {
    getMicrophonePermission();
  }, []);

  const getMicrophonePermission = async () => {
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

  const startRecording = async () => {
    if (stream === null || pending || mediaRecorder === null) return;

    setRecordingStatus('recording');

    // Create a new media recorder instance using the stream
    const media = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();

    let localAudioChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined') return;
      if (event.data.size === 0) return;

      localAudioChunks.push(event.data);
    };
    setAudioChunk(localAudioChunks);
  };

  return (
    <div className='flex items-center justify-center text-white'>
      {!microphonePermission && (
        <button onClick={getMicrophonePermission}>Get Microphone</button>
      )}
      {pending && (
        <Image
          src={activeAssistantIcon}
          alt='Assistant Icon'
          width={350}
          height={350}
          priority
          className='grayscale'
        />
      )}
    </div>
  );
};

export default Recorder;

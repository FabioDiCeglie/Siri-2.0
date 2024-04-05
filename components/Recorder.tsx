'use client';

import Image from 'next/image';
import activeAssistantIcon from '@/img/active.gif';
import notActiveAssistantIcon from '@/img/notactive.png';
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
  const [audioChunks, setAudioChunks] = useState<Blob[] | []>([]);

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
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = async () => {
    if (mediaRecorder.current === null || pending) return;

    setRecordingStatus('inactive');
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      uploadAudio(audioBlob);
      setAudioChunks([]);
    };
  };

  return (
    <div className='flex items-center justify-center text-white'>
      {!microphonePermission && (
        <button onClick={getMicrophonePermission}>Get Microphone</button>
      )}
      {pending && (
        <Image
          src={activeAssistantIcon}
          alt='Recording'
          width={350}
          height={350}
          priority
          className='assistant grayscale'
        />
      )}

      {microphonePermission && recordingStatus === 'inactive' && !pending && (
        <Image
          src={notActiveAssistantIcon}
          alt='Not recording'
          width={350}
          height={350}
          onClick={startRecording}
          priority
          className='assistant cursor-pointer hover:scale-110 duration-150 transition-all ease-in-out'
        />
      )}

      {recordingStatus === 'recording' && (
        <Image
          src={activeAssistantIcon}
          alt='Recording'
          width={350}
          height={350}
          onClick={stopRecording}
          priority
          className='assistant cursor-pointer hover:scale-110 duration-150 transition-all ease-in-out'
        />
      )}
    </div>
  );
};

export default Recorder;

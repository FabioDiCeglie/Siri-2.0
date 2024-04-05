'use client';

import Image from 'next/image';
import activeAssistantIcon from '@/img/active.gif';
import noActiveAssistantIcon from '@/img/notactive.png';
import { useEffect, useState } from 'react';

type RecorderProps = {
  uploadAudio: (blob: Blob) => void;
};

const Recorder = ({ uploadAudio }: RecorderProps) => {
  const [permission, setPermission] = useState<boolean>(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    getMicrophonePermission()
  }, [])

  const getMicrophonePermission = async () => {
    if ('MediaRecorder' in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        });

        setPermission(true);
        setStream(streamData);
      } catch (error: any) {
        alert(error.message);
      }
    } else {
      alert('The MediaRecorder API is not supported in your browser.');
    }
  };

  return (
    <div className='flex items-center justify-center text-white'>
      <Image
        src={activeAssistantIcon}
        alt='Assistant Icon'
        width={350}
        height={350}
        priority
      />
    </div>
  );
};

export default Recorder;

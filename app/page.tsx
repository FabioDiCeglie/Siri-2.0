'use client';

import Image from 'next/image';
import { SettingsIcon } from 'lucide-react';
import Messages from '@/components/Messages';
import Recorder from '@/components/Recorder';
import { useRef } from 'react';
import { mimeType } from '@/utils/helpers';

export default function Home() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);

  const uploadAudio = (blob: Blob) => {
    const file = new File([blob], 'audio.webm' , { type: mimeType });

    // set the file as the value of the hidden file input field
    if (fileRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileRef.current.files = dataTransfer.files;

      // simulate the click and submit the form
      if (submitButtonRef.current) {
        submitButtonRef.current.click();
      }
    }
  };

  return (
    <main className='bg-black h-screen overflow-y-auto'>
      {/* Header */}
      <header className='flex justify-between fixed top-0 text-white w-full p-5'>
        <div className='rounded-full'>
          <Image
            src='https://i.pinimg.com/564x/b4/3b/f3/b43bf303f475ddeb69751c67c1ae3856.jpg'
            alt='Logo'
            height={40}
            width={40}
            className='object-contain rounded-full'
          />
        </div>

        <SettingsIcon
          size={40}
          className='p-2 m-2 rounded-full cursor-pointer bg-purple-600
          text-black transition-all ease-in-out duration-150 hover:bg-purple-700 
          hover:text-white'
        />
      </header>

      {/* Form */}
      <form className='flex flex-col bg-black'>
        <div className='flex-1 bg-gradient-to-b from-purple-500 to-black'>
          <Messages />
        </div>

        {/* Hidden fields */}
        <input type='file' name='audio' hidden ref={fileRef} />
        <button type='submit' hidden ref={submitButtonRef} />

        <div className='fixed bottom-0 w-full overflow-hidden bg-black rounded-t-3xl'>
          {/* Recorder */}
          <Recorder uploadAudio={uploadAudio} />

          {/* Voice Synthesiser - output of the Assistance voice */}
          <div></div>
        </div>
      </form>
    </main>
  );
}

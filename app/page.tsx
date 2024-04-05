import Image from 'next/image';
import { SettingsIcon } from 'lucide-react';
import Messages from '@/components/Messages';
import Recorder from '@/components/Recorder';

export default function Home() {
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
      <form action='flex flex-col bg-black'>
        <div className='flex-1 bg-gradient-to-b from-purple-500 to-black'>
          <Messages />
        </div>

        <input type='file' hidden />
        <button type='submit' hidden />

        <div className='fixed bottom-0 w-full overflow-hidden bg-black rounded-t-3xl'>
          {/* Recorder */}
          <Recorder />

          {/* Voice Synthesiser - output of the Assistance voice */}
          <div></div>
        </div>
      </form>
    </main>
  );
}

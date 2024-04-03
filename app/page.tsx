import Image from 'next/image';
import { SettingsIcon } from 'lucide-react';

export default function Home() {
  return (
    <main className=''>
      {/* Header */}
      <header className='flex justify-between fixed top-0 text-white w-full p-5'>
        <div className='rounded-full overflow-hidden'>
        <Image
          src='https://i.pinimg.com/564x/b4/3b/f3/b43bf303f475ddeb69751c67c1ae3856.jpg'
          alt='Logo'
          height={50}
          width={50}
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
    </main>
  );
}

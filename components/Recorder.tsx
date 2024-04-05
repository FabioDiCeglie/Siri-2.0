import Image from 'next/image';
import activeAssistantIcon from '@/img/active.gif'

const Recorder = () => {
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

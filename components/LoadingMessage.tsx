'use client';

import { useFormStatus } from 'react-dom';
import { BeatLoader } from 'react-spinners';

const LoadingMessage = () => {
  
  const { pending } = useFormStatus();
  
  return (
    pending && (
      <div className='message ml-auto'>
        <BeatLoader />
      </div>
    )
  );
};

export default LoadingMessage;

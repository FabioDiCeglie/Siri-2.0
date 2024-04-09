import { Message } from '@/utils/types';
import { ChevronDownCircleIcon } from 'lucide-react';
import LoadingMessage from './LoadingMessage';

type MessagesProps = {
  messages: Message[];
};

const Messages = ({ messages }: MessagesProps) => {
  return (
    <div
      className={`flex flex-col min-h-screen p-5 pt-20 ${
        messages.length > 0 ? 'pb-96' : 'pb-32'
      }`}
    >
      <LoadingMessage />

      {!messages.length && (
        <div className={`flex flex-1 flex-col space-y-10 items-center justify-end`}>
          <p className='text-gray-500 animate-pulse'>Start a conversation</p>
          <ChevronDownCircleIcon
            size={64}
            className='animate-bounce text-gray-500'
          />
        </div>
      )}

      <div className='max-w-5xl mx-auto'>
        <div className='p-5 space-y-5'>
          {messages.map((message) => (
            <div key={message.id} className='space-y-5'>
              {/* receiver */}
              <div className='pr-48'>
                <p className='message bg-gray-800 rounded-bl-none'>
                  {message.response}
                </p>
              </div>

              {/* sender */}
              <div className='pl-48'>
                <p className='message text-left ml-auto rounded-br-none'>
                  {message.sender}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Messages;

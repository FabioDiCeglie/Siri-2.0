'use client';

import { State } from '@/utils/types';
import { ChangeEvent, useState } from 'react';

type VoiceSynthesizerProps = {
  state: State;
  displaySettings: boolean;
};

const VoiceSynthesizer = ({
  state,
  displaySettings,
}: VoiceSynthesizerProps) => {

  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);

  const handleVoiceChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find((v) => v.name === event.target.value);
    if (!selectedVoice) return;
    setVoice(selectedVoice);
  };

  const handleSettingChange = (e: ChangeEvent<HTMLInputElement>, typeHandle: string) => {
    switch(typeHandle) {
      case 'isPitch':
        setPitch(parseFloat(e.target.value));
        break;
      case 'isRate':
        setRate(parseFloat(e.target.value));
        break;
      case 'isVolume':
        setVolume(parseFloat(e.target.value));
        break;
    }
  };

  return (
    <div className='flex flex-col items-center justify-center text-white'>
      {displaySettings && (
        <>
          <div className='w-fit'>
            <p className='text-xs text-gray-500 p-2'>Voice:</p>
            <select
              value={voice?.name}
              onChange={handleVoiceChange}
              className='flex-1 bg-purple-500 text-white border border-gray-300 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-purple-500 dark:focus:border-purple-500'
            >
              {window.speechSynthesis.getVoices().map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name}
                </option>
              ))}
            </select>
          </div>

        <div>
          <div className="flex pb-5">
            <div className="p-2">
              <p className="text-xs text-gray-500">Pitch:</p>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={pitch}
                onChange={(event) => handleSettingChange(event, 'isPitch')}
                className="accent-purple-500"
              />
            </div>

            <div className="p-2">
              <p className="text-xs text-gray-500">Speed:</p>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={(event) => handleSettingChange(event, 'isRate')}
                className="accent-purple-500"
              />
            </div>

            <div className="p-2">
              <p className="text-xs text-gray-500">Volume:</p>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(event) => handleSettingChange(event, 'isVolume')}
                className="accent-purple-500"
              />
            </div>
          </div>

        </div>
        </>
      )}
    </div>
  );
};

export default VoiceSynthesizer;

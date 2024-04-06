import { State } from '@/utils/types';

type VoiceSynthesizerProps = {
  state: State;
  displaySettings: boolean;
};

const VoiceSynthesizer = ({
  state,
  displaySettings,
}: VoiceSynthesizerProps) => {
  return (
    <div>
      {displaySettings && (
        <>
          <div>
            <p>Voice</p>
          </div>
        </>
      )}
    </div>
  );
};

export default VoiceSynthesizer;

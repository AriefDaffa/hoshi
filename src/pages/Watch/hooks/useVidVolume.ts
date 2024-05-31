import { useLocalStorage } from '@mantine/hooks';
import { ChangeEvent, useCallback, useMemo } from 'react';

const useVidVolume = () => {
  const [volume, setVolume] = useLocalStorage({
    key: 'hoshi-vid-vol',
    defaultValue: 0.6,
  });

  const handleVolumeChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setVolume(parseFloat(e.target.value));
    },
    [setVolume]
  );

  return useMemo(() => {
    return { volume, handleVolumeChange };
  }, [handleVolumeChange, volume]);
};

export default useVidVolume;

import { useLocalStorage } from '@mantine/hooks';
import { useCallback, useMemo } from 'react';

const useVidResolution = () => {
  const [vidResolution, setVidResolution] = useLocalStorage({
    key: 'hoshi-vid-res',
    defaultValue: '360p',
  });

  const handleResolutionChange = useCallback(
    (e: string) => {
      setVidResolution(e);
    },
    [setVidResolution]
  );
  return useMemo(() => {
    return { vidResolution, handleResolutionChange };
  }, [handleResolutionChange, vidResolution]);
};

export default useVidResolution;

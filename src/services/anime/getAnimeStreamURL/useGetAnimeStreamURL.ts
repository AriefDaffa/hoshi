import { useCallback, useEffect, useMemo, useState } from 'react';

import { getAnimeStreamURL } from '.';
import type { AnimeStreamResponse } from './types';

interface UseGetAnimeStreamURLProps {
  id: string;
  server: string;
}

const defaultVal = {
  headers: {
    Referer: '',
    watchsb: '', // or null, since only provided with server being equal to "streamsb".
    'User-Agent': '', // or null
  },
  sources: [
    {
      url: '',
      quality: '',
      isM3U8: true,
    },
  ],
};

const useGetAnimeStreamURL = ({
  id,
  server,
}: UseGetAnimeStreamURLProps): AnimeStreamResponse => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState(defaultVal);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const req = await getAnimeStreamURL({ episodeID: id, server });

      const response = await req.json();

      setIsLoading(false);

      if (req.status >= 200 && req.status < 300) {
        setData(response);
      } else {
        setData(defaultVal);
        setIsError(true);
      }
    } catch (error) {
      setData(defaultVal);
      setIsLoading(false);
      setIsError(true);
    }
  }, [id, server]);

  useEffect(() => {
    if (typeof id === 'string') {
      fetchData();
    }
  }, [fetchData, id]);

  return useMemo(() => {
    return { data, isLoading, isError };
  }, [data, isLoading, isError]);
};

export default useGetAnimeStreamURL;

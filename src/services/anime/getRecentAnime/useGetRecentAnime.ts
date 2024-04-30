import { useCallback, useEffect, useMemo, useState } from 'react';

import { getRecentAnime } from '.';
import type { AnimeRecentResponse } from './types';

const defaultVal = {
  currentPage: 0,
  hasNextPage: true,
  results: [],
};

const useGetRecentAnime = (): AnimeRecentResponse => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(defaultVal);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const req = await getRecentAnime();

      const response = await req.json();

      setIsLoading(false);

      if (req.status >= 200 && req.status < 300) {
        setData(response);
      } else {
        setData(defaultVal);
      }
    } catch (error) {
      setData(defaultVal);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return useMemo(() => {
    return { data, isLoading };
  }, [data, isLoading]);
};

export default useGetRecentAnime;

import { useCallback, useEffect, useMemo, useState } from 'react';

import { getTopAnime } from '.';
import type { AnimeTopResponse } from './types';

const defaultVal = {
  currentPage: 0,
  hasNextPage: true,
  results: [],
};

const useGetTopAnime = (): AnimeTopResponse => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(defaultVal);

  const fetchData = useCallback(async () => {
    try {
      const req = await getTopAnime();

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

export default useGetTopAnime;

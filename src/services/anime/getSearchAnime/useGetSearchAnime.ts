import { useCallback, useEffect, useMemo, useState } from 'react';

import { getSearchAnime } from '.';
import type {
  UseGetSearchAnimeProps,
  AnimeSearchResponse,
  AnimeSearchData,
} from './types';

const defaultVal = {
  currentPage: 0,
  hasNextPage: true,
  results: [],
};

const useGetSearchAnime = ({
  keyword,
}: UseGetSearchAnimeProps): AnimeSearchResponse => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AnimeSearchData>(defaultVal);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const req = await getSearchAnime({ keyword });

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
  }, [keyword]);

  console.log(keyword);

  useEffect(() => {
    if (keyword !== '') {
      fetchData();
    }
  }, [fetchData, keyword]);

  return useMemo(() => {
    return { data, isLoading };
  }, [data, isLoading]);
};

export default useGetSearchAnime;
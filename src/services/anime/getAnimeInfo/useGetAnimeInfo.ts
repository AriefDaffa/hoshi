import { useCallback, useEffect, useMemo, useState } from 'react';

import { getAnimeInfo } from '.';
import type { AnimeInfoResponse, UseGetSearchInfoProps } from './types';

const defaultVal = {
  id: '',
  title: '',
  url: '',
  image: '',
  releaseDate: '',
  description: '',
  genres: [],
  subOrDub: '',
  type: '',
  status: '',
  otherName: '',
  totalEpisodes: 0,
  episodes: [],
};

const useGetAnimeInfo = ({ id }: UseGetSearchInfoProps): AnimeInfoResponse => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(defaultVal);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const req = await getAnimeInfo({ id });

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
  }, [id]);

  useEffect(() => {
    if (id !== '') {
      fetchData();
    }
  }, [fetchData, id]);

  return useMemo(() => {
    return { data, isLoading };
  }, [data, isLoading]);
};

export default useGetAnimeInfo;

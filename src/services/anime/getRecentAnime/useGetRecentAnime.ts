import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { defaultVal } from './constant';
import type { AnimeRecentData } from './types';

const useGetRecentAnime = () => {
  const { isPending, data, isSuccess } = useQuery<AnimeRecentData>({
    queryKey: ['recent'],
    queryFn: () =>
      fetch(
        `${import.meta.env.VITE_APP_BASE_API}/anime/gogoanime/recent-episodes`
      ).then((res) => res.json()),
  });

  const normalizer = useMemo(() => {
    if (!isSuccess) {
      return defaultVal;
    } else {
      return data;
    }
  }, [data, isSuccess]);

  return useMemo(() => {
    return { isLoading: isPending, data: normalizer, isSuccess };
  }, [isPending, isSuccess, normalizer]);
};

export default useGetRecentAnime;

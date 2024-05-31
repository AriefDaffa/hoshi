import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { defaultVal } from './constant';
import type { AnimeTopData } from './types';

const useGetTopAnime = () => {
  const { isPending, data, isSuccess } = useQuery<AnimeTopData>({
    queryKey: ['top'],
    queryFn: () =>
      fetch(
        `${import.meta.env.VITE_APP_BASE_API}/anime/gogoanime/top-airing`
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

export default useGetTopAnime;

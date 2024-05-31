import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import { defaultVal } from './constant';
import type { AnimeSearchData } from './types';

const useGetSearchAnime = ({ keyword }: { keyword: string }) => {
  const { isPending, data, isSuccess } = useQuery<AnimeSearchData>({
    queryKey: ['search', keyword],
    enabled: keyword !== '' && keyword !== undefined,
    queryFn: () =>
      fetch(
        `${import.meta.env.VITE_APP_BASE_API}/anime/gogoanime/${keyword}`
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

export default useGetSearchAnime;

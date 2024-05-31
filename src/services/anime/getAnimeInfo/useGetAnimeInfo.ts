import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { defaultVal } from './constant';
import type { AnimeInfoData, UseGetSearchInfoProps } from './types';

const useGetAnimeInfo = ({ id }: UseGetSearchInfoProps) => {
  const { isPending, data, isSuccess } = useQuery<AnimeInfoData>({
    queryKey: ['anime-details', id],
    queryFn: () =>
      fetch(
        `${import.meta.env.VITE_APP_BASE_API}/anime/gogoanime/info/${id}`
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

export default useGetAnimeInfo;

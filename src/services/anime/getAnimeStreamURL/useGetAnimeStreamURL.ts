import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { defaultVal } from './constant';
import type { AnimeStreamData } from './types';

interface UseGetAnimeStreamURLProps {
  id: string;
  server: string;
}

const useGetAnimeStreamURL = ({ id, server }: UseGetAnimeStreamURLProps) => {
  const { isPending, data, isSuccess } = useQuery<AnimeStreamData>({
    queryKey: ['anime-details', id],
    queryFn: () =>
      fetch(
        `${
          import.meta.env.VITE_APP_BASE_API
        }/anime/gogoanime/watch/${id}?server=${server}`
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

export default useGetAnimeStreamURL;

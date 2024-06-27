import { useMemo } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { defaultVal } from './constant';

const useGetBrowseAnime = () => {
  const fetchData = async ({ pageParam }: { pageParam: number }) => {
    return await fetch(
      `${
        import.meta.env.VITE_APP_BASE_API
      }/anime/gogoanime/top-airing?page=${pageParam}`
    ).then((res) => res.json());
  };

  const {
    data,
    // error,
    fetchNextPage,
    // hasNextPage,
    isSuccess,
    isFetching: isLoading,
    isFetchingNextPage,
    // status,
  } = useInfiniteQuery({
    queryKey: ['browse'],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (_, allPages) => allPages.length + 1,
  });

  const normalizer = useMemo(() => {
    if (!isSuccess) {
      return defaultVal;
    } else {
      return {
        ...defaultVal,
        pages: data.pages.map((item) => item.results).flat(),
      };
    }
  }, [data, isSuccess]);

  return useMemo(() => {
    return {
      isLoading,
      isFetchingNextPage,
      data: normalizer,
      isSuccess,
      fetchNextPage,
    };
  }, [fetchNextPage, isFetchingNextPage, isLoading, isSuccess, normalizer]);
};

export default useGetBrowseAnime;

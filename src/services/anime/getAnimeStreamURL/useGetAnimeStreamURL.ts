import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAnimeStreamURL } from '.';

interface UseGetAnimeStreamURLProps {
  id: string;
}

const useGetAnimeStreamURL = ({ id }: UseGetAnimeStreamURLProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const req = await getAnimeStreamURL({ episodeID: id });

      const response = await req.json();

      setIsLoading(false);

      if (req.status >= 200 && req.status < 300) {
        setData(response);
      } else {
        setData({});
      }
    } catch (error) {
      setData({});
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (typeof id === 'string') {
      fetchData();
    }
  }, [fetchData, id]);

  return useMemo(() => {
    return { data, isLoading };
  }, [data, isLoading]);
};

export default useGetAnimeStreamURL;

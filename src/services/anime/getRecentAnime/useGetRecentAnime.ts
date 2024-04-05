import { useCallback, useEffect, useMemo, useState } from 'react';
import { getRecentAnime } from '.';

const useGetRecentAnime = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    try {
      const req = await getRecentAnime();

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
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return useMemo(() => {
    return { data, isLoading };
  }, [data, isLoading]);
};

export default useGetRecentAnime;

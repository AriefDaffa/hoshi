import { useCallback, useEffect, useMemo, useState } from 'react';
import { getTopAnime } from '.';

const useGetTopAnime = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const req = await getTopAnime();

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

export default useGetTopAnime;

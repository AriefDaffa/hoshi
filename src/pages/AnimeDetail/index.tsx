import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { ChangeEvent, FC } from 'react';

import Layout from '@/components/Layout';
import useGetAnimeInfo from '@/services/anime/getAnimeInfo/useGetAnimeInfo';
import Loader from '@/components/Loader';

import AnimeDesc from './Section/AnimeDesc';
import AnimeEpisodeList from './Section/AnimeEpisodeList';

interface AnimeDetailProps {}

const AnimeDetail: FC<AnimeDetailProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sort, setSort] = useState('descend');
  const [episode, setEpisode] = useState('');

  const checkID = typeof id === 'string' ? id : '';

  const { data, isLoading } = useGetAnimeInfo({ id: checkID });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEpisode(e.target.value);
  };

  const handleSort = () => {
    if (sort === 'descend') {
      setSort('ascend');
    } else {
      setSort('descend');
    }
  };

  useEffect(() => {
    if (!isLoading && data.id === '') {
      navigate('/');
    }
  }, [data, isLoading, navigate]);

  return (
    <Layout>
      {!isLoading ? (
        <div className="w-full h-full mb-4 text-center px-2">
          <AnimeDesc {...data} />
          <AnimeEpisodeList
            {...data}
            id={checkID}
            sort={sort}
            episode={episode}
            onInputChange={onInputChange}
            handleSort={handleSort}
          />
        </div>
      ) : (
        <Loader />
      )}
    </Layout>
  );
};

export default AnimeDetail;

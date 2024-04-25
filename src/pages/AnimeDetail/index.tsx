import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import type { ChangeEvent, FC } from 'react';

import Layout from '@/components/Layout';
import useGetAnimeInfo from '@/services/anime/getAnimeInfo/useGetAnimeInfo';

import AnimeDetailBreadcrumb from './Section/AnimeDetailBreadcrumb';
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
      navigate('/search');
    }
  }, [data, isLoading, navigate]);

  return (
    <Layout>
      {!isLoading ? (
        <div className="w-full h-full mb-4 text-center px-2">
          <AnimeDetailBreadcrumb id={checkID} />
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight my-2 lg:text-5xl px-2 text-left">
            Anime Details
          </h1>
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
        <div className="w-full flex items-center justify-center">
          <AiOutlineLoading3Quarters size={46} className="animate-spin" />
        </div>
      )}
    </Layout>
  );
};

export default AnimeDetail;

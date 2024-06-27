import { useParams } from 'react-router-dom';
import { useMemo, type FC } from 'react';

import Layout from '@/components/Layout';

import useGetAnimeInfo from '@/services/anime/getAnimeInfo/useGetAnimeInfo';
import Background from '@/components/Background';
import PageLoader from '@/components/PageLoader';
import Poster from './Section/Poster';
import EpisodeList from './Section/EpisodeList';

interface AnimeDetailProps {}

const AnimeDetail: FC<AnimeDetailProps> = () => {
  const { id } = useParams();

  const checkID = typeof id === 'string' ? id : '';

  const { data, isLoading } = useGetAnimeInfo({ id: checkID });

  const parentLoading = useMemo(
    () => isLoading && data.id === '',
    [data.id, isLoading]
  );

  return (
    <div className="relative bg-black">
      <Background blurBG />
      <Layout>
        {parentLoading ? (
          <PageLoader />
        ) : (
          <div className="flex h-[calc(100vh-56px)] flex-col overflow-auto md:flex-row">
            <Poster {...data} />
            <EpisodeList {...data} />
          </div>
        )}
      </Layout>
    </div>
  );
};

export default AnimeDetail;

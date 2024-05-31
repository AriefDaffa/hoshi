import { useParams } from 'react-router-dom';
import { useMemo, type FC } from 'react';

import Layout from '@/components/Layout';

import TopSection from './Section/TopSection';
import EpisodeSection from './Section/EpisodeSection';
import useGetAnimeInfo from '@/services/anime/getAnimeInfo/useGetAnimeInfo';

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
    <Layout>
      <div className="size-full px-4 mb-16">
        <TopSection data={data} isLoading={parentLoading} />
        <div className="mb-2">
          <div className="text-2xl font-bold mb-2">Description</div>
          {parentLoading ? (
            <>
              <div className="w-full h-6 animate-pulse rounded-md mb-2 bg-slate-800" />
              <div className="w-full h-6 animate-pulse rounded-md mb-2 bg-slate-800" />
              <div className="w-full h-6 animate-pulse rounded-md mb-2 bg-slate-800" />
              <div className="w-full h-6 animate-pulse rounded-md mb-2 bg-slate-800" />
            </>
          ) : (
            <div className="text-justify overflow-auto ">
              {data.description}
            </div>
          )}
        </div>
        <EpisodeSection data={data} isLoading={isLoading} />
      </div>
    </Layout>
  );
};

export default AnimeDetail;

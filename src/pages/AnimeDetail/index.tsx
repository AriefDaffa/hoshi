import { useParams } from 'react-router-dom';
import { useMemo, type FC } from 'react';

import Layout from '@/components/Layout';

import { Badge } from '@/components/ui/badge';
import useGetAnimeInfo from '@/services/anime/getAnimeInfo/useGetAnimeInfo';
import useGetTopAnime from '@/services/anime/getTopAnime/useGetTopAnime';
import PageLoader from '@/components/PageLoader';
import PopularSection from './Section/PopularSection';
import EpisodeList from './Section/EpisodeList';

interface AnimeDetailProps {}

const AnimeDetail: FC<AnimeDetailProps> = () => {
  const { id } = useParams();

  const checkID = typeof id === 'string' ? id : '';

  const { data, isLoading } = useGetAnimeInfo({ id: checkID });
  const { data: topAnime } = useGetTopAnime();

  const parentLoading = useMemo(
    () => isLoading && data.id === '',
    [data.id, isLoading]
  );

  const status = data.status === 'Ongoing';

  return (
    <div className="relative bg-black">
      <Layout>
        {parentLoading ? (
          <PageLoader />
        ) : (
          <div className="min-h-screen px-4">
            <div className="space-y-8 flex gap-4 w-full flex-col items-center md:flex-row md:items-end">
              <div className="h-[26rem] overflow-hidden rounded-md md:w-[25%]">
                <img
                  src={data.image}
                  alt=""
                  className="size-full object-cover"
                />
              </div>
              <div className="space-y-2 text-center md:w-[75%] md:text-left">
                <div className="text-muted-foreground">
                  {data.genres.join(', ')}
                </div>
                <div className="text-4xl font-semibold md:text-5xl">
                  {data.title}
                </div>
                <div className="text-muted-foreground">{data.otherName}</div>
                <Badge
                  className={`${
                    status ? 'bg-yellow-500' : 'bg-green-500'
                  } text-sm`}
                >
                  {data.status}
                </Badge>
              </div>
            </div>
            <div className="pt-8">
              <div className="text-xl font-semibold underline underline-offset-2">
                Summary
              </div>
              <div className="text-justify pt-4">{data.description}</div>
            </div>
            <div className="flex gap-8 py-8 flex-col md:flex-row">
              <EpisodeList {...data} />
              <PopularSection {...topAnime} />
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
};

export default AnimeDetail;

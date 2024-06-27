import type { FC } from 'react';

import type { AnimeTopResults } from '@/services/anime/getTopAnime/types';

import TrendingSkeleton from './TrendingSkeleton';
import TrendingItem from './TrendingItem';

interface TrendingAnimeProps {
  isLoading: boolean;
  data: AnimeTopResults[];
}

const TrendingAnime: FC<TrendingAnimeProps> = ({ data, isLoading }) => {
  return (
    <div className="size-full pt-20 px-4">
      <div>
        <div className="text-muted-foreground">
          Currently popular this season
        </div>
        <div className="text-5xl font-bold">Trending Anime</div>
      </div>
      <div className="flex flex-col gap-4 pt-4 h-[250px] flex-wrap overflow-x-auto">
        {isLoading || data?.length === 0 ? (
          <TrendingSkeleton />
        ) : (
          data?.map((item, idx) => <TrendingItem key={idx} {...item} />)
        )}
      </div>
    </div>
  );
};

export default TrendingAnime;

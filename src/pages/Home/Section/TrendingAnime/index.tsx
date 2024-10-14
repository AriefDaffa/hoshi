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
    <div className="px-4 pt-20 size-full">
      <div>
        <div className="text-muted-foreground">
          Currently popular this season
        </div>
        <div className="text-5xl font-bold">Trending Anime</div>
      </div>
      <div className="flex gap-4 py-4 overflow-x-auto">
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

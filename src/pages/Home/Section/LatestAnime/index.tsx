import type { FC } from 'react';

import { AnimeRecentResults } from '@/services/anime/getRecentAnime/types';
import LatestSkeleton from './LatestSkeleton';
import LatestItem from './LatestItem';

interface LatestAnimeProps {
  isLoading: boolean;
  data: AnimeRecentResults[];
}

const LatestAnime: FC<LatestAnimeProps> = ({ data, isLoading }) => {
  return (
    <div className="px-4 mb-4 pt-16">
      <div>
        <div className="text-muted-foreground">
          Check out the latest updated Anime!
        </div>
        <div className="text-5xl font-bold">Latest Update</div>
      </div>
      <div className="flex flex-col pt-4 h-[280px] flex-wrap overflow-x-auto">
        {isLoading || data.length === 0 ? (
          <LatestSkeleton />
        ) : (
          data?.map((item, idx) => <LatestItem key={idx} {...item} />)
        )}
      </div>
    </div>
  );
};

export default LatestAnime;

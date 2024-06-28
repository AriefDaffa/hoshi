import type { FC } from 'react';

import type { AnimeRecentResults } from '@/services/anime/getRecentAnime/types';

import BrowseSkeleton from './BrowseSkeleton';
import BrowseItem from './BrowseItem';
import { Button } from '@/components/ui/button';

interface BrowseAnimeProps {
  isLoading: boolean;
  isFetchingNextPage: boolean;
  data: AnimeRecentResults[];
  handleNextBrowse: () => void;
}

const BrowseAnime: FC<BrowseAnimeProps> = ({
  data,
  isFetchingNextPage,
  handleNextBrowse,
}) => {
  return (
    <div className="px-2 mb-4 pt-24">
      <div>
        <div className="text-muted-foreground">Find your own favorite</div>
        <div className="text-5xl font-bold">Browse Anime</div>
      </div>
      {data.length === 0 ? (
        <BrowseSkeleton />
      ) : (
        <div className="grid gap-4 pt-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data.map((item, idx) => (
            <BrowseItem key={idx} {...item} />
          ))}
        </div>
      )}
      <div className="w-full flex justify-center pt-12 pb-40">
        <Button
          className="w-full max-w-96"
          onClick={() => handleNextBrowse()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Fetching...' : 'Load More'}
        </Button>
      </div>
    </div>
  );
};

export default BrowseAnime;

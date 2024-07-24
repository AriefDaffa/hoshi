import { FaSearch } from 'react-icons/fa';
import type { FC } from 'react';

import { Button } from '@/components/ui/button';
import { AnimeRecentResults } from '@/services/anime/getRecentAnime/types';
import LatestSkeleton from './LatestSkeleton';
import LatestItem from './LatestItem';

interface LatestAnimeProps {
  isLoading: boolean;
  isFetchingNextPage: boolean;
  data: AnimeRecentResults[];
  handleNextBrowse: () => void;
}

const LatestAnime: FC<LatestAnimeProps> = ({
  data,
  isLoading,
  handleNextBrowse,
  isFetchingNextPage,
}) => {
  return (
    <div className="px-4 mb-4 pt-24">
      <div>
        <div className="text-muted-foreground">
          Check out the latest updated Anime!
        </div>
        <div className="text-5xl font-bold">Latest Update</div>
      </div>
      {/* <div className="flex flex-col pt-4 h-[280px] flex-wrap overflow-x-auto"> */}
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 pt-4 lg:w-[70%] md:grid md:grid-cols-2">
          {isLoading ? (
            <LatestSkeleton />
          ) : (
            data?.map((item, idx) => <LatestItem key={idx} {...item} />)
          )}
          <Button
            className="col-span-2"
            disabled={isFetchingNextPage}
            onClick={() => handleNextBrowse()}
          >
            Load More
          </Button>
        </div>
        <div className="relative w-[30%] min-h-max hidden lg:block">
          <div className="sticky top-[10vh] w-full p-16 rounded-md flex flex-col justify-center items-center text-center gap-4 bg-primary">
            <FaSearch size="44" />
            <div>Don't know what to watch?</div>
            <Button variant="secondary">Randomize</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestAnime;

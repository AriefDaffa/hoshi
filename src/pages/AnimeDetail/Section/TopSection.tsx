import type { FC } from 'react';

import { Separator } from '@/components/ui/separator';
import type { AnimeInfoData } from '@/services/anime/getAnimeInfo/types';

interface TopSectionProps {
  isLoading: boolean;
  data: AnimeInfoData;
}

const TopSection: FC<TopSectionProps> = ({ data, isLoading }) => {
  return (
    <div className="size-full flex flex-col-reverse gap-4 items-end mb-4 sm:flex-row-reverse">
      <div className="sm:w-2/3">
        <div className="mb-2">
          {isLoading ? (
            <div className="w-1/2 h-6 mt-2 rounded-md animate-pulse bg-slate-800" />
          ) : (
            <div className="text-muted-foreground">
              {data.otherName.split(/\r?\n/)[1]}
            </div>
          )}
          {isLoading ? (
            <div className="w-full h-8 mt-2 rounded-md animate-pulse bg-slate-800" />
          ) : (
            <div className="text-xl font-bold line-clamp-2 mt-2 lg:text-5xl">
              {data.title}
            </div>
          )}
        </div>
        <div className="flex gap-4 mt-6">
          <div className="">
            <div className="text-lg font-semibold">{data.totalEpisodes}</div>
            <div className="text-sm text-muted-foreground">Total Episodes</div>
          </div>
          <Separator orientation="vertical" className="h-10" />
          <div className="">
            <div className="text-lg font-semibold">{data.releaseDate}</div>
            <div className="text-sm text-muted-foreground">Release Date</div>
          </div>
          <Separator orientation="vertical" className="h-10" />
          <div className="">
            <div className="text-lg font-semibold">{data.status}</div>
            <div className="text-sm text-muted-foreground">Status</div>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className=" h-[35rem] bg-slate-800 rounded-md animate-pulse sm:w-1/3" />
      ) : (
        <div className="rounded-md overflow-hidden h-[35rem] sm:w-1/3">
          <img src={data.image} alt="" className="size-full object-cover" />
        </div>
      )}
    </div>
  );
};

export default TopSection;

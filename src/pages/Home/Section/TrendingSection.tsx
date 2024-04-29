import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import type { AnimeTopData } from '@/services/anime/getTopAnime/types';
import { Badge } from '@/components/ui/badge';

interface TrendingSectionProps {
  isLoading: boolean;
  data: AnimeTopData;
}

const TrendingSection: FC<TrendingSectionProps> = ({ data, isLoading }) => {
  const navigate = useNavigate();
  return (
    <div className="px-2">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
        Trending Anime
      </h3>
      <div className="w-full h-full min-h-[75vh] flex gap-2">
        <div className="w-full grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-2">
          {isLoading
            ? Array.from(Array(10), (_, i) => (
                <div
                  key={i}
                  className="flex gap-2 items-end p-2 border rounded-lg"
                >
                  <div className="w-36 h-40 border bg-slate-800 animate-pulse rounded-lg"></div>
                  <div className="w-full flex flex-col gap-2">
                    <div className="h-[28px] w-full bg-slate-800 rounded-lg animate-pulse"></div>
                    <div className="h-[20px] w-full bg-slate-800 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              ))
            : data.results.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-2 items-end p-2 border rounded-lg cursor-pointer relative hover:bg-black"
                  onClick={() => navigate(`/search/${item.id}`)}
                >
                  <div className="absolute top-2 right-2 bg-red-600 rounded-lg w-10 h-10 flex items-center justify-center font-bold">
                    #{idx + 1}
                  </div>
                  <div className="w-36 h-full">
                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="w-full">
                    <div className="flex gap-2">
                      <Badge className="bg-primary-blue text-black font-semibold">
                        Current Episode: {item.episodeNumber}
                      </Badge>
                    </div>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Genres: {item.genres.join(', ')}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;

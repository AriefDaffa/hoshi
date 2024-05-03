import { useParams } from 'react-router-dom';
import { useFullscreen } from '@mantine/hooks';
import type { FC } from 'react';

import type { Episodes } from '@/services/anime/getAnimeInfo/types';
import { Badge } from '@/components/ui/badge';

interface EpisodeListProps {
  currentEps: string;
  isLoading: boolean;
  isError: boolean;
  isWide: boolean;
  episodes: Episodes[];
}

const EpisodeList: FC<EpisodeListProps> = ({
  currentEps,
  episodes,
  isLoading,
  isError,
  isWide,
}) => {
  const { slug } = useParams();
  const { fullscreen: isFullScreen } = useFullscreen();

  const handleOnEpsClick = (id: string) => {
    window.location.href = `/watch/${slug}/${id}`;
  };

  return (
    <div
      className={`w-full px-2 ${
        isFullScreen ? '' : `${isWide ? 'lg:w-full' : 'lg:w-1/3'}`
      } `}
    >
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-4 mb-2">
        List Episode
      </h4>
      <div
        className={`grid grid-cols-2 gap-2 mb-2 sm:grid-cols-3 md:grid-cols-5 ${
          isFullScreen ? '' : 'lg:grid-cols-3'
        } `}
      >
        {!isLoading && !isError ? (
          episodes.map((item, idx) => (
            <div
              className={`w-full h-44 rounded-md flex items-center justify-center bg-black relative hover:bg-white hover:text-black ${
                String(item.number) === currentEps
                  ? 'bg-white text-black cursor-default'
                  : 'cursor-pointer'
              }`}
              key={idx}
              onClick={
                String(item.number) === currentEps
                  ? () => {}
                  : () => handleOnEpsClick(item.id)
              }
            >
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {item.number}
              </h1>
              {String(item.number) === currentEps && (
                <Badge className="text-white absolute flex self-center bottom-4 w-min">
                  Watching
                </Badge>
              )}
            </div>
          ))
        ) : (
          <>
            <div className="w-full h-44 bg-slate-800 animate-pulse rounded-md"></div>
            <div className="w-full h-44 bg-slate-800 animate-pulse rounded-md"></div>
            <div className="w-full h-44 bg-slate-800 animate-pulse rounded-md"></div>
            <div className="w-full h-44 bg-slate-800 animate-pulse rounded-md"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default EpisodeList;

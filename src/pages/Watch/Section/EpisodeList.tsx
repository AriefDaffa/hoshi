import { useParams } from 'react-router-dom';
import { useFullscreen } from '@mantine/hooks';
import type { FC } from 'react';

import type { Episodes } from '@/services/anime/getAnimeInfo/types';
import { Badge } from '@/components/ui/badge';

interface EpisodeListProps {
  currentEps: string;
  isLoading: boolean;
  isError: boolean;
  episodes: Episodes[];
}

const EpisodeList: FC<EpisodeListProps> = ({
  currentEps,
  episodes,
  isLoading,
  isError,
}) => {
  const { slug } = useParams();
  const { fullscreen: isFullScreen } = useFullscreen();

  const handleOnEpsClick = (id: string) => {
    window.location.href = `/watch/${slug}/${id}`;
  };

  return (
    <div className={`w-full px-2 ${isFullScreen ? '' : 'lg:w-1/3'} `}>
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

{
  /* <SheetContent>
<SheetHeader>
  <SheetTitle>Episode Lists</SheetTitle>
  <SheetDescription>Choose episode below</SheetDescription>
</SheetHeader>
<ScrollArea className="mt-2 h-[92vh]">
  {episodes.map((item, idx) => (
    <div
      key={idx}
      onClick={
        currentEps === String(item.number)
          ? () => {}
          : () => (window.location.href = `/watch/${slug}/${item.id}`)
      }
      className={`px-3 py-4 my-2 cursor-pointer ${
        currentEps === String(item.number) && 'bg-primary'
      } hover:bg-primary rounded-md`}
    >
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight flex items-center gap-2">
        Episode {item.number}{' '}
        {currentEps === String(item.number) && (
          <Badge variant="secondary">Curently watching</Badge>
        )}
      </h3>
    </div>
  ))}
</ScrollArea>
</SheetContent> */
}

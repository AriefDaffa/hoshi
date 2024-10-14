import type { FC } from 'react';
import CWItem from './CWItem';
import { useVideoStore } from '@/store/videoStore';

interface ContinueWatchingProps {}

const ContinueWatching: FC<ContinueWatchingProps> = () => {
  const { episode } = useVideoStore();

  return episode.length > 0 ? (
    <div className="px-4 pt-12 mb-4">
      <div>
        <div className="text-muted-foreground">
          Resume watching where you left off
        </div>
        <div className="text-5xl font-bold">Continue Watching</div>
      </div>
      <div className="flex gap-4 py-4 overflow-x-auto">
        {episode.map((item, key) => (
          <CWItem
            key={key}
            image={item?.imgSrc}
            title={item?.title}
            episode={item?.episode}
            path={item?.path}
            progress={item?.timeStamp}
          />
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ContinueWatching;

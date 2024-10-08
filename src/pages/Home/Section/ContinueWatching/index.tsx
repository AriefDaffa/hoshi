import { useEffect, useState, type FC } from 'react';
import CWItem from './CWItem';

interface ContinueWatchingProps {}

interface Data {
  imgSrc: string;
  path: string;
  timeStamp: number;
  duration: number;
  title: string;
  episode: string;
}

const ContinueWatching: FC<ContinueWatchingProps> = () => {
  const [lastWatchData, setLastWatchData] = useState<Data[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('hoshi-bkmrk');

    if (data) {
      const parsedData = JSON.parse(data);

      if (Array.isArray(parsedData)) {
        setLastWatchData(parsedData);
      }
    }
  }, []);

  console.log(lastWatchData);

  return lastWatchData.length > 0 ? (
    <div className="px-4 pt-12 mb-4">
      <div>
        <div className="text-muted-foreground">
          Resume watching where you left off
        </div>
        <div className="text-5xl font-bold">Continue Watching</div>
      </div>
      <div className="flex gap-4 pt-4 h-[250px] overflow-x-auto">
        {lastWatchData.map((item, key) => (
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

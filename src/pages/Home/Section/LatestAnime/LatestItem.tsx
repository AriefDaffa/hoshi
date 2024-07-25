import { useNavigate } from 'react-router-dom';
import { useMemo, useState } from 'react';
import type { FC } from 'react';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import type { AnimeRecentResults } from '@/services/anime/getRecentAnime/types';

interface LatestItemProps extends AnimeRecentResults {}

const LatestItem: FC<LatestItemProps> = ({
  id,
  episodeId,
  image,
  episodeNumber,
  title,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setOnHover] = useState(false);
  const navigate = useNavigate();

  const handleOnMouseHover = () => {
    setOnHover(true);
  };

  const handleOnMouseLeave = () => {
    setOnHover(false);
  };

  const getMinusOneID = useMemo(() => {
    const tempEpsIDArr = episodeId.split('-');
    tempEpsIDArr.pop();
    tempEpsIDArr.push(String(episodeNumber - 1));

    return tempEpsIDArr.join('-');
  }, [episodeId, episodeNumber]);

  return (
    <div
      className="flex items-end gap-4 pt-2 pb-6 border-b-[1px]"
      onMouseEnter={handleOnMouseHover}
      onMouseLeave={handleOnMouseLeave}
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt=""
          className="w-28 h-40 object-cover cursor-pointer hover:scale-110 hover:brightness-50"
          onClick={() => navigate(`/detail/${id}`)}
        />
      </div>
      <div className="size-full flex flex-1 ">
        <div className="space-y-2 size-full">
          <div className="text-lg pr-2 h-1/2 flex items-end">
            <div
              className="line-clamp-3 cursor-pointer hover:brightness-50"
              onClick={() => navigate(`/detail/${id}`)}
            >
              {title}
            </div>
          </div>
          <Separator className="w-1/6" />
          <div className="text-xs h-1/2 pt-1 space-y-2">
            <div
              className="flex justify-between cursor-pointer hover:brightness-50"
              onClick={() => navigate(`/watch/${id}/${episodeId}`)}
            >
              Episode {episodeNumber} <Badge className="bg-red-600">New</Badge>
            </div>
            {episodeNumber !== 1 && (
              <div
                className="cursor-pointer hover:brightness-50"
                onClick={() => navigate(`/watch/${id}/${getMinusOneID}`)}
              >
                Episode {episodeNumber - 1}
              </div>
            )}
          </div>
          {/* <Button className="flex gap-4 items-center float-right bg-red-700">
            Play
            <FaPlay />
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default LatestItem;

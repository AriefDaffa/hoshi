import { useNavigate } from 'react-router-dom';
import { type FC } from 'react';

import type { AnimeRecentResults } from '@/services/anime/getRecentAnime/types';

interface LatestItemProps extends AnimeRecentResults {}

const LatestItem: FC<LatestItemProps> = ({
  id,
  episodeId,
  image,
  episodeNumber,
  title,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center gap-2  h-[80px] cursor-pointer hover:brightness-75 sm:w-1/3"
      onClick={() => navigate(`/watch/${id}/${episodeId}`)}
    >
      <div className="w-16 h-16 rounded-md overflow-hidden">
        <img src={image} alt="" className="w-16 h-16 object-cover" />
      </div>
      <div className="w-full flex justify-between items-center">
        <div>
          <div className="text-sm text-muted-foreground">
            Episode {episodeNumber}
          </div>
          <div className="line-clamp-1 pr-2">{title}</div>
        </div>
        {/* <div className={`${onHover ? 'block' : 'hidden'} pr-2`}>
          <FaCirclePlay size={32} />
        </div> */}
      </div>
    </div>
  );
};

export default LatestItem;

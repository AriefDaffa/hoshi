import { FaPlay } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import type { AnimeInfoData } from '@/services/anime/getAnimeInfo/types';

interface EpisodeListProps extends AnimeInfoData {}

const EpisodeList: FC<EpisodeListProps> = ({ episodes, image, id }) => {
  const navigate = useNavigate();

  return (
    <div className="size-full px-4 flex ">
      <div className=" pr-8 w-full m-auto">
        {episodes.map((item, idx) => (
          <div
            key={idx}
            className="flex gap-2 items-center mb-2 p-2 cursor-pointer rounded-md hover:backdrop-blur-3xl"
            onClick={() => navigate(`/watch/${id}/${item.id}`)}
          >
            <div>
              <img
                src={image}
                alt=""
                className="w-14 h-14 rounded-sm object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="text-xs text-muted-foreground line-clamp-1">
                {item.id.split('-').join(' ')}
              </div>
              <div>Episode {item.number}</div>
            </div>
            <div>
              <FaPlay />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodeList;

import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import type { AnimeInfoData } from '@/services/anime/getAnimeInfo/types';

interface EpisodeListProps extends AnimeInfoData {}

const EpisodeList: FC<EpisodeListProps> = ({ episodes, id }) => {
  const navigate = useNavigate();

  return (
    <div className="md:w-[70%]">
      <div className="text-xl font-semibold underline underline-offset-2">
        Episodes
      </div>
      <div className="grid grid-cols-2 gap-4 pt-8">
        {episodes.map((item, idx) => (
          <div
            key={idx}
            className="border-b-[1px] pb-4 cursor-pointer hover:brightness-75"
            onClick={() => navigate(`/watch/${id}/${item.id}`)}
          >
            Episode {item.number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EpisodeList;

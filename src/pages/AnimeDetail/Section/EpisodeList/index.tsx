import { useNavigate } from 'react-router-dom';
import { TbArrowsSort } from 'react-icons/tb';
import { useState, type FC } from 'react';

import { Badge } from '@/components/ui/badge';
import type { AnimeInfoData } from '@/services/anime/getAnimeInfo/types';

interface EpisodeListProps extends AnimeInfoData {}

const EpisodeList: FC<EpisodeListProps> = ({ episodes, id }) => {
  const [sort, setSort] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="md:w-[70%]">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold underline underline-offset-2">
          Episodes
        </div>
        <div className="cursor-pointer" onClick={() => setSort(!sort)}>
          <TbArrowsSort size={24} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-8">
        {episodes
          .sort((a, b) => (sort ? a.number - b.number : b.number - a.number))
          .map((item, idx) => (
            <div
              key={idx}
              className="border-b-[1px] pb-4 cursor-pointer flex gap-2 hover:brightness-75"
              onClick={() => navigate(`/watch/${id}/${item.id}`)}
            >
              <div>Episode {item.number}</div>
              {(sort ? idx === episodes.length - 1 : idx === 0) && (
                <Badge className="bg-red-600">New</Badge>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default EpisodeList;

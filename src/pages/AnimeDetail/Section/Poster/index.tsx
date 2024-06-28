import type { FC } from 'react';

import { Badge } from '@/components/ui/badge';
import type { AnimeInfoData } from '@/services/anime/getAnimeInfo/types';

interface PosterProps extends AnimeInfoData {}

const Poster: FC<PosterProps> = ({
  status,
  title,
  genres,
  image,
  totalEpisodes,
  otherName,
}) => {
  return (
    <div className="w-full flex top-0 md:sticky ">
      <div className="m-auto flex flex-col items-center gap-4">
        <Badge
          className={`text-sm text-muted-foreground text-white ${
            status === 'Ongoing' ? 'bg-yellow-500' : 'bg-green-600 '
          }`}
        >
          {status}
        </Badge>
        <div className="max-w-96 text-sm text-muted-foreground text-center">
          {genres.join(', ')}
        </div>
        <img src={image} alt="" className="w-60 rounded-md" />
        <div className="max-w-96 text-center">
          <div className="text-3xl  font-semibold">{title}</div>
          <div className="max-w-96 text-sm text-muted-foreground text-center">
            {otherName}
          </div>
          <div className="text-sm text-muted-foreground">
            {totalEpisodes} Episodes
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poster;

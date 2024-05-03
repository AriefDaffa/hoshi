import type { FC } from 'react';

import { Badge } from '@/components/ui/badge';
import type { AnimeInfoData } from '@/services/anime/getAnimeInfo/types';

interface AnimeDescProps extends AnimeInfoData {}

const AnimeDesc: FC<AnimeDescProps> = ({
  image,
  subOrDub,
  title,
  description,
  genres,
  releaseDate,
  status,
}) => {
  return (
    <div className="flex flex-col gap-4 items-end w-full mt-4 lg:flex-row">
      <div className="h-full w-full rounded-md lg:w-2/4">
        <img
          src={image}
          alt=""
          className="h-[80vh] max-h-[700px] w-full object-cover rounded-md"
        />
      </div>
      <div className="h-full w-full text-left">
        {(subOrDub === 'sub' || subOrDub === 'dub') && (
          <Badge
            className={`${
              subOrDub === 'sub' ? 'bg-red-500' : 'bg-bluePrimary'
            }`}
          >
            {subOrDub === 'sub' ? 'Subtitle' : 'Dubbing'}
          </Badge>
        )}
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight my-2 lg:text-4xl">
          {title}
        </h1>
        <div className="flex gap-2 flex-wrap">
          {genres.map((item, idx) => (
            <Badge key={idx}>{item}</Badge>
          ))}
        </div>
        <div className="mt-4">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Description
          </h4>
          <p className="leading-7 text-justify">{description}</p>
        </div>
        <div className="flex mt-4">
          <div className="w-full">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Release Date
            </h4>
            <p className="leading-7 text-justify">{releaseDate}</p>
          </div>
          <div className="w-full">
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Status
            </h4>
            <Badge
              className={`${
                status === 'Ongoing' ? 'bg-yellow-300' : 'bg-green-500'
              }  text-black my-1`}
            >
              {status}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDesc;

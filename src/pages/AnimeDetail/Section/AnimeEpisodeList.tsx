import { FaSortAmountUp, FaSortAmountDown } from 'react-icons/fa';
import type { ChangeEvent, FC } from 'react';

import { Input } from '@/components/ui/input';
import type { AnimeInfoData } from '@/services/anime/getAnimeInfo/types';

interface AnimeEpisodeListProps extends AnimeInfoData {
  id: string;
  episode: string;
  sort: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSort: () => void;
}

const AnimeEpisodeList: FC<AnimeEpisodeListProps> = ({
  id = '',
  sort,
  onInputChange,
  episodes,
  episode,
  handleSort,
}) => {
  const handleNavigate = (movieID: string) => {
    // use window location to navigate to force render player component
    window.location.href = `/watch/${id}/${movieID}`;
  };

  return (
    <div className="mt-10 text-left">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-left">
        Episode List
      </h4>
      <div className="mt-2 flex gap-2">
        <div className="w-full">
          <Input
            placeholder="Go To Episode"
            className="h-12"
            type="number"
            onChange={onInputChange}
          />
        </div>
        <div
          onClick={handleSort}
          className="w-fit border rounded-md p-4 flex items-center cursor-pointer hover:bg-primary"
        >
          {sort === 'descend' ? <FaSortAmountUp /> : <FaSortAmountDown />}
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
        {episodes
          .sort((a, b) =>
            sort === 'descend' ? a.number - b.number : b.number - a.number
          )
          .filter((item) => {
            if (episode === '') {
              return item;
            }

            return item.number.toString().includes(episode);
          })
          .map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleNavigate(item.id)}
              className="h-64 bg-primary flex items-center justify-center rounded-lg cursor-pointer relative hover:bg-white hover:text-black"
            >
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {item.number}
              </h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AnimeEpisodeList;

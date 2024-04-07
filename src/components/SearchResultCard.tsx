import { useHover } from '@mantine/hooks';
import type { FC } from 'react';

import { Badge } from './ui/badge';

interface SearchResultCardProps {
  imageURL: string;
  cardTitle: string;
  releaseDate: string;
  badgeType: string;
  onClick: () => void;
}

const SearchResultCard: FC<SearchResultCardProps> = ({
  badgeType,
  cardTitle,
  imageURL,
  releaseDate,
  onClick,
}) => {
  const { hovered, ref } = useHover();

  return (
    <div
      ref={ref}
      className="flex gap-3 mt-4 cursor-pointer hover:bg-white p-2 rounded-md"
      onClick={onClick}
    >
      <img
        src={imageURL}
        alt=""
        className="w-24 h-36 object-cover rounded-md"
      />
      <div className="text-left flex items-end">
        <div>
          {(badgeType === 'sub' || badgeType === 'dub') && (
            <Badge
              className={`${
                badgeType === 'sub' ? 'bg-red-500' : 'bg-bluePrimary'
              }`}
            >
              {badgeType === 'sub' ? 'Subtitle' : 'Dubbing'}
            </Badge>
          )}
          <p className={`leading-7 mt-1 font-bold ${hovered && 'text-black'}`}>
            {cardTitle}
          </p>
          <p className="leading-7 text-muted-foreground">{releaseDate}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;

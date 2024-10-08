import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface CWItemProps {
  image: string;
  title: string;
  episode: string;
  path: string;
  progress: number;
}

const CWItem: FC<CWItemProps> = ({ image, title, episode, path, progress }) => {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer min-w-80"
      onClick={() => navigate(`${path}`)}
    >
      <div className="relative flex items-end w-full overflow-hidden border rounded-md h-44 hover:brightness-50">
        <div
          className="absolute bottom-0 h-[0.30rem] bg-red-600"
          style={{ width: `${progress * 100}%` }}
        ></div>
        <img
          src={image}
          alt=""
          className="object-cover w-full rounded-md h-44"
        />
      </div>
      <div className="mt-2">
        <div className="text-xs line-clamp-1 text-muted-foreground">
          Episode {episode}
        </div>
        <div className="text-sm line-clamp-1">{title}</div>
      </div>
    </div>
  );
};

export default CWItem;

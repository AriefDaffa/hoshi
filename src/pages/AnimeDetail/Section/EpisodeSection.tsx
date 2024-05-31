import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import { AnimeInfoData } from '@/services/anime/getAnimeInfo/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface EpisodeSectionProps {
  isLoading: boolean;
  data: AnimeInfoData;
}

const EpisodeSection: FC<EpisodeSectionProps> = ({ data, isLoading }) => {
  const navigate = useNavigate();

  console.log(isLoading);

  return (
    <div className="">
      <div className="text-2xl font-bold my-4">Episode List</div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">No.</TableHead>
            {/* <TableHead>Status</TableHead> */}
            <TableHead>Episode</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.episodes.map((item, idx) => (
            <TableRow
              key={idx}
              className="cursor-pointer"
              onClick={() => navigate(`/watch/${data.id}/${item.id}`)}
            >
              <TableCell>{idx + 1}</TableCell>
              {/* <TableCell>Not Watched</TableCell> */}
              <TableCell>Episode {item.number}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EpisodeSection;

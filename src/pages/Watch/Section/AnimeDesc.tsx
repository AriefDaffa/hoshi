import type { FC } from 'react';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import type { AnimeInfoData } from '@/services/anime/getAnimeInfo/types';
import { Badge } from '@/components/ui/badge';

interface AnimeDescProps extends AnimeInfoData {
  currentEps: string;
  isLoading: boolean;
  isError: boolean;
}

const AnimeDesc: FC<AnimeDescProps> = ({
  title,
  description,
  genres,
  releaseDate,
  status,
  totalEpisodes,
  currentEps,
  isLoading,
  isError,
}) => {
  return (
    <div className="p-2 w-full">
      {!isLoading && !isError ? (
        <>
          <Badge className="bg-red-600">Episode {currentEps}</Badge>
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight my-1 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="leading-6 text-justify line-clamp-6 text-sm">
            {description}
          </p>
          <Table className="my-2">
            <TableBody>
              <TableRow>
                <TableCell>Release Date</TableCell>
                <TableCell className="text-right">{releaseDate}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Status</TableCell>
                <TableCell className="text-right">{status}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Total Episode</TableCell>
                <TableCell className="text-right">{totalEpisodes}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Genres</TableCell>
                <TableCell className="text-right w-[200px]">
                  {genres.join(', ')}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </>
      ) : (
        <div className="w-full">
          <div className="w-full h-[48px] bg-slate-800 rounded-lg animate-pulse"></div>
          <div className="flex flex-col gap-2 mt-4">
            <div className="w-full h-[24px] bg-slate-800 rounded-lg animate-pulse"></div>
            <div className="w-full h-[24px] bg-slate-800 rounded-lg animate-pulse"></div>
            <div className="w-full h-[24px] bg-slate-800 rounded-lg animate-pulse"></div>
            <div className="w-full h-[24px] bg-slate-800 rounded-lg animate-pulse"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeDesc;

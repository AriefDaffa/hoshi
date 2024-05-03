import type { GetAnimeStreamURLProps } from './types';

export const getAnimeStreamURL = async ({
  episodeID,
  server,
}: GetAnimeStreamURLProps) => {
  return await fetch(
    `${
      import.meta.env.VITE_APP_BASE_API
    }/anime/gogoanime/watch/${episodeID}?server=${server}`
  );
};

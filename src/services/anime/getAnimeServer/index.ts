import type { GetAnimeServerURLProps } from './types';

export const getAnimeStreamURL = async ({
  episodeID,
}: GetAnimeServerURLProps) => {
  return await fetch(
    `${import.meta.env.VITE_APP_BASE_API}/anime/gogoanime/servers/${episodeID}`
  );
};

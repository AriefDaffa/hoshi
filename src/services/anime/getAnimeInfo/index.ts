import type { GetSearchInfoProps } from './types';

export const getAnimeInfo = async ({ id }: GetSearchInfoProps) => {
  return await fetch(
    `${import.meta.env.VITE_APP_BASE_API}/anime/gogoanime/info/${id}`
  );
};

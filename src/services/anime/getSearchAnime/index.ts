import { GetSearchAnimeProps } from './types';

export const getSearchAnime = async ({ keyword }: GetSearchAnimeProps) => {
  return await fetch(
    `${import.meta.env.VITE_APP_BASE_API}/anime/gogoanime/${keyword}`
  );
};

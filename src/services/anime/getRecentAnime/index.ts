export const getRecentAnime = async () => {
  return await fetch(
    `${import.meta.env.VITE_APP_BASE_API}/anime/gogoanime/recent-episodes`
  );
};

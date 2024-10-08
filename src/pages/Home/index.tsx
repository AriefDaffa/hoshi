import type { FC } from 'react';

import Layout from '@/components/Layout';
import Background from '@/components/Background';

import useGetTopAnime from '@/services/anime/getTopAnime/useGetTopAnime';
import useGetRecentAnime from '@/services/anime/getRecentAnime/useGetRecentAnime';
import TrendingAnime from './Section/TrendingAnime';
import LatestAnime from './Section/LatestAnime';
import ContinueWatching from './Section/ContinueWatching';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const { data: topAnime, isLoading: isTopAnimeLoading } = useGetTopAnime();
  const {
    data: recentAnime,
    isLoading: isRecentAnimeLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = useGetRecentAnime();

  return (
    <div className="relative bg-black">
      <Background
        bgURL={
          topAnime.results[Math.floor(Math.random() * (9 - 0 + 1) + 0)]?.image
        }
      />
      <Layout>
        <TrendingAnime data={topAnime.results} isLoading={isTopAnimeLoading} />
        <ContinueWatching />
        <LatestAnime
          data={recentAnime.results}
          isLoading={isRecentAnimeLoading}
          isFetchingNextPage={isFetchingNextPage}
          handleNextBrowse={fetchNextPage}
        />
      </Layout>
    </div>
  );
};

export default Home;

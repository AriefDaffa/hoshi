import type { FC } from 'react';

import Layout from '@/components/Layout';

import useGetTopAnime from '@/services/anime/getTopAnime/useGetTopAnime';
import useGetRecentAnime from '@/services/anime/getRecentAnime/useGetRecentAnime';
import TrendingAnime from './Section/TrendingAnime';
import BrowseAnime from './Section/BrowseAnime';
import LatestAnime from './Section/LatestAnime';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const { data: topAnime, isLoading: isTopAnimeLoading } = useGetTopAnime();
  const { data: recentAnime, isLoading: isRecentAnimeLoading } =
    useGetRecentAnime();

  return (
    <div className="relative bg-black">
      <div className="absolute h-screen w-full top-0 z-20">
        <img src="/assets/images/gradient.png" alt="" className="size-full" />
      </div>
      <div className="absolute h-screen w-full object-cover top-0 z-10">
        <img
          src="/assets/images/firefly.jpeg"
          alt=""
          className="size-full object-cover"
        />
      </div>
      <Layout>
        <TrendingAnime data={topAnime.results} isLoading={isTopAnimeLoading} />
        <LatestAnime
          data={recentAnime.results}
          isLoading={isRecentAnimeLoading}
        />
        <BrowseAnime
          data={recentAnime.results}
          isLoading={isRecentAnimeLoading}
        />
      </Layout>
    </div>
  );
};

export default Home;

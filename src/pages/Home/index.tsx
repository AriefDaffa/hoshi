import type { FC } from 'react';

import Layout from '@/components/Layout';

import TrendingSection from './Section/TrendingSection';
import LatestSection from './Section/LatestSection';
import ThisSeasonSection from './Section/ThisSeasonSection';
import useGetTopAnime from '@/services/anime/getTopAnime/useGetTopAnime';
import useGetRecentAnime from '@/services/anime/getRecentAnime/useGetRecentAnime';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const { data: topAnime, isLoading: isTopAnimeLoading } = useGetTopAnime();
  const { data: recentAnime, isLoading: isRecentAnimeLoading } =
    useGetRecentAnime();

  return (
    <Layout>
      <TrendingSection data={topAnime.results} isLoading={isTopAnimeLoading} />
      <LatestSection
        data={recentAnime.results}
        isLoading={isRecentAnimeLoading}
      />
      <ThisSeasonSection
        data={recentAnime.results}
        isLoading={isRecentAnimeLoading}
      />
    </Layout>
  );
};

export default Home;

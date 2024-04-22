// import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import Layout from '@/components/Layout';

import useGetTopAnime from '@/services/anime/getTopAnime/useGetTopAnime';
import useGetRecentAnime from '@/services/anime/getRecentAnime/useGetRecentAnime';

import TrendingSection from './Section/TrendingSection';
import LatestSection from './Section/LatestSection';
import HeroSection from './Section/HeroSection';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  // const navigate = useNavigate();

  const { data: trendingAnime, isLoading: isTrendingLoading } =
    useGetTopAnime();
  const { data: latestAnime, isLoading: isLatestLoading } = useGetRecentAnime();

  return (
    <Layout>
      <HeroSection />
      <TrendingSection data={trendingAnime} isLoading={isTrendingLoading} />
      <LatestSection data={latestAnime} isLoading={isLatestLoading} />
    </Layout>
  );
};

export default Home;

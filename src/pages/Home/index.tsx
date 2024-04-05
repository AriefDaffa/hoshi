import type { FC } from 'react';

import useGetTopAnime from '@/services/anime/getTopAnime/useGetTopAnime';

import HeroSection from './Section/HeroSection';
import Navbar from '@/components/Navbar';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  // const { data: topAnime } = useGetTopAnime();
  // const { data: recentAnime } = useGetRecentAnime();

  return (
    <>
      <Navbar />
      {/* <Layout> */}
      <HeroSection />
      {/* <Search /> */}
      {/* <TopAiring data={topAnime} />
      <RecenlyUpdated data={recentAnime} /> */}
      {/* </Layout> */}
    </>
  );
};

export default Home;

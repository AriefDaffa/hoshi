import type { FC } from 'react';

import Layout from '@/components/Layout';
import Background from '@/components/Background';

import useGetTopAnime from '@/services/anime/getTopAnime/useGetTopAnime';
import useGetRecentAnime from '@/services/anime/getRecentAnime/useGetRecentAnime';
// import useGetBrowseAnime from '@/services/anime/getBrowseAnime/useGetBrowseAnime';
import TrendingAnime from './Section/TrendingAnime';
// import BrowseAnime from './Section/BrowseAnime';
import LatestAnime from './Section/LatestAnime';

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
        <LatestAnime
          data={recentAnime.results}
          isLoading={isRecentAnimeLoading}
          isFetchingNextPage={isFetchingNextPage}
          handleNextBrowse={fetchNextPage}
        />
        {/* <BrowseAnime
          data={browseData.results}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isBrowseLoading}
          handleNextBrowse={fetchNextPage}
        /> */}
      </Layout>
    </div>
  );
};

export default Home;

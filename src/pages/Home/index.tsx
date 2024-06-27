import type { FC } from 'react';

import Layout from '@/components/Layout';

import useGetTopAnime from '@/services/anime/getTopAnime/useGetTopAnime';
import useGetRecentAnime from '@/services/anime/getRecentAnime/useGetRecentAnime';
import useGetBrowseAnime from '@/services/anime/getBrowseAnime/useGetBrowseAnime';
import TrendingAnime from './Section/TrendingAnime';
import BrowseAnime from './Section/BrowseAnime';
import LatestAnime from './Section/LatestAnime';
import Background from './Section/Background';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const { data: topAnime, isLoading: isTopAnimeLoading } = useGetTopAnime();
  const { data: recentAnime, isLoading: isRecentAnimeLoading } =
    useGetRecentAnime();
  const {
    data: browseData,
    isLoading: isBrowseLoading,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetBrowseAnime();

  return (
    <div className="relative bg-black">
      <Background />
      <Layout>
        <TrendingAnime data={topAnime.results} isLoading={isTopAnimeLoading} />
        <LatestAnime
          data={recentAnime.results}
          isLoading={isRecentAnimeLoading}
        />
        <BrowseAnime
          data={browseData.pages}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isBrowseLoading}
          handleNextBrowse={fetchNextPage}
        />
      </Layout>
    </div>
  );
};

export default Home;

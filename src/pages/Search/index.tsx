import type { ChangeEvent, FC } from 'react';

import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';

import SearchResult from './section/SearchResult';
import { useDebouncedState } from '@mantine/hooks';
import useGetSearchAnime from '@/services/anime/getSearchAnime/useGetSearchAnime';
import SearchComponent from './section/SearchComponent';

interface SearchProps {}

const Search: FC<SearchProps> = () => {
  const [value, setValue] = useDebouncedState('', 200);

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const { data, isLoading } = useGetSearchAnime({ keyword: value });

  return (
    <>
      <Navbar />
      <Layout>
        <div className="w-full h-full min-h-[calc(100vh-3rem)] pt-10 text-center px-2">
          <SearchComponent onChange={handleKeywordChange} />
          <SearchResult keyword={value} data={data} isLoading={isLoading} />
        </div>
      </Layout>
    </>
  );
};

export default Search;

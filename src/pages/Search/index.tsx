import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDebouncedState } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import type { ChangeEvent, FC } from 'react';

import Layout from '@/components/Layout';
import useGetSearchAnime from '@/services/anime/getSearchAnime/useGetSearchAnime';

import SearchResult from './section/SearchResult';
import SearchComponent from './section/SearchComponent';

interface SearchProps {}

const Search: FC<SearchProps> = () => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = useDebouncedState('', 200);

  const { data, isLoading } = useGetSearchAnime({ keyword: value });

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleOnClick = (id: string) => {
    setAnimate(true);
    setTimeout(() => {
      navigate(`/${id}`);
    }, 100);
  };

  return (
    <Layout>
      <AnimatePresence>
        {!animate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full min-h-[calc(100vh-3.5rem)] pt-10 text-center px-2"
          >
            <SearchComponent onChange={handleKeywordChange} />
            <SearchResult
              keyword={value}
              data={data}
              isLoading={isLoading}
              onClick={handleOnClick}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Search;

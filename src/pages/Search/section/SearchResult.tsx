import type { FC } from 'react';

import SearchResultCard from '@/components/SearchResultCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { AnimeSearchData } from '@/services/anime/getSearchAnime/types';

interface SearchResultProps {
  keyword: string;
  isLoading: boolean;
  data: AnimeSearchData;
}

const SearchResult: FC<SearchResultProps> = ({ data, keyword, isLoading }) => {
  return (
    <div className="flex justify-center w-full h-full">
      {keyword !== '' && (
        <div className="mt-10 w-full max-w-[800px] relative">
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-left">
            Showing search result for "<b>{keyword}</b>"
          </p>
          <ScrollArea className="h-[calc(100vh-350px)] w-full rounded-md">
            {!isLoading ? (
              data.results.length > 0 ? (
                data.results.map((item) => (
                  <SearchResultCard
                    badgeType={item.subOrDub}
                    cardTitle={item.title}
                    imageURL={item.image}
                    releaseDate={item.releaseDate}
                  />
                ))
              ) : (
                <div className=" h-20 flex flex-col justify-center self-center">
                  Not Found
                </div>
              )
            ) : (
              Array.from(Array(3), (_, i) => (
                <div
                  key={i}
                  className="flex w-full h-full rounded-md p-2 gap-2 "
                >
                  <div className="w-24 h-36 rounded-md animate-pulse bg-gray-900"></div>
                  <div className="flex flex-col gap-2 justify-end">
                    <div className="h-5 w-24 bg-gray-900 rounded-md animate-pulse"></div>
                    <div className="h-6 w-36 bg-gray-900 rounded-md animate-pulse"></div>
                  </div>
                </div>
              ))
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default SearchResult;

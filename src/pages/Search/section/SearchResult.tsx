import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import type { FC } from 'react';

import SearchResultCard from '@/components/SearchResultCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { AnimeSearchData } from '@/services/anime/getSearchAnime/types';

interface SearchResultProps {
  keyword: string;
  isLoading: boolean;
  data: AnimeSearchData;
  onClick: (id: string) => void;
}

const SearchResult: FC<SearchResultProps> = ({
  data,
  keyword,
  isLoading,
  onClick,
}) => {
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
                    onClick={() => onClick(item.id)}
                  />
                ))
              ) : (
                <div className=" h-20 flex flex-col justify-center self-center">
                  Not Found
                </div>
              )
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <AiOutlineLoading3Quarters size={46} className="animate-spin" />
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default SearchResult;

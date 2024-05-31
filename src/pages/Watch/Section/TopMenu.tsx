import { Button } from '@/components/ui/button';
import { IoIosArrowBack, IoIosSearch } from 'react-icons/io';
import { FaListUl } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, Dispatch, SetStateAction, type FC } from 'react';

import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import type { AnimeInfoData } from '@/services/anime/getAnimeInfo/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useDebouncedState } from '@mantine/hooks';
import useGetSearchAnime from '@/services/anime/getSearchAnime/useGetSearchAnime';

interface TopMenuProps {
  currentEps: string;
  isDialogOpen: boolean;
  animeInfo: AnimeInfoData;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  handleSheetOpen: () => void;
}

const TopMenu: FC<TopMenuProps> = ({
  currentEps,
  animeInfo,
  isDialogOpen,
  setIsDialogOpen,
  handleSheetOpen,
}) => {
  const [keyword, setKeyword] = useDebouncedState('', 500);

  const { data, isLoading } = useGetSearchAnime({ keyword });

  const navigate = useNavigate();

  const navigateSearch = (id: string) => {
    setIsDialogOpen(false);
    navigate(`/detail/${id}`);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div
      className="p-2 flex justify-between"
      onClick={(e) => e.stopPropagation()}
    >
      <div className=" flex gap-2 items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(`/detail/${animeInfo.id}`)}
        >
          <IoIosArrowBack />
        </Button>
        <Separator orientation="vertical" className="h-8" />
        <div>
          <div className="text-base line-clamp-1">{animeInfo.title}</div>
          <div className="text-xs text-muted-foreground">
            Episode {currentEps}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className=""
          onClick={() => setIsDialogOpen(true)}
        >
          <IoIosSearch className="" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className=""
          onClick={handleSheetOpen}
        >
          <FaListUl className="" />
        </Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Search Anime</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Search anime..."
              className="my-2"
              onChange={handleInputChange}
            />
            {keyword === '' ? (
              <div className="h-[250px] flex items-center justify-center">
                <div className="flex flex-col items-center w-full justify-center">
                  <div>Start typing to search</div>
                </div>
              </div>
            ) : isLoading ? (
              <div className="h-[250px] flex gap-2 flex-col justify-center">
                <div className="bg-primary animate-pulse h-[112px]" />
                <div className="bg-primary animate-pulse h-[112px]" />
                <div className="bg-primary animate-pulse h-[112px]" />
              </div>
            ) : (
              <ScrollArea className="h-[250px]">
                {data.results.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => navigateSearch(item.id)}
                    className="flex gap-2 items-end cursor-pointer p-2 rounded-md hover:bg-primary"
                  >
                    <div className="h-24 w-20  object-cover rounded-md overflow-hidden">
                      <img src={item.image} alt="" className="size-full" />
                    </div>
                    <div className="w-full h-full">
                      <Badge>{item.subOrDub}</Badge>
                      <div className="text-lg text-white line-clamp-1">
                        {item.title}
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TopMenu;

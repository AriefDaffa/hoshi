import { useNavigate } from 'react-router-dom';
import { useDebouncedState } from '@mantine/hooks';
import { useEffect } from 'react';
import { IoIosSearch } from 'react-icons/io';
import type { ChangeEvent, FC } from 'react';

import useGetSearchAnime from '@/services/anime/getSearchAnime/useGetSearchAnime';
import { useNavbarContext } from '@/context/NavbarContext';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const [keyword, setKeyword] = useDebouncedState('', 500);

  const { data, isLoading } = useGetSearchAnime({ keyword });

  const { isDialogOpen, setIsDialogOpen } = useNavbarContext();

  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsDialogOpen(true);
  };

  const navigateHome = () => {
    navigate('/');
  };

  const navigateSearch = (id: string) => {
    setIsDialogOpen(false);
    navigate(`/detail/${id}`);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsDialogOpen((isDialogOpen) => !isDialogOpen);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setIsDialogOpen]);

  return (
    <div className="sticky top-0 w-full  z-50">
      <div className="h-14 flex justify-center w-full ">
        <div className="flex justify-between items-center h-full px-4 w-full max-w-screen-xl relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={navigateHome}
          >
            <img src="/assets/images/logo.png" alt="" className="h-20" />
          </div>
          <div className="bg-primary rounded-md">
            <div
              className="items-center  rounded-md py-2 px-2 cursor-pointer hidden md:flex md:border"
              onClick={handleOpenModal}
            >
              <IoIosSearch className="mr-2" />
              <div className="mr-4 text-sm text-muted-foreground hidden md:block">
                Click here to search
              </div>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
            <Button
              variant="secondary"
              size="icon"
              className="flex justify-center md:hidden"
              onClick={handleOpenModal}
            >
              <IoIosSearch className="" />
            </Button>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Search Anime</DialogTitle>
                <DialogDescription>
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
                            <img
                              src={item.image}
                              alt=""
                              className="size-full"
                            />
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
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

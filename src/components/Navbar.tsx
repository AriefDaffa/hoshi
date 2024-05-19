import { useNavigate } from 'react-router-dom';
import { IoIosClose } from 'react-icons/io';
import { useClickOutside, useDebouncedState } from '@mantine/hooks';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { ChangeEvent, FC } from 'react';

import { Input } from './ui/input';
import useGetSearchAnime from '@/services/anime/getSearchAnime/useGetSearchAnime';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const [openModal, setOpenModal] = useState(false);
  const [dirtyKeyword, setDirtyKeyword] = useState('');
  const [open, setOpen] = useState(false);

  const [keyword, setKeyword] = useDebouncedState('', 500);
  const ref = useClickOutside(() => setOpenModal(false));
  const navigate = useNavigate();

  const { data, isLoading } = useGetSearchAnime({ keyword });

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const navigateHome = () => {
    navigate('/');
  };

  const navigateSearch = (id: string) => {
    navigate(`/search/${id}`);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setDirtyKeyword(e.target.value);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <div className="sticky top-0 w-full bg-[#09090B] z-50">
      <div className="h-14 border-b-[1px] flex justify-center w-full ">
        <div className="flex justify-between items-center h-full px-4 w-full max-w-screen-xl relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={navigateHome}
          >
            <img src="/assets/images/logo.png" alt="" className="h-10" />
          </div>
          <div>
            <div
              className="flex items-center md:border rounded-md pr-2"
              onClick={handleOpenModal}
            >
              <Input
                placeholder="Click here to search"
                className="border-0 focus-visible:ring-0 hidden md:block"
                value={dirtyKeyword}
                onChange={handleInputChange}
              />
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
          <AnimatePresence>
            {openModal && dirtyKeyword && (
              <motion.div
                ref={ref}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-full right-0 h-screen w-full bg-[#09090B] border p-2 rounded-md md:top-[120%] md:h-[350px] md:max-w-[400px]"
              >
                <div className="w-full flex justify-end items-center md:hidden">
                  <IoIosClose size={24} onClick={handleOpenModal} />
                </div>
                <label className="md:hidden">Search Anime</label>
                <div className="flex items-center rounded-md pr-2 border mt-1 md:border-none">
                  <Input
                    placeholder="Type here to search"
                    className="border-0 focus-visible:ring-0 block md:hidden"
                    value={dirtyKeyword}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="pt-2 h-full md:pt-0">
                  {!isLoading && (
                    <ScrollArea className="h-[70vh] md:h-[320px]">
                      {data.results.map((item, idx) => (
                        <div
                          key={idx}
                          onClick={() => navigateSearch(item.id)}
                          className="flex gap-2 items-end cursor-pointer p-2 border-md hover:bg-primary"
                        >
                          <img
                            src={item.image}
                            alt=""
                            className="h-28 w-20 rounded-md"
                          />
                          <div>
                            {(item.subOrDub === 'sub' ||
                              item.subOrDub === 'dub') && (
                              <Badge
                                className={`${
                                  item.subOrDub === 'sub'
                                    ? 'bg-red-500'
                                    : 'bg-bluePrimary'
                                }`}
                              >
                                {item.subOrDub === 'sub'
                                  ? 'Subtitle'
                                  : 'Dubbing'}
                              </Badge>
                            )}
                            <div>{item.title}</div>
                          </div>
                        </div>
                      ))}
                    </ScrollArea>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

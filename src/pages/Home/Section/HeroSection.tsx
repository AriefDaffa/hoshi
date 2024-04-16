import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { FC } from 'react';

import { Button } from '@/components/ui/button';

interface HeroSectionProps {}

const HeroSection: FC<HeroSectionProps> = () => {
  const [animate, setAnimate] = useState(false);

  const navigate = useNavigate();

  const slides = [
    { id: 1, image: '/assets/images/carousel/1.png' },
    { id: 2, image: '/assets/images/carousel/2.png' },
    { id: 3, image: '/assets/images/carousel/3.png' },
    { id: 4, image: '/assets/images/carousel/4.png' },
    { id: 5, image: '/assets/images/carousel/5.png' },
    { id: 6, image: '/assets/images/carousel/6.png' },
    { id: 7, image: '/assets/images/carousel/7.png' },
    { id: 8, image: '/assets/images/carousel/8.jpeg' },
    { id: 9, image: '/assets/images/carousel/9.jpeg' },
  ];

  const handleNav = () => {
    setAnimate(true);
    setTimeout(() => {
      navigate('/search');
    }, 100);
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex items-center justify-center">
      <div className="h-full px-4 w-full max-w-screen-xl flex flex-row justify-center items-center gap-4 overflow-hidden">
        <div className="w-full overflow-hidden">
          <AnimatePresence>
            {!animate && (
              <motion.div
                key="left-section"
                initial={{ opacity: 0, x: '-100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '-100%' }}
              >
                <h1 className="scroll-m-20 text-4xl font-medium tracking-tight lg:text-5xl">
                  Watching anime <br /> never been this{' '}
                  <span className="text-bluePrimary">easy</span>
                </h1>
                <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-2">
                  find your favorite anime, or browse{' '}
                  <span
                    className="underline underline-offset-2 cursor-pointer"
                    onClick={() => navigate('/trending')}
                  >
                    trending anime
                  </span>
                  .
                </p>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="flex gap-3"
                    onClick={handleNav}
                  >
                    <IoSearch />
                    Click here to search
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {!animate && (
            <motion.div
              key="right-section"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              className="w-full h-full flex justify-around overflow-hidden"
            >
              <div className="flex flex-col gap-20">
                {slides.map((item) => (
                  <div key={item.id} className="w-full">
                    <img
                      src={item.image}
                      alt=""
                      className="w-64 h-96 object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-20 -mt-[100%]">
                {slides.reverse().map((item) => (
                  <div key={item.id} className="w-full">
                    <img
                      src={item.image}
                      alt=""
                      className="w-64 h-96 object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HeroSection;

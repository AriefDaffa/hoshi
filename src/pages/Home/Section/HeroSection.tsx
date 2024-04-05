import { IoSearch } from 'react-icons/io5';

import type { FC } from 'react';

import { Input } from '@/components/ui/input';

interface HeroSectionProps {}

const HeroSection: FC<HeroSectionProps> = () => {
  return (
    <div className="h-[calc(100vh-3rem)] flex flex-col items-center justify-center">
      <div className="h-1/2 px-4 w-full max-w-screen-xl flex flex-col justify-center items-center gap-4 text-center">
        <div className="w-full">
          <h1 className="scroll-m-20 text-4xl font-medium tracking-tight lg:text-5xl">
            Watching anime <br /> never been this{' '}
            <span className="text-bluePrimary">easy</span>
          </h1>
          <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-2">
            find your favorite anime, or browse{' '}
            <span className="underline underline-offset-2">trending anime</span>
            .
          </p>
          <div className="flex justify-center  mt-4">
            <div className="flex w-full max-w-[450px] items-center border p-1 px-3 rounded-md">
              <IoSearch size={26} />
              <Input
                className="w-full border-0 focus-visible:ring-0"
                placeholder="Search anime"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

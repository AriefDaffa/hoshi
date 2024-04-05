import type { FC } from 'react';

import { Input } from '@/components/ui/input';

interface SearchProps {}

const Search: FC<SearchProps> = () => {
  return (
    <div className="px-4 h-screen flex flex-col text-center align-middle justify-center font-geist">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl">
        What do you want to watch today?
      </h1>
      <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-6">
        find your favorite anime, or browse trending anime below
      </p>
      <div className="flex justify-center mt-6">
        <Input className="max-w-96" />
      </div>
    </div>
  );
};

export default Search;

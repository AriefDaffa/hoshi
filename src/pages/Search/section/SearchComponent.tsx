import { IoSearch } from 'react-icons/io5';
import type { ChangeEvent, FC } from 'react';

import { Input } from '@/components/ui/input';

interface SearchComponentProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchComponent: FC<SearchComponentProps> = ({ onChange }) => {
  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight  lg:text-6xl">
        Explore
      </h1>
      <h4 className="scroll-m-20 text-xl mt-2 font-semibold tracking-tight">
        Find your favorite anime below
      </h4>
      <div className="flex justify-center">
        <div className="flex items-center border rounded-md p-2 mt-4 w-full max-w-[800px]">
          <Input
            placeholder="Type here..."
            className="border-0 focus-visible:ring-0"
            onChange={onChange}
          />
          <div className="border rounded-md p-2 bg-white cursor-pointer hover:bg-gray-200">
            <IoSearch size={24} color="black" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;

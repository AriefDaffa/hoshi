import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import type { FC } from 'react';

interface LoaderProps {}

const Loader: FC<LoaderProps> = () => {
  return (
    <div className="w-full h-[calc(100vh-56px)] flex items-center justify-center">
      <AiOutlineLoading3Quarters size={46} className="animate-spin" />
    </div>
  );
};

export default Loader;

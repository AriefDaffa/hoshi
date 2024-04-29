import { LuLoader2 } from 'react-icons/lu';
import type { FC } from 'react';

interface BufferLoaderProps {}

const BufferLoader: FC<BufferLoaderProps> = () => {
  return (
    <div className="absolute w-full h-full  flex items-center justify-center">
      <LuLoader2 className="animate-spin" size={48} />
    </div>
  );
};

export default BufferLoader;

import type { FC } from 'react';

interface BackgroundProps {}

const Background: FC<BackgroundProps> = () => {
  return (
    <>
      <div className="absolute h-screen w-full top-0 z-20">
        <img src="/assets/images/gradient.png" alt="" className="size-full" />
      </div>
      <div className="absolute h-screen w-full object-cover top-0 z-10">
        <img
          src="/assets/images/firefly.jpeg"
          alt=""
          className="size-full object-cover"
        />
      </div>
    </>
  );
};

export default Background;

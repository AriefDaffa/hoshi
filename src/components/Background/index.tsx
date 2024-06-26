import type { FC } from 'react';

interface BackgroundProps {
  blurBG?: boolean;
}

const Background: FC<BackgroundProps> = ({ blurBG = false }) => {
  return (
    <>
      <div className={`absolute h-screen w-full top-0 z-20`}>
        <img src="/assets/images/gradient.png" alt="" className="size-full" />
      </div>
      <div
        className={`absolute h-screen w-full object-cover top-0 z-10 ${
          blurBG ? 'blur-xl' : ''
        }`}
      >
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

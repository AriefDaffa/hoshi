import type { FC } from 'react';

interface BackgroundProps {
  bgURL?: string;
  blurBG?: boolean;
}

const Background: FC<BackgroundProps> = ({ blurBG = false, bgURL = '' }) => {
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
        <img src={bgURL} alt="" className="size-full object-cover" />
      </div>
    </>
  );
};

export default Background;

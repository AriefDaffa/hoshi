import type { FC } from 'react';

interface LatestSkeletonProps {}

const LatestSkeleton: FC<LatestSkeletonProps> = () => {
  return (
    <>
      <div className="h-[65px] bg-primary pulse m-2 rounded-md" />
      <div className="h-[65px] bg-primary pulse m-2 rounded-md" />
      <div className="h-[65px] bg-primary pulse m-2 rounded-md" />
      <div className="h-[65px] bg-primary pulse m-2 rounded-md" />
      <div className="h-[65px] bg-primary pulse m-2 rounded-md" />
      <div className="h-[65px] bg-primary pulse m-2 rounded-md" />
    </>
  );
};

export default LatestSkeleton;

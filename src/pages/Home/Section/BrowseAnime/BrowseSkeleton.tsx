import type { FC } from 'react';

interface BrowseSkeletonProps {}

const BrowseSkeleton: FC<BrowseSkeletonProps> = () => {
  return (
    <div className="w-full border rounded-md h-96 mt-2 animate-pulse bg-primary" />
  );
};

export default BrowseSkeleton;

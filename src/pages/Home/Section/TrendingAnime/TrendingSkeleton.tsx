import type { FC } from 'react';

interface TrendingSkeletonProps {}

const TrendingSkeleton: FC<TrendingSkeletonProps> = () => {
  return (
    <>
      <data className="w-80 h-44 bg-primary pulse rounded-md" />
      <data className="w-80 h-44 bg-primary pulse rounded-md" />
      <data className="w-80 h-44 bg-primary pulse rounded-md" />
      <data className="w-80 h-44 bg-primary pulse rounded-md" />
      <data className="w-80 h-44 bg-primary pulse rounded-md" />
    </>
  );
};

export default TrendingSkeleton;

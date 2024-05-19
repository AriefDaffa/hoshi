import { motion } from 'framer-motion';
import type { FC } from 'react';

interface HeroSectionProps {}

const HeroSection: FC<HeroSectionProps> = () => {
  return (
    <motion.div
      key="left-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center h-[calc(100vh-100px)] flex justify-center items-center my-5 mx-2 relative"
    >
      <div className="">
        <h1 className="scroll-m-20 text-3xl font-medium tracking-tight sm:text-4xl lg:text-5xl">
          Watch your favorite Anime, free{' '}
          <span className="text-primary-blue">without ads</span>
        </h1>
        <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-2">
          find your favorite anime, or browse trending and latest anime below.
        </p>
      </div>
    </motion.div>
  );
};

export default HeroSection;

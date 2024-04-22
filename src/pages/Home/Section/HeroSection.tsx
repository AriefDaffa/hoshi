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
      className="text-center h-[40vh] flex justify-center items-center border my-5 rounded-lg mx-2"
    >
      <div>
        <h1 className="scroll-m-20 text-4xl font-medium tracking-tight lg:text-5xl">
          Watching anime <br /> never been this{' '}
          <span className="text-bluePrimary">easy</span>
        </h1>
        <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-2">
          find your favorite anime, or browse trending and latest anime below.
        </p>
        {/* <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            className="flex gap-3"
            onClick={() => navigate('/search')}
          >
            <IoSearch />
            Click here to search
          </Button>
        </div> */}
      </div>
    </motion.div>
  );
};

export default HeroSection;

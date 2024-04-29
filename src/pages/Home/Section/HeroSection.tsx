import { SparklesCore } from '@/components/ui/sparkles';
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
      className="text-center h-[40vh] flex justify-center items-center my-5 mx-2 relative"
    >
      <div className="absolute  ">
        <h1 className="scroll-m-20 text-4xl font-medium tracking-tight lg:text-5xl">
          Watching anime <br /> never been this{' '}
          <span className="text-bluePrimary">easy</span>
        </h1>
        <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-2">
          find your favorite anime, or browse trending and latest anime below.
        </p>
      </div>
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={100}
        className="w-full h-full"
        particleColor="#FFFFFF"
      />
    </motion.div>
  );
};

export default HeroSection;

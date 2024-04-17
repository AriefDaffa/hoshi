import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { IoSearch } from 'react-icons/io5';
import type { FC } from 'react';

import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <motion.div
        key="left-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center h-[90vh] flex justify-center items-center"
      >
        <div>
          <h1 className="scroll-m-20 text-4xl font-medium tracking-tight lg:text-5xl">
            Watching anime <br /> never been this{' '}
            <span className="text-bluePrimary">easy</span>
          </h1>
          <p className="leading-7 text-muted-foreground [&:not(:first-child)]:mt-2">
            find your favorite anime, or browse{' '}
            <span
              className="underline underline-offset-2 cursor-pointer"
              onClick={() => navigate('/trending')}
            >
              trending anime
            </span>
            .
          </p>
          <div className="mt-4 flex justify-center">
            <Button
              variant="outline"
              className="flex gap-3"
              onClick={() => navigate('/search')}
            >
              <IoSearch />
              Click here to search
            </Button>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Home;

import type { FC } from 'react';

import useGetTopAnime from '@/services/anime/getTopAnime/useGetTopAnime';
import Layout from '@/components/Layout';
import Top4Anime from './Section/Top4Anime';

interface TrendingProps {}

const Trending: FC<TrendingProps> = () => {
  const { data } = useGetTopAnime();

  const [head] = data.results;
  const headingData = data.results.slice(1, 4);

  return (
    <Layout>
      <div className="w-full h-[calc(100vh-3.5rem)]">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight py-4 lg:text-5xl px-2">
          Trending Anime
        </h1>
        <Top4Anime {...head} rightData={headingData} />
        {/* <div className="w-full flex">
          {!isLoading && (
            <>
              <div className="w-full p-2">
                <img
                  src={head?.image}
                  alt=""
                  className="w-[20rem] h-[30rem] object-cover rounded-md"
                />
                <Badge className="mt-4 bg-red-600">
                  <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
                    Trending 1
                  </h4>
                </Badge>
                <h2 className="scroll-m-20 py-2 text-3xl font-semibold tracking-tight first:mt-0">
                  {head?.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {head.genres.map((item, idx) => (
                    <Badge key={idx}>{item}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-4 w-full p-2">
                {headingData.map((item, idx) => (
                  <div key={item.id} className="flex gap-2">
                    <img
                      src={item.image}
                      alt=""
                      className="w-60 h-[19rem] object-cover rounded-md"
                    />
                    <div className="w-full">
                      <Badge className=" bg-red-600">
                        <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                          Trending {idx + 2}
                        </h4>
                      </Badge>
                      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                        {item.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {head.genres.map((el, idx) => (
                          <Badge key={idx}>{el}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div> */}
      </div>
    </Layout>
  );
};

export default Trending;

import { useNavigate, useParams } from 'react-router-dom';
import { FaSortAmountUp, FaSortAmountDown } from 'react-icons/fa';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import type { FC } from 'react';

import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import useGetAnimeInfo from '@/services/anime/getAnimeInfo/useGetAnimeInfo';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { kebabToNormal } from '@/utils/kebabToNormal';
import { uppercaseLetter } from '@/utils/uppercaseLetter';
import { Input } from '@/components/ui/input';

interface DetailProps {}

const Detail: FC<DetailProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sort, setSort] = useState('descend');
  const [episode, setEpisode] = useState('');

  const checkID = typeof id === 'string' ? id : '';

  const { data, isLoading } = useGetAnimeInfo({ id: checkID });

  useEffect(() => {
    if (!isLoading && data.id === '') {
      navigate('/search');
    }
  }, [data, isLoading, navigate]);

  return (
    <>
      <Navbar />
      <Layout>
        <Breadcrumb className="mt-6 px-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/search">Search</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                {uppercaseLetter(kebabToNormal(checkID))}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight my-2 lg:text-5xl px-2">
          Anime Details
        </h1>
        {!isLoading ? (
          <ScrollArea className="w-full h-[calc(90vh-3rem)] pt-2 text-center px-2">
            <div className="flex flex-col gap-4 items-end w-full lg:flex-row">
              <div className="h-[45vh] w-full rounded-md lg:w-2/4">
                <img
                  src={data.image}
                  alt=""
                  className="h-full w-full object-cover rounded-md"
                />
              </div>
              <div className="h-full w-full text-left">
                {(data.subOrDub === 'sub' || data.subOrDub === 'dub') && (
                  <Badge
                    className={`${
                      data.subOrDub === 'sub' ? 'bg-red-500' : 'bg-bluePrimary'
                    }`}
                  >
                    {data.subOrDub === 'sub' ? 'Subtitle' : 'Dubbing'}
                  </Badge>
                )}
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight my-2 lg:text-4xl">
                  {data.title}
                </h1>
                <div className="flex gap-2 flex-wrap">
                  {data.genres.map((item, idx) => (
                    <Badge key={idx}>{item}</Badge>
                  ))}
                </div>
                <div className="mt-4">
                  <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Description
                  </h4>
                  <p className="leading-7 text-justify">{data.description}</p>
                </div>
                <div className="flex mt-4">
                  <div className="w-full">
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      Release Date
                    </h4>
                    <p className="leading-7 text-justify">{data.releaseDate}</p>
                  </div>
                  <div className="w-full">
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                      Status
                    </h4>
                    <Badge
                      className={`${
                        data.status === 'ongoing'
                          ? 'bg-yellow-300'
                          : 'bg-green-500'
                      }  text-black my-1`}
                    >
                      {data.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 text-left">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-left">
                Episode List
              </h4>
              <div className="mt-2 flex gap-2">
                <div className="w-full">
                  <Input
                    placeholder="Go To Episode"
                    className="h-12"
                    type="number"
                    onChange={(e) => setEpisode(e.target.value)}
                  />
                </div>
                <div
                  onClick={() =>
                    setSort(sort === 'descend' ? 'ascend' : 'descend')
                  }
                  className="w-fit border rounded-md p-4 flex items-center cursor-pointer hover:bg-primary"
                >
                  {sort === 'descend' ? (
                    <FaSortAmountUp />
                  ) : (
                    <FaSortAmountDown />
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
                {data.episodes
                  .sort((a, b) =>
                    sort === 'descend'
                      ? a.number - b.number
                      : b.number - a.number
                  )
                  .filter((item) => {
                    if (episode === '') {
                      return item;
                    }

                    return item.number.toString().includes(episode);
                  })
                  .map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => navigate(`/watch/${id}/${item.id}`)}
                      className="h-64 bg-primary flex items-center justify-center rounded-lg cursor-pointer relative hover:bg-white hover:text-black"
                    >
                      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        {item.number}
                      </h1>
                    </div>
                  ))}
              </div>
            </div>
          </ScrollArea>
        ) : (
          <div className="w-full h-[calc(90vh-3rem)] flex items-center justify-center">
            <AiOutlineLoading3Quarters size={46} className="animate-spin" />
          </div>
        )}
      </Layout>
    </>
  );
};

export default Detail;

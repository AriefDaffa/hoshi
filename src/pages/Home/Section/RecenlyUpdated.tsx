import { useEffect, type FC, useCallback, useState } from 'react';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';

interface RecenlyUpdatedProps {}

const RecenlyUpdated: FC<RecenlyUpdatedProps> = ({ data }) => {
  const [embla, setEmbla] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    embla?.scrollPrev();
  }, [embla]);

  const scrollNext = useCallback(() => {
    embla?.scrollNext();
  }, [embla]);

  const onSelect = useCallback((embla: CarouselApi) => {
    if (!embla) {
      return;
    }

    setCanScrollPrev(embla.canScrollPrev());
    setCanScrollNext(embla.canScrollNext());
  }, []);

  useEffect(() => {
    if (!embla || !setEmbla) {
      return;
    }

    setEmbla(embla);
  }, [embla]);

  useEffect(() => {
    if (!embla) {
      return;
    }

    onSelect(embla);
    embla.on('reInit', onSelect);
    embla.on('select', onSelect);

    return () => {
      embla?.off('select', onSelect);
    };
  }, [embla, onSelect]);
  return (
    <div className="px-4 pt-4 font-geist">
      <div className="flex justify-between items-center">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Recently Updated
        </h3>
      </div>
      <div className="grid grid-cols-5 gap-4 mt-4">
        {data?.results?.map((item, idx) => (
          <div
            key={idx}
            className="relative cursor-pointer hover:text-bluePrimary"
          >
            <Badge className="absolute top-1 left-1 bg-bluePrimary text-white">
              Episode {item?.episodeNumber}
            </Badge>
            <img
              src={item?.image}
              className="h-96 md:h-80 w-full object-cover rounded-sm"
            />
            <p className="leading-7 font-medium pt-1 line-clamp-2">
              {item?.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecenlyUpdated;

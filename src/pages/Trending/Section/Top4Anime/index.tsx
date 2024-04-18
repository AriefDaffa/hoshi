import type { FC } from 'react';

import { Badge } from '@/components/ui/badge';
import type { AnimeTopResults } from '@/services/anime/getTopAnime/types';

interface Top4AnimeProps extends AnimeTopResults {
  rightData: AnimeTopResults[];
}

const Top4Anime: FC<Top4AnimeProps> = ({
  image = '',
  title = '',
  genres = [],
  rightData = [],
}) => {
  return (
    <div className="w-full h-screen flex gap-2">
      <div className="h-[20rem] w-full flex">
        <div className="h-full w-full flex">
          <img
            src={image}
            alt=""
            className="w-auto h-auto object-contain rounded-md"
          />
        </div>
        {/* <div className="h-full w-full flex flex-col bg-red-200 gap-4">
          <div className="bg-yellow-200 flex-1">1</div>
          <div className="bg-yellow-200 flex-1">2</div>
          <div className="bg-yellow-200 flex-1">3</div>
        </div> */}
      </div>
      <div></div>
    </div>
  );

  //   <div className="p-2">
  //         <img
  //           src={image}
  //           alt=""
  //           className="w-full h-full object-cover rounded-md"
  //         />
  //         {/* <Badge className="mt-4 bg-red-600">
  //           <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
  //             Trending 1
  //           </h4>
  //         </Badge>
  //         <h2 className="scroll-m-20 py-2 text-3xl font-semibold tracking-tight first:mt-0">
  //           {title}
  //         </h2>
  //         <div className="flex flex-wrap gap-2">
  //           {genres.map((item, idx) => (
  //             <Badge key={idx}>{item}</Badge>
  //           ))}
  //         </div> */}
  //       </div>
  //       <div className="h-full flex flex-col">
  //         {rightData.map((item, idx) => (
  //           <div key={item.id} className="h-[384px] flex gap-2 flex-1">
  //             {/* <img
  //               src={item.image}
  //               alt=""
  //               className="h-full w-96 object-cover rounded-md"
  //             /> */}
  //             <div className="w-full">
  //               <Badge className=" bg-red-600">
  //                 <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
  //                   Trending {idx + 2}
  //                 </h4>
  //               </Badge>
  //               <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
  //                 {item.title}
  //               </h3>
  //               <div className="flex flex-wrap gap-2 mt-2">
  //                 {item.genres.map((el, idx) => (
  //                   <Badge key={idx}>{el}</Badge>
  //                 ))}
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
};

export default Top4Anime;

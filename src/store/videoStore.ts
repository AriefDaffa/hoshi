import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { IVideosStore } from '@/types/IVideoProps';

export const useVideoStore = create<IVideosStore>()(
  persist(
    (set) => ({
      volume: 0.6,
      resolution: '360p',
      timeStamp: 0,
      episode: [
        // {
        //   duration: 0,
        //   episode: '',
        //   imgSrc: '',
        //   path: '',
        //   timeStamp: 0,
        //   title: '',
        // },
      ],
      createWatch(anime) {
        set((state) => {
          const arrAnime = [...state.episode];

          const existingAnime = arrAnime.find((el) => el.path === anime.path);

          if (existingAnime) {
            arrAnime.unshift(anime);
          } else {
            arrAnime.push(anime);
          }

          const seen = new Set();
          const datas = arrAnime.filter((item) => {
            const keyValue = item['path'];
            if (seen.has(keyValue)) {
              return false;
            } else {
              seen.add(keyValue);
              return true;
            }
          });

          return { episode: datas };
        });
      },
      handleVolume(vol) {
        set({ volume: vol });
      },
      handleProgress(path, progress) {
        set((state) => {
          const arrAnime = [...state.episode];

          const existingAnime = arrAnime.find((el) => el.path === path);

          if (existingAnime) {
            existingAnime.timeStamp = progress;
          }

          return { episode: arrAnime };
        });
      },
      handleResolutionChange(res) {
        set({ resolution: res });
      },
    }),
    {
      name: 'hoshi-vid',
    }
  )
);

import type { ChangeEvent } from 'react';

export interface IEpisode {
  imgSrc: string;
  path: string;
  title: string;
  episode: string;
  timeStamp: number;
  duration: number;
}

export interface IVideosStore {
  volume: number;
  resolution: string;
  episode: IEpisode[];
  createWatch: (anime: IEpisode) => void;
  handleVolume: (e: ChangeEvent<HTMLInputElement>) => void;
  handleProgress: (path: string, progress: number) => void;
  handleResolutionChange: (res: string) => void;
}

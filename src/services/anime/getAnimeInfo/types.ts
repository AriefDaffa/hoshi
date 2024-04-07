export interface GetSearchInfoProps {
  id: string;
}

export interface UseGetSearchInfoProps {
  id: string;
}

interface Episodes {
  id: string;
  number: 0;
  url: string;
}

export interface AnimeInfoData {
  id: string;
  title: string;
  url: string;
  image: string;
  releaseDate: string;
  description: string;
  genres: string[];
  subOrDub: string;
  type: string;
  status: string;
  otherName: string;
  totalEpisodes: number;
  episodes: Episodes[];
}

export interface AnimeInfoResponse {
  data: AnimeInfoData;
  isLoading: boolean;
}

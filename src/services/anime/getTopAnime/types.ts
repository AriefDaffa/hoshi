interface AnimeTopResults {
  id: string;
  episodeId: string;
  episodeNumber: number;
  url: string;
  title: string;
  image: string;
  genres: string[];
}

export interface AnimeTopData {
  currentPage: number;
  hasNextPage: boolean;
  results: AnimeTopResults[];
}

export interface AnimeTopResponse {
  data: AnimeTopData;
  isLoading: boolean;
}

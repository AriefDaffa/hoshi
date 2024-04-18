export interface AnimeRecentResults {
  id: string;
  episodeId: string;
  episodeNumber: number;
  url: string;
  title: string;
  image: string;
}

export interface AnimeRecentData {
  currentPage: number;
  hasNextPage: boolean;
  results: AnimeRecentResults[];
}

export interface AnimeRecentResponse {
  data: AnimeRecentData;
  isLoading: boolean;
}

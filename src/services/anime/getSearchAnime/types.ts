export interface GetSearchAnimeProps {
  keyword: string;
}

export interface UseGetSearchAnimeProps {
  keyword: string;
}

interface AnimeSearchResults {
  id: string;
  title: string;
  image: string;
  releaseDate: string;
  subOrDub: string;
}

export interface AnimeSearchData {
  currentPage: number;
  hasNextPage: boolean;
  results: AnimeSearchResults[];
}

export interface AnimeSearchResponse {
  data: AnimeSearchData;
  isLoading: boolean;
}

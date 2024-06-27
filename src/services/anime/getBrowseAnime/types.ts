export interface AnimeBrowseResults {
  id: string;
  episodeId: string;
  episodeNumber: number;
  url: string;
  title: string;
  image: string;
  genres: string[];
}

export interface AnimeBrowseData {
  currentPage: number;
  hasNextPage: boolean;
  results: AnimeBrowseResults[];
}

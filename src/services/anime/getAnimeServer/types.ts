export interface GetAnimeServerURLProps {
  episodeID: string;
}

export interface AnimeServerData {
  name: string;
  url: string;
}

export interface AnimeServerResponse {
  data: AnimeServerData[];
  isLoading: boolean;
  isError: boolean;
}

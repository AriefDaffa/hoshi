export interface GetAnimeStreamURLProps {
  episodeID: string;
}

interface AnimeStreamHeaders {
  Referer: string;
  watchsb: string;
  ['User-Agent']: string;
}

export interface AnimeStreamSources {
  url: string;
  quality: string;
  isM3U8: boolean;
}

export interface AnimeStreamData {
  headers: AnimeStreamHeaders;
  sources: AnimeStreamSources[];
}

export interface AnimeStreamResponse {
  data: AnimeStreamData;
  isLoading: boolean;
}

export interface Root {
  status: string;
  message: any;
  data: SearchAllData;
}

export interface SearchAllData {
  topQuery: TopQuery;
  songs: Songs;
  albums: Albums;
  artists: Artists;
  playlists: Playlists;
}

export interface TopQuery {
  results: Result[];
  position: number;
}

export interface Result {
  id: string;
  title: string;
  image: Image[];
  url: string;
  type: string;
  description: string;
  position: number;
}

export interface Image {
  quality: string;
  link: string;
}

export interface Songs {
  results: Result[];
  position: number;
}

export interface Albums {
  results: Result[];
  position: number;
}

export interface Artists {
  results: Result[];
  position: number;
}

export interface Playlists {
  results: Result[];
  position: number;
}

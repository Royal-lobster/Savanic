export interface Root {
  status: string;
  message: any;
  data: ModuleData;
}

export interface ModuleData {
  albums: Album[];
  playlists: Playlist[];
  charts: Chart[];
  trending: Trending;
}

export interface Album {
  id: string;
  name: string;
  year: string;
  type: string;
  playCount: string;
  language: string;
  explicitContent: string;
  songCount: string;
  url: string;
  primaryArtists: any[];
  featuredArtists: any[];
  artists: Artist[];
  image: Image[];
  songs: any[];
}

export interface Artist {
  id: string;
  name: string;
  url: string;
  image: boolean;
  type: string;
  role: string;
}

export interface Image {
  quality: string;
  link: string;
}

export interface Playlist {
  id: string;
  userId: string;
  title: string;
  subtitle: string;
  type: string;
  image: Image[];
  url: string;
  songCount: string;
  firstname: string;
  followerCount: string;
  lastUpdated: string;
  explicitContent: string;
}

export interface Chart {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  image: Image[];
  url: string;
  firstname: string;
  explicitContent: string;
  language: string;
}

export interface Trending {
  songs: Song[];
  albums: Album3[];
}

export interface Song {
  id: string;
  name: string;
  type: string;
  album: Album2;
  year: string;
  releaseDate: string;
  duration: string;
  label: string;
  primaryArtists: PrimaryArtist[];
  featuredArtists: any[];
  explicitContent: string;
  playCount: string;
  language: string;
  url: string;
  image: Image4[];
}

export interface Album2 {
  id: string;
  name: string;
  url: string;
}

export interface PrimaryArtist {
  id: string;
  name: string;
  url: string;
  image: any;
  type: string;
  role: string;
}

export interface Image4 {
  quality: string;
  link: string;
}

export interface Album3 {
  id: string;
  name: string;
  type: string;
  year: string;
  releaseDate: string;
  playCount: string;
  language: string;
  explicitContent: string;
  songCount: string;
  url: string;
  primaryArtists: any[];
  featuredArtists: any[];
  artists: Artist2[];
  image: Image[];
}

export interface Artist2 {
  id: string;
  name: string;
  url: string;
  image: any;
  type: string;
  role: string;
}

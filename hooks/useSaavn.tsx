import useSWR from 'swr';
import urlcat from 'urlcat';
import type { ModuleData } from '../types/modules';
import type { AlbumData } from '../types/album';
import { SongData } from '../types/songs';
import { SearchAllData } from '../types/searchAll';

const fetcher = (...args: [any]) => fetch(...args).then((res) => res.json());

export enum PathOptions {
  modules = 'modules',
  albums = 'albums',
  songs = 'songs',
  playlists = 'playlists',
  searchAll = 'search/all',
}

type Data<T extends PathOptions> = T extends PathOptions.modules
  ? ModuleData
  : T extends PathOptions.albums
  ? AlbumData
  : T extends PathOptions.songs
  ? SongData[]
  : T extends PathOptions.playlists
  ? AlbumData
  : T extends PathOptions.searchAll
  ? SearchAllData
  : never;

const useSaavn = <T extends PathOptions>(path: T, queries: Record<string, string>) => {
  const { data, error, isLoading } = useSWR(
    urlcat('https://savanic-backend.vercel.app/', path, queries),
    fetcher
  );
  return {
    data: data?.data as Data<T>,
    isLoading,
    isError: error,
  };
};

export default useSaavn;

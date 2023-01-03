import create from 'zustand';
import { Song } from '../types/album';

export interface PlayerStore {
  isPaused: boolean;
  songData: null | Song;
  setSongData: (songData: Song) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  isPaused: false,
  songData: null,
  setSongData: (songData: Song) => set({ songData }),
}));

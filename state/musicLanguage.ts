import create from 'zustand';

export interface MusicLanguageStore {
  languages: string[];
}

export const useMusicLanguageStore = create<MusicLanguageStore>((set) => ({
  languages: ['English'],
  setLanguages: (languages: string[]) => set({ languages }),
}));

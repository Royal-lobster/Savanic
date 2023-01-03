import create from 'zustand';

export interface QueueStore {
  queue: string[];
  previousQueue: string[];
  nextSong: string | null;
  previousSong: string | null;
  setQueue: (songIds: string[]) => void;
  addToQueue: (songId: string) => void;
  popPreviousQueue: () => void;
  popQueue: () => void;
  clearQueue: () => void;
}

const MAX_QUEUE_LENGTH = 100;
const MAX_PREVIOUS_QUEUE_LENGTH = 50;

export const useQueueStore = create<QueueStore>((set) => ({
  queue: [],
  previousQueue: [],
  nextSong: null,
  previousSong: null,
  setQueue: (newQueue: string[]) => {
    set({ queue: newQueue.slice(0, MAX_QUEUE_LENGTH) });
  },
  addToQueue: (newQueue: string) => {
    set((state) => {
      const queue = state.queue.slice(0, MAX_QUEUE_LENGTH);
      if (queue.includes(newQueue)) {
        return { queue };
      }
      return { queue: [...queue, newQueue] };
    });
  },
  popPreviousQueue: () =>
    set((state) => {
      const newQueue = [...state.previousQueue.slice(-1), ...state.queue];
      return {
        queue: newQueue,
        previousQueue: state.previousQueue.slice(0, -1),
        nextSong: newQueue[0],
        previousSong: state.previousQueue[state.previousQueue.length - 1],
      };
    }),

  popQueue: () =>
    set((state) => {
      const newQueue = state.queue.slice(1);
      return {
        queue: newQueue,
        previousQueue: [...state.previousQueue, state.queue[0]].slice(-MAX_PREVIOUS_QUEUE_LENGTH),
        nextSong: newQueue[0],
        previousSong: state.queue[0],
      };
    }),
  clearQueue: () => set({ queue: [] }),
}));

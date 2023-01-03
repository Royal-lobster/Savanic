import { DownloadUrl } from '../types/album';

export enum AudioQuality {
  VERY_LOW = '12kbps',
  LOW = '48kbps',
  MEDIUM = '96kbps',
  HIGH = '160kbps',
  VERY_HIGH = '320kbps',
}

export const getAudioSrc = (audio: DownloadUrl[], quality = AudioQuality.HIGH) => {
  const audioSrc = audio.find((a) => a.quality === quality);
  return audioSrc?.link;
};

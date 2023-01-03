import { Image } from '../types/modules';

export enum ImageSize {
  SMALL = '50x50',
  MEDIUM = '150x150',
  LARGE = '500x500',
}
export const getImageSrc = (image: Image[], size: ImageSize) => {
  const img = image.find((i) => i.quality === size);
  return img?.link;
};

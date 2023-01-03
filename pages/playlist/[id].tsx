import React from 'react';
import { useRouter } from 'next/router';
import useSaavn, { PathOptions } from '../../hooks/useSaavn';
import SongsList from '../../components/songsList';
import { ImageSize, getImageSrc } from '../../utils/getImageSrc';

const AlbumPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading, isError } = useSaavn(PathOptions.playlists, { id: id as string });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <SongsList
      title={data.name}
      description={`By ${
        data.artists?.map((artist) => artist.name).join(', ') || data.primaryArtists
      }`}
      year={data.year}
      image={getImageSrc(data.image, ImageSize.LARGE) as string}
      songsList={data.songs}
    />
  );
};

export default AlbumPage;

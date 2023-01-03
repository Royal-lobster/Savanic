import { Stack } from '@mantine/core';
import React from 'react';
import type { Song } from '../../types/album';
import { SongsListHeaderCover } from './SongsListHeaderCover';
import { SongCard } from './SongCard';
import { usePlayerStore } from '../../state/player';
import { useQueueStore } from '../../state/queue';

const SongsList = ({
  title,
  image,
  year,
  description,
  songsList,
}: {
  title: string;
  image: string;
  year: string;
  description: string;
  songsList: Song[];
}) => {
  const setSongData = usePlayerStore((state) => state.setSongData);
  const setQueue = useQueueStore((state) => state.setQueue);

  const handlePlaySong = (song: Song) => {
    setSongData(song);
    const nextSongs = songsList.filter((s) => songsList.indexOf(s) >= songsList.indexOf(song));
    setQueue(nextSongs.map((s) => s.id));
  };
  return (
    <Stack spacing={20}>
      <SongsListHeaderCover image={image} title={title} year={year} description={description} />
      <Stack spacing={0} maw={900} mx="auto" w="100%">
        {songsList.map((song, i) => (
          <SongCard key={song.id} song={song} id={i + 1} playSong={() => handlePlaySong(song)} />
        ))}
      </Stack>
    </Stack>
  );
};

export default SongsList;

import { Stack } from '@mantine/core';
import React from 'react';
import type { Song } from '../../types/album';
import { SongsListHeaderCover } from './SongsListHeaderCover';
import { SongCard } from './SongCard';

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
}) => (
  <Stack spacing={20}>
    <SongsListHeaderCover image={image} title={title} year={year} description={description} />
    <Stack spacing={0} maw={900} mx="auto" w="100%">
      {songsList.map((song, i) => (
        <SongCard key={song.id} song={song} id={i + 1} />
      ))}
    </Stack>
  </Stack>
);

export default SongsList;

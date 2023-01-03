import React from 'react';
import { Flex, Loader, Stack, Text } from '@mantine/core';
import { IconPlayerPause } from '@tabler/icons';
import { Song } from '../../types/album';
import { usePlayerStore } from '../../state/player';

export const SongCard = ({ song, id }: { song: Song; id: number }) => {
  const isCurrent = usePlayerStore((state) => state.songData?.id) === song.id;
  const isPaused = usePlayerStore((state) => state.isPaused);
  const setSongData = usePlayerStore((state) => state.setSongData);

  return (
    <Flex
      p={20}
      sx={(theme) => ({
        borderTop: id !== 1 ? '1px solid' : 'none',
        borderTopColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
        ':hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
        },
      })}
      justify="space-between"
      onClick={() => setSongData(song)}
    >
      <Text
        sx={(theme) => ({
          flex: 0.2,
          '@media (max-width: 755px)': {
            flex: 0.3,
          },
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
        })}
      >
        {isCurrent ? (
          isPaused ? (
            <IconPlayerPause />
          ) : (
            <Loader p={0} m={0} variant="bars" size="xs" />
          )
        ) : (
          id
        )}
      </Text>
      <Stack
        spacing={0}
        sx={{
          flex: 1,
          '@media (max-width: 755px)': {
            flex: 2,
          },
        }}
      >
        <Text
          sx={(theme) => ({
            color: isCurrent ? theme.colors.blue[6] : 'unset',
          })}
          dangerouslySetInnerHTML={{ __html: song.name }}
        />
        <Text
          display={{ base: 'block', md: 'none' }}
          sx={(theme) => ({
            fontSize: theme.fontSizes.xs,
            textAlign: 'left',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          })}
        >
          {song.primaryArtists}
        </Text>
      </Stack>
      <Text
        display={{ base: 'none', md: 'block' }}
        sx={{
          flex: 1,
          textAlign: 'center',
          textOverflow: 'ellipsis',
          maxWidth: '100%',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {song.primaryArtists}
      </Text>
      <Text
        sx={{
          flex: 1,
          '@media (max-width: 755px)': {
            flex: 0.2,
          },
          textAlign: 'right',
        }}
      >
        {(Number(song.duration) / 60).toFixed(2)}
      </Text>
    </Flex>
  );
};
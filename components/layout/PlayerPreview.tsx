import React from 'react';
import { ActionIcon, Box, Flex, Text } from '@mantine/core';
import Image from 'next/image';
import {
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
} from '@tabler/icons';
import { usePlayerStore } from '../../state/player';
import { ImageSize, getImageSrc } from '../../utils/getImageSrc';

const PlayerPreview = () => {
  const isPaused = usePlayerStore((state) => state.isPaused);
  const data = usePlayerStore((state) => state.songData);
  if (!data) return null;

  return (
    <Box
      sx={{
        borderRadius: '10px',
        backdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(0.3, 0.3, 0.3, 0.5)',
        padding: '10px',
        marginInline: '10px',
      }}
    >
      <Flex align="center" justify="space-between">
        <Flex gap={20} align="center">
          <Image
            src={getImageSrc(data.image, ImageSize.MEDIUM) as string}
            alt={data.name}
            width={60}
            height={60}
            style={{ borderRadius: '4px' }}
          />
          <Box>
            <Text
              sx={{
                maxWidth: '200px',
                '@media (max-width: 755px)': {
                  maxWidth: '140px',
                },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
              dangerouslySetInnerHTML={{ __html: data?.name }}
            />
            <Text
              sx={(theme) => ({
                fontSize: theme.fontSizes.sm,
              })}
            >
              {data.primaryArtists}
            </Text>
          </Box>
        </Flex>
        <Flex mx={20}>
          <ActionIcon>
            <IconPlayerTrackPrev />
          </ActionIcon>
          <ActionIcon>{isPaused ? <IconPlayerPlay /> : <IconPlayerPause />}</ActionIcon>
          <ActionIcon>
            <IconPlayerTrackNext />
          </ActionIcon>
        </Flex>
      </Flex>
    </Box>
  );
};

export default PlayerPreview;

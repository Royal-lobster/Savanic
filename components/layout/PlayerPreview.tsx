import React, { useEffect, useMemo } from 'react';
import { ActionIcon, Box, Flex, Slider, Text } from '@mantine/core';
import Image from 'next/image';
import {
  IconPlayerPause,
  IconPlayerPlay,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
} from '@tabler/icons';
import { usePlayerStore } from '../../state/player';
import { ImageSize, getImageSrc } from '../../utils/getImageSrc';
import { getAudioSrc } from '../../utils/getAudioSrc';
import { useQueueStore } from '../../state/queue';
import { fetchSaavnSong } from '../../hooks/useSaavn';

const PlayerPreview = () => {
  const [progress, setProgress] = React.useState(0);

  const isPaused = usePlayerStore((state) => state.isPaused);
  const setIsPaused = usePlayerStore((state) => state.setIsPaused);
  const data = usePlayerStore((state) => state.songData);
  const setSongData = usePlayerStore((state) => state.setSongData);

  const nextSong = useQueueStore((state) => state.nextSong);
  const previousSong = useQueueStore((state) => state.previousSong);
  const popPreviousQueue = useQueueStore((state) => state.popPreviousQueue);
  const popQueue = useQueueStore((state) => state.popQueue);

  const audioPlayer = useMemo(() => {
    if (!data) return null;
    const audioSrc = getAudioSrc(data.downloadUrl);
    return new Audio(audioSrc);
  }, [data, nextSong]);

  const onPrev = () => {
    popPreviousQueue();
    if (previousSong) fetchSaavnSong(previousSong).then((song) => setSongData(song));
  };

  const onNext = () => {
    popQueue();
    if (nextSong) fetchSaavnSong(nextSong).then((song) => setSongData(song));
  };

  useEffect(() => {
    if (audioPlayer) {
      setProgress(0);
      setIsPaused(false);

      audioPlayer.currentTime = 0;
      audioPlayer.ontimeupdate = () => setProgress(audioPlayer.currentTime);
      audioPlayer.onended = onNext;

      audioPlayer.play();
    }
    return () => audioPlayer?.pause();
  }, [audioPlayer]);

  const onPlayToggle = () => {
    if (isPaused) {
      setIsPaused(false);
      audioPlayer?.play();
    } else {
      setIsPaused(true);
      audioPlayer?.pause();
    }
  };

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
          <ActionIcon onClick={onPrev}>
            <IconPlayerTrackPrev />
          </ActionIcon>
          <ActionIcon onClick={onPlayToggle}>
            {isPaused ? <IconPlayerPlay /> : <IconPlayerPause />}
          </ActionIcon>
          <ActionIcon onClick={onNext}>
            <IconPlayerTrackNext />
          </ActionIcon>
        </Flex>
      </Flex>
      <Slider
        label={null}
        value={progress}
        min={0}
        max={audioPlayer?.duration}
        onChange={(e) => {
          if (audioPlayer) audioPlayer.currentTime = e;
          setProgress(e);
        }}
        mt={10}
        size="xs"
      />
    </Box>
  );
};

export default PlayerPreview;

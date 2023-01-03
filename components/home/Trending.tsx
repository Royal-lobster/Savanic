import React from 'react';
import { Badge, Box, Flex, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import type { Song, Trending } from '../../types/modules';
import { ImageSize, getImageSrc } from '../../utils/getImageSrc';
import { usePlayerStore } from '../../state/player';
import useSaavn, { PathOptions } from '../../hooks/useSaavn';

const TrendingCard = ({
  key,
  imgSrc,
  title,
  subtitle,
  onClick,
  isAlbum = false,
}: {
  key: string;
  imgSrc: string;
  title: string;
  subtitle: string;
  onClick: () => void;
  isAlbum?: boolean;
}) => (
  <Flex
    key={key}
    sx={(theme) => ({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
      borderRadius: theme.radius.sm,
      overflow: 'hidden',
      cursor: 'pointer',
    })}
    gap={10}
    onClick={onClick}
  >
    <Box sx={{ position: 'relative', height: 80, width: 80, flexShrink: 0 }}>
      <Image src={imgSrc} layout="fill" objectFit="cover" alt="Norway" />
    </Box>
    <Stack justify="center" spacing={0} p={10} w="100%">
      <Flex justify="space-between" w="100%">
        <Text
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            maxWidth: 200,
          }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {isAlbum && <Badge size="xs">Album</Badge>}
      </Flex>
      <Text
        size="sm"
        sx={(theme) => ({
          color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          maxWidth: 200,
        })}
      >
        {subtitle}
      </Text>
    </Stack>
  </Flex>
);

const TrendingSongCard = ({ song }: { song: Song }) => {
  const { data } = useSaavn(PathOptions.songs, { id: song.id });
  const setSongData = usePlayerStore((state) => state.setSongData);

  return (
    <TrendingCard
      key={song.id}
      imgSrc={getImageSrc(song.image, ImageSize.LARGE) as string}
      title={song.name}
      subtitle={song.primaryArtists.map((artist) => artist.name).join(', ')}
      onClick={() => setSongData(data[0])}
    />
  );
};

const Trending = ({ data }: { data: Trending }) => {
  const router = useRouter();
  return (
    <Box>
      <Title order={1} weight="bold">
        Trending
      </Title>
      <SimpleGrid
        cols={3}
        mt={20}
        spacing="lg"
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: 'md' },
          { maxWidth: 760, cols: 1, spacing: 'sm' },
        ]}
      >
        {data.songs.map((song) => (
          <TrendingSongCard song={song} />
        ))}

        {data.albums
          .filter((d) => /(^\d{8}$)/.test(d.id))
          .map((album) => (
            <TrendingCard
              key={album.id}
              imgSrc={getImageSrc(album.image, ImageSize.LARGE) as string}
              title={album.name}
              subtitle={album.artists.map((artist) => artist.name).join(', ')}
              onClick={() => router.push(`/album/${album.id}`)}
              isAlbum
            />
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default Trending;

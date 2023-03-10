import { Text, Flex, Stack, Badge, LoadingOverlay, Box } from '@mantine/core';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ImageSize, getImageSrc } from '../../utils/getImageSrc';
import { Result } from '../../types/searchAll';
import useSaavn, { PathOptions } from '../../hooks/useSaavn';
import { usePlayerStore } from '../../state/player';
import { shortenText } from '../../utils/shortenText';

export const SearchResultCard = ({ result }: { result: Result }) => {
  const isCurrent = usePlayerStore((state) => state.songData?.id) === result.id;
  const queryPath = result.type === 'song' ? PathOptions.songs : PathOptions.None;
  const setSongData = usePlayerStore((state) => state.setSongData);
  const { data } = useSaavn(queryPath, { id: result.id });
  const router = useRouter();
  const badgeColor = (type: string) => {
    switch (type) {
      case 'song':
        return 'blue';
      case 'playlist':
        return 'green';
      case 'album':
        return 'red';
      case 'artist':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  const handleResultClick = () => {
    switch (result.type) {
      case 'song':
        setSongData(data[0]);
        break;
      case 'playlist':
        router.push(`/playlist/${result.id}`);
        break;
      case 'album':
        router.push(`/album/${result.id}`);
        break;
      case 'artist':
        router.push(`/artist/${result.id}`);
        break;
    }
  };

  return (
    <Flex
      sx={(theme) => ({
        border: `1px solid ${theme.colors.gray[9]}`,
        borderRadius: theme.radius.sm,
        overflow: 'hidden',
      })}
      align="center"
      justify="space-between"
      key={result.id}
      onClick={handleResultClick}
    >
      <Flex gap={20} align="center">
        <Box sx={{ position: 'relative' }}>
          <LoadingOverlay
            loaderProps={{ variant: 'bars', size: 'sm' }}
            visible={isCurrent}
            overlayBlur={2}
          />
          <Box h="80px" w="80px" sx={{ flexShrink: 0 }}>
            <Image
              height="80px"
              width="80px"
              objectFit="cover"
              src={getImageSrc(result.image, ImageSize.MEDIUM) as string}
            />
          </Box>
        </Box>
        <Stack spacing={0}>
          <Flex gap={10}>
            <Text size="lg" dangerouslySetInnerHTML={{ __html: shortenText(result.title, 40) }} />
          </Flex>
          <Text
            size="sm"
            dangerouslySetInnerHTML={{ __html: shortenText(result.description, 40) }}
          />
        </Stack>
      </Flex>
      <Badge
        sx={{
          flexShrink: 0,
        }}
        mr={20}
        color={badgeColor(result.type)}
        variant="dot"
      >
        {result.type}
      </Badge>
    </Flex>
  );
};

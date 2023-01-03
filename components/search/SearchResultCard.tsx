import { Text, Flex, Stack, Badge } from '@mantine/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ImageSize, getImageSrc } from '../../utils/getImageSrc';
import { Result } from '../../types/searchAll';
import useSaavn, { PathOptions } from '../../hooks/useSaavn';
import { usePlayerStore } from '../../state/player';

export const SearchResultCard = ({ result }: { result: Result }) => {
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
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2],
        borderRadius: theme.radius.sm,
        overflow: 'hidden',
      })}
      align="center"
      justify="space-between"
      key={result.id}
      onClick={handleResultClick}
    >
      <Flex gap={20} align="center">
        <Image
          style={{
            flexShrink: 0,
          }}
          src={getImageSrc(result.image, ImageSize.MEDIUM) as string}
          width={80}
          height={80}
        />
        <Stack maw="75%" spacing={0}>
          <Text size="lg" dangerouslySetInnerHTML={{ __html: result.title }} />
          <Text size="sm" dangerouslySetInnerHTML={{ __html: result.description }} />
        </Stack>
      </Flex>
      <Badge
        sx={{
          flexShrink: 0,
        }}
        mr={20}
        color={badgeColor(result.type)}
        variant="outline"
      >
        {result.type}
      </Badge>
    </Flex>
  );
};

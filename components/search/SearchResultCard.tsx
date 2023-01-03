import { Text, Flex, Stack, Badge } from '@mantine/core';
import Image from 'next/image';
import { ImageSize, getImageSrc } from '../../utils/getImageSrc';
import { Result } from '../../types/searchAll';

export const SearchResultCard = ({ result }: { result: Result }) => {
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

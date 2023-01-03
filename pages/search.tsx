import { Divider, Title, Stack, SimpleGrid } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { shortenText } from '../utils/shortenText';
import useSaavn, { PathOptions } from '../hooks/useSaavn';
import { SearchResultCard } from '../components/search/SearchResultCard';

const search = () => {
  const router = useRouter();
  const { q } = router.query;
  useEffect(() => {
    if (!q) router.push('/');
  }, [q]);

  const { data, isLoading, isError } = useSaavn(PathOptions.searchAll, { query: q as string });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!data) return null;

  return (
    <Stack>
      <Title mb={10} order={1}>
        Results for &quot;{shortenText(q as string, 125)}&quot;
      </Title>
      {data.topQuery.results.map((result) => (
        <SearchResultCard result={result} />
      ))}

      {data.songs.results.length !== 0 && (
        <>
          <Title mt={20} order={2}>
            Songs
          </Title>
          <Divider />
          <SimpleGrid cols={2} spacing={20}>
            {data.songs.results.map((song) => (
              <SearchResultCard result={song} />
            ))}
          </SimpleGrid>
        </>
      )}
      {data.artists.results.length !== 0 && (
        <>
          <Title order={2}>Artists</Title>
          <Divider />
          <SimpleGrid cols={2} spacing={20}>
            {data.artists.results.map((artist) => (
              <SearchResultCard result={artist} />
            ))}
          </SimpleGrid>
        </>
      )}
      {data.albums.results.length !== 0 && (
        <>
          <Title order={2}>Albums</Title>
          <Divider />
          <SimpleGrid cols={2} spacing={20}>
            {data.albums.results.map((album) => (
              <SearchResultCard result={album} />
            ))}
          </SimpleGrid>
        </>
      )}
      {data.playlists.results.length !== 0 && (
        <>
          <Title order={2}>Playlists</Title>
          <Divider />
          <SimpleGrid cols={2} spacing={20}>
            {data.playlists.results.map((playlist) => (
              <SearchResultCard result={playlist} />
            ))}
          </SimpleGrid>
        </>
      )}
    </Stack>
  );
};

export default search;

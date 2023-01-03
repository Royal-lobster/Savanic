import { Title, Stack, SimpleGrid } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { shortenText } from '../utils/shortenText';
import useSaavn, { PathOptions } from '../hooks/useSaavn';
import { SearchResultCard } from '../components/search/SearchResultCard';
import { Result } from '../types/searchAll';
import Loading from '../components/layout/Loading';

const SearchSection = ({ results, title }: { results: Result[]; title: string }) => (
  <>
    <Title
      sx={(theme) => ({
        borderBottom: `1px solid ${theme.colors.gray[9]}`,
        paddingBottom: theme.spacing.md,
      })}
      mt={20}
      order={2}
    >
      {title}
    </Title>
    <SimpleGrid
      cols={2}
      breakpoints={[
        { maxWidth: 980, cols: 2, spacing: 'md' },
        { maxWidth: 760, cols: 1, spacing: 'sm' },
      ]}
      spacing={20}
    >
      {results.map((result) => (
        <SearchResultCard result={result} />
      ))}
    </SimpleGrid>
  </>
);

const search = () => {
  const router = useRouter();
  const { q } = router.query;
  useEffect(() => {
    if (!q) router.push('/');
  }, [q]);

  const { data, isLoading, isError } = useSaavn(PathOptions.searchAll, { query: q as string });

  if (isLoading) return <Loading />;
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
        <SearchSection results={data.songs.results} title="Songs" />
      )}
      {data.artists.results.length !== 0 && (
        <SearchSection results={data.artists.results} title="Artists" />
      )}
      {data.albums.results.length !== 0 && (
        <SearchSection results={data.albums.results} title="Albums" />
      )}
      {data.playlists.results.length !== 0 && (
        <SearchSection results={data.playlists.results} title="Playlists" />
      )}
    </Stack>
  );
};

export default search;

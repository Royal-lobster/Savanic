import { Stack } from '@mantine/core';
import useSaavn, { PathOptions } from '../hooks/useSaavn';
import Charts from '../components/home/Charts';
import Trending from '../components/home/Trending';
import { useMusicLanguageStore } from '../state/musicLanguage';
import Albums from '../components/home/Albums';
import Loading from '../components/layout/Loading';

export default function HomePage() {
  const musicLanguages = useMusicLanguageStore((state) => state.languages);
  const { data, isLoading, isError } = useSaavn(PathOptions.modules, {
    language: musicLanguages.map((l) => l.toLowerCase()).join(','),
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Error</div>;

  return (
    <Stack spacing={40}>
      <Albums data={data.albums} />
      <Trending data={data.trending} />
      <Charts data={data.charts} />
    </Stack>
  );
}

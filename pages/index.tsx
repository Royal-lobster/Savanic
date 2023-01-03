import { Stack } from '@mantine/core';
import useSaavn, { PathOptions } from '../hooks/useSaavn';
import Charts from '../components/home/Charts';
import Trending from '../components/home/Trending';
import { useMusicLanguageStore } from '../state/musicLanguage';

export default function HomePage() {
  const musicLanguages = useMusicLanguageStore((state) => state.languages);
  const { data, isLoading, isError } = useSaavn(PathOptions.modules, {
    language: musicLanguages.map((l) => l.toLowerCase()).join(','),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  console.log(data.charts);
  return (
    <Stack spacing={40}>
      <Trending data={data.trending} />
      <Charts data={data.charts} />
    </Stack>
  );
}

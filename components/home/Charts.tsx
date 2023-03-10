import React from 'react';
import { Box, Card, SimpleGrid, Text, Title } from '@mantine/core';
import Image from 'next/image';
import { NextLink } from '@mantine/next';
import type { Chart } from '../../types/modules';
import { ImageSize, getImageSrc } from '../../utils/getImageSrc';

const Charts = ({ data }: { data: Chart[] }) => (
  <Box>
    <Title order={1} weight="bold">
      Charts
    </Title>
    <SimpleGrid
      cols={6}
      mt={20}
      spacing="lg"
      breakpoints={[
        { maxWidth: 980, cols: 4, spacing: 'md' },
        { maxWidth: 755, cols: 3, spacing: 'sm' },
        { maxWidth: 600, cols: 2, spacing: 'sm' },
      ]}
    >
      {data.map((chart) => (
        <NextLink
          href={`/playlist/${chart.id}`}
          style={{
            textDecoration: 'none',
            color: 'inherit',
            height: '100%',
          }}
        >
          <Card key={chart.id} h="100%">
            <Card.Section mb={10} sx={{ position: 'relative', height: 180 }}>
              <Image
                src={getImageSrc(chart.image, ImageSize.LARGE) as string}
                layout="fill"
                objectFit="cover"
                alt="Norway"
              />
            </Card.Section>
            <Text>{chart.title}</Text>
            <Text size="sm" color="gray">
              {chart.subtitle}
            </Text>
          </Card>
        </NextLink>
      ))}
    </SimpleGrid>
  </Box>
);

export default Charts;

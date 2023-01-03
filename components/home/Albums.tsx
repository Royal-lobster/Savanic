import React from 'react';
import { Carousel } from '@mantine/carousel';
import { BackgroundImage, Box, Text } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { Album } from '../../types/modules';
import { ImageSize, getImageSrc } from '../../utils/getImageSrc';

const Albums = ({ data }: { data: Album[] }) => (
  <Carousel
    withIndicators
    height={200}
    slideSize="33.333333%"
    slideGap="md"
    breakpoints={[
      { maxWidth: 'md', slideSize: '50%' },
      { maxWidth: 'sm', slideSize: '100%', slideGap: 0 },
    ]}
    loop
    align="start"
  >
    {data
      .filter((d) => /(^\d{8}$)/.test(d.id))
      .map((album) => (
        <Carousel.Slide key={album.id} sx={{ position: 'relative' }}>
          <NextLink href={`/album/${album.id}`} style={{ height: '100%', textDecoration: 'none' }}>
            <BackgroundImage
              radius="md"
              src={getImageSrc(album.image, ImageSize.LARGE) as string}
              h="100%"
            >
              <Box bg="#00000029" p={10}>
                <Text
                  color="white"
                  sx={{ fontSize: '1.6rem' }}
                  weight="bolder"
                  dangerouslySetInnerHTML={{ __html: album.name }}
                />
                <Text
                  color="white"
                  sx={{ fontSize: '1rem' }}
                  dangerouslySetInnerHTML={{
                    __html: album.artists
                      .map((a) => a.name)
                      .splice(0, 3)
                      .join(','),
                  }}
                />
              </Box>
            </BackgroundImage>
          </NextLink>
        </Carousel.Slide>
      ))}
  </Carousel>
);

export default Albums;

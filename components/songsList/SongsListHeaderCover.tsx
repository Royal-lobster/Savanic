import { BackgroundImage, Box, Flex, Text, Title } from '@mantine/core';
import React from 'react';
import Image from 'next/image';

export const SongsListHeaderCover = ({
  image,
  year,
  description,
  title,
}: {
  image: string;
  description: string;
  title: string;
  year: string;
}) => (
  <BackgroundImage
    src={image}
    sx={(theme) => ({
      borderRadius: theme.radius.md,
      overflow: 'hidden',
    })}
  >
    <Flex
      sx={(theme) => ({
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        borderRadius: theme.radius.md,
      })}
      gap={{ base: 20, md: 30 }}
      p={20}
      align="center"
    >
      <Box
        sx={{
          flexShrink: 0,
          width: '200px',
          height: '200px',
          '@media (max-width: 755px)': {
            width: '100px',
            height: '100px',
          },
          position: 'relative',
        }}
      >
        <Image src={image} layout="fill" />
      </Box>
      <Box sx={{ flex: 3 }}>
        <Title
          sx={{
            fontSize: '2.2rem',
            '@media (max-width: 755px)': {
              fontSize: '1.2rem',
            },
          }}
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
        <Text
          sx={{
            fontSize: '1.8rem',
            '@media (max-width: 755px)': {
              fontSize: '1rem',
            },
          }}
        >
          {year}
        </Text>
        <Text mt={10}>{description}</Text>
      </Box>
    </Flex>
  </BackgroundImage>
);

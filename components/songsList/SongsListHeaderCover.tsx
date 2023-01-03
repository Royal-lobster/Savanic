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
      sx={{
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
      }}
      gap={30}
      p={20}
      align="center"
    >
      <Image src={image} width={200} height={200} />
      <Box>
        <Title
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />
        <Text
          sx={(theme) => ({
            fontSize: theme.fontSizes.xl,
          })}
        >
          {year}
        </Text>
        <Text mt={10}>{description}</Text>
      </Box>
    </Flex>
  </BackgroundImage>
);

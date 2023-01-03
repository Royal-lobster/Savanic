import { Box, Stack, Text, createStyles } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  footerWrapper: {
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
  },
  footerContainer: {
    maxWidth: 1200,
    margin: '0 auto',
  },
  description: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[6],
    fontSize: 12,
  },
  descriptionLink: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[6],
    linkStyle: 'none',
    textDecoration: 'none',
    borderBottom: '1px solid',
    borderColor: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[6],
  },
}));

const Footer = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.footerWrapper}>
      <Stack align="center" spacing={2} p={20} className={classes.footerContainer}>
        <Text>Designed and Build by Srujan.</Text>
        <Text className={classes.description}>
          All music and music assets are fetched from{' '}
          <a className={classes.descriptionLink} href="https://www.jiosaavn.com/">
            Jio Savan
          </a>{' '}
          from{' '}
          <a className={classes.descriptionLink} href="https://saavn.me/">
            Unofficial API
          </a>
        </Text>
      </Stack>
    </Box>
  );
};

export default Footer;

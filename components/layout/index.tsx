import React from 'react';
import { Box, Stack, createStyles } from '@mantine/core';
import Navbar from './Navbar';
import Footer from './Footer';
import PlayerPreview from './PlayerPreview';

const useStyles = createStyles(() => ({
  layoutWrapper: {
    minHeight: '100vh',
  },
  footer: {
    marginTop: 'auto',
  },
  content: {
    minHeight: 'calc(100vh - 360px)',
  },
  player: {
    position: 'sticky',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    maxWidth: 800,
    marginInline: 'auto',
    width: '100%',
    transform: 'translateY(-10px)',
    marginTop: 'auto',
  },
}));

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { classes } = useStyles();
  return (
    <Stack className={classes.layoutWrapper}>
      <Navbar />
      <Box className={classes.content} maw={1200} mx="auto" w="100%" p={20}>
        {children}
      </Box>
      <Box className={classes.player}>
        <PlayerPreview />
      </Box>
      <footer className={classes.footer}>
        <Footer />
      </footer>
    </Stack>
  );
};

export default Layout;

import {
  Button,
  Flex,
  Input,
  MultiSelect,
  Popover,
  Text,
  ThemeIcon,
  Box,
  createStyles,
} from '@mantine/core';
import { NextLink } from '@mantine/next';
import { IconLanguage, IconMusic, IconSearch } from '@tabler/icons';
import React from 'react';
import { useMusicLanguageStore } from '../../state/musicLanguage';

const useStyles = createStyles((theme) => ({
  navWrapper: {
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
    alignContent: 'center',
    justifyContent: 'center',
    paddingBottom: 0,
    '@media (max-width: 580px)': {
      paddingBottom: 20,
    },
  },
  navContainer: {
    maxWidth: 1200,
    margin: '0 auto',
  },
}));

const Navbar = () => {
  const { classes } = useStyles();
  const musicLanguages = useMusicLanguageStore((state) => state.languages);

  const languagesList = [
    'Hindi',
    'English',
    'Punjabi',
    'Tamil',
    'Telugu',
    'Marathi',
    'Gujarati',
    'Bengali',
    'Kannada',
    'Bhojpuri',
    'Malayalam',
    'Urdu',
    'Haryanvi',
    'Rajasthani',
    'Odia',
    'Assamese',
  ];

  return (
    <Box className={classes.navWrapper}>
      <Flex p={20} justify="space-between" align="center" className={classes.navContainer}>
        <NextLink href="/" style={{ textDecoration: 'none', color: 'unset' }}>
          <Flex gap={10} align="center">
            <ThemeIcon>
              <IconMusic size={20} />
            </ThemeIcon>
            <Text size="xl" weight="bold">
              Savanic
            </Text>
          </Flex>
        </NextLink>

        <Input
          icon={<IconSearch size={20} />}
          w="100%"
          mx={20}
          maw={500}
          display={{ base: 'none', xs: 'block' }}
          placeholder="Search Music"
        />

        <Popover width={300} position="bottom" withArrow shadow="md">
          <Popover.Target>
            <Button variant="light" leftIcon={<IconLanguage size={20} />}>
              Music Language
            </Button>
          </Popover.Target>
          <Popover.Dropdown>
            <Text size="sm" mb={10}>
              Select you preferred music languages
            </Text>
            <MultiSelect
              icon={<IconLanguage />}
              placeholder="Music Languages"
              value={musicLanguages || ['English']}
              onChange={(value) => useMusicLanguageStore.setState({ languages: value })}
              data={languagesList}
            />
          </Popover.Dropdown>
        </Popover>
      </Flex>
      <Box>
        <Input
          icon={<IconSearch size={20} />}
          w="90%"
          mx="auto"
          maw={500}
          display={{ base: 'block', xs: 'none' }}
          placeholder="Search Music"
        />
      </Box>
    </Box>
  );
};

export default Navbar;

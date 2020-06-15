import React from 'react'
import { Image, Box, Flex, Text, Heading } from 'rebass'
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaSpotify,
} from 'react-icons/fa'

import SocialLink from './SocialLink'

const Hero = () => {
  return (
    <Flex flexDirection="column" alignItems="center" mx="auto" py={6}>
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'backgroundInverse',
          maxWidth: 'md',
          maxHeight: 'md',
          borderRadius: 'full',
          overflow: 'hidden',
          marginBottom: 4,
        }}
      >
        <Image
          sx={{
            transform: 'translateY(8px)',
          }}
          src="/sebastiaan-scheers.png"
        />
      </Box>
      <Heading as="h1" fontSize="2xl" mb={2}>
        Sebastiaan Scheers
      </Heading>
      <Text>Freelance Front-end Developer</Text>
      <Flex py={2}>
        <SocialLink
          icon={FaLinkedin}
          href="https://linkedin.com/in/sebasscheers"
        />
        <SocialLink icon={FaGithub} href="https://github.com/zwooosh" />
        <SocialLink icon={FaTwitter} href="https://twitter.com/zwooosh" />
        <SocialLink
          icon={FaInstagram}
          href="https://instagram.com/zeebaarstiaan"
        />
        <SocialLink
          icon={FaSpotify}
          href="https://open.spotify.com/user/zeebaarstiaan"
        />
      </Flex>
    </Flex>
  )
}

export default Hero

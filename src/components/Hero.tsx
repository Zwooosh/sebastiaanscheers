import React from 'react'
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaSpotify,
} from 'react-icons/fa'

import SocialLink from './SocialLink'
import Image from './Image'
import { Space, Flex, Box, Heading, Text } from './styled'
import { AspectRatio } from './AspectRatio'

const Hero = () => {
  return (
    <Flex flexDirection="column" alignItems="center" mx="auto" py={6}>
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'backgroundInverse',
          width: 'md',
          height: 'md',
          borderRadius: 'full',
          overflow: 'hidden',
          marginBottom: 4,
        }}
      >
        <AspectRatio>
          <Image
            sx={{
              transform: 'translateY(8px)',
            }}
            src={require('images/profile.png')}
            fallbackSrc={require('images/profile.png?lqip')}
          />
        </AspectRatio>
      </Box>
      <Heading as="h1" fontSize="3xl" textAlign="center" mb={2}>
        Sebastiaan Scheers
      </Heading>
      <Text>Freelance Front-end Developer</Text>
      <Flex py={4}>
        <Space mx={1}>
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
        </Space>
      </Flex>
    </Flex>
  )
}

export default Hero

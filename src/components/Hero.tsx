import React from 'react'
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaSpotify,
} from 'react-icons/fa'
import { motion } from 'framer-motion'

import { fadeInUp } from 'shared/animations'
import {
  Space,
  MotionBox,
  MotionFlex,
  Heading,
  Text,
  IBoxProps,
  Flex,
} from './styled'
import AspectRatio from './AspectRatio'
import Image from './Image'
import SocialLink from './SocialLink'

const Hero = (props: IBoxProps) => {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      mx="auto"
      py={6}
      {...props}
    >
      <MotionBox
        sx={{
          position: 'relative',
          backgroundColor: 'backgroundInverse',
          size: ['xs', 'sm', 'md'],
          borderRadius: 'full',
          overflow: 'hidden',
          marginBottom: 4,
          transition: 'background-color 0.2s ease',
        }}
        variants={fadeInUp}
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
      </MotionBox>
      <motion.div variants={fadeInUp}>
        <Heading as="h1" textAlign="center" mb={2}>
          Sebastiaan Scheers
        </Heading>
      </motion.div>
      <motion.div variants={fadeInUp}>
        <Text>Freelance Front-end Developer</Text>
      </motion.div>
      <MotionFlex variants={fadeInUp} py={4}>
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
      </MotionFlex>
    </Flex>
  )
}

export default Hero

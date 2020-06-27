import {
  DiHtml5,
  DiJsBadge,
  DiNodejsSmall,
  DiNpm,
  DiSass,
  DiTerminal,
  DiReact,
  DiJira,
} from 'react-icons/di'
import { motion } from 'framer-motion'

import { __DEV__ } from 'shared/utils'
import { ISkill } from 'shared/types'
import { fadeInUp } from 'shared/animations'
import { Flex, Box, Heading, IBoxProps } from './styled'
import SkillBlock from './SkillBlock'

const skills: ISkill[] = [
  {
    icon: DiHtml5,
    iconColor: '#E66845',
    title: 'HTML5 & CSS3',
    description: 'The base of web development.',
  },
  {
    icon: DiSass,
    iconColor: '#BF4080',
    title: 'Styling',
    description: 'SCSS, Styled Components or Emotion.',
  },
  {
    icon: DiJsBadge,
    iconColor: '#FFEB00',
    title: 'Javascript',
    description: 'Javascript + Typescript.',
  },
  {
    icon: DiReact,
    iconColor: '#61DBFB',
    title: 'React',
    description: 'React, Redux, Storybook & Next.js.',
  },
  {
    icon: DiNodejsSmall,
    iconColor: '#026E00',
    title: 'Node.js',
    description: 'Full-stack with Node.js & Postgress.',
  },
  {
    icon: DiTerminal,
    iconColor: '#F05033',
    title: 'CI/CD',
    description: 'Docker, Jest, Cypress & Azure.',
  },
  {
    icon: DiNpm,
    iconColor: '#C9262D',
    title: 'GIT & NPM',
    description: 'GIT, NPM, Yarn & Bash.',
  },
  {
    icon: DiJira,
    iconColor: '#033465',
    title: 'SCRUM',
    description: 'Agile, Scrum, Jira & DevOps.',
  },
]

const SkillList = (props: IBoxProps) => {
  return (
    <Box {...props}>
      <motion.div variants={fadeInUp}>
        <Heading>Skills.</Heading>
      </motion.div>
      <Flex mx={-2} my={[-2, null, -4]} flexWrap="wrap">
        {skills.map((skill, i) => (
          <Box
            key={i}
            width={['100%', null, 1 / 2, 1 / 3, 1 / 4]}
            px={2}
            py={[2, null, 4]}
          >
            <SkillBlock {...skill} />
          </Box>
        ))}
      </Flex>
    </Box>
  )
}

if (__DEV__) SkillList.displayName = 'SkillList'

export default SkillList

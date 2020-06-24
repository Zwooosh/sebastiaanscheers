import { ISkill } from 'shared/types'
import { Box, Text, MotionFlex } from './styled'

const SkillBlock = ({ icon, iconColor, title, description }: ISkill) => {
  return (
    <MotionFlex
      flexDirection="column"
      height="full"
      whileHover="scale"
      variants={{
        initial: { y: 50, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: 50, opacity: 0 },
        scale: { scale: 1.03, transition: { type: 'spring', stiffness: 500 } },
      }}
    >
      <Text display="flex" alignItems="center" fontWeight="semibold" mb={1}>
        <Box
          as={icon}
          sx={{
            mr: 2,
            color: iconColor,
            fontSize: '2xl',
          }}
        />
        {title}
      </Text>
      <Box
        sx={{
          bg: 'backgroundAccent',
          borderRadius: 'md',
          p: 4,
          fontSize: 'sm',
          fontFamily: 'mono',
          color: 'textSoft',
          flex: '1',
        }}
      >
        {description}
      </Box>
    </MotionFlex>
  )
}

export default SkillBlock

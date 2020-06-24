import { ISkill } from 'shared/types'
import { Box, Text, Flex } from './styled'

const SkillBlock = ({ icon, iconColor, title, description }: ISkill) => {
  return (
    <Flex flexDirection="column" height="full">
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
    </Flex>
  )
}

export default SkillBlock

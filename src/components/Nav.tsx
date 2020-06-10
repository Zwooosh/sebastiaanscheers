import { Box, Text, Flex } from 'rebass'
import Container from './core/Container'

const Nav = () => {
  return (
    <Box
      sx={{
        borderBottom: '1px solid white',
      }}
    >
      <Container justifyContent="space-between">
        <Flex>
          <Text>About me</Text>
          <Text>projects</Text>
        </Flex>
        <Text>Logo</Text>
        <Text>contact</Text>
      </Container>
    </Box>
  )
}

export default Nav

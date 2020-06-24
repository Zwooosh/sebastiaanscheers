import { Flex } from '../styled'

const Container = (props) => {
  return (
    <Flex
      maxWidth="container.2xl"
      mx="auto"
      px="4"
      flexDirection="column"
      {...props}
    />
  )
}

export default Container

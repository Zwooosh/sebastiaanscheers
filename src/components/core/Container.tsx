import { Flex, FlexProps } from 'rebass'

const Container: React.FC<FlexProps> = (props) => {
  return <Flex maxWidth="container.2xl" mx="auto" px="4" {...props} />
}

export default Container

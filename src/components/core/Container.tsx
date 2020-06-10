import { Flex, FlexProps } from 'rebass'

const Container: React.FC<FlexProps> = (props) => {
  return <Flex maxWidth="container.xl" mx="auto" px="3" {...props} />
}

export default Container

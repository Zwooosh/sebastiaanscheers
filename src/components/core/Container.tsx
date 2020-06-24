import { __DEV__ } from 'shared/utils'
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

if (__DEV__) Container.displayName = 'Container'

export default Container

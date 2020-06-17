import { FC } from 'react'

import { IBoxProps, Flex, Box } from '../styled'
import Meta from './Meta'
import Nav from '../Nav'
import Footer from './Footer'

interface IProps extends IBoxProps {
  fullScreen?: boolean
}

const Layout: FC<IProps> = ({ children, fullScreen, ...rest }) => {
  return (
    <>
      <Meta />
      <Flex flexDirection="column" height="100%" {...rest}>
        {!fullScreen && <Nav />}
        <Box as="main" flex="1">
          {children}
        </Box>
        {!fullScreen && <Footer />}
      </Flex>
    </>
  )
}

export default Layout

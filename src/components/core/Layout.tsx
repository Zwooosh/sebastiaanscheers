import React from 'react'
import { Box, Flex, FlexProps } from 'rebass'

import Meta from './Meta'
import Nav from '../Nav'
import Footer from './Footer'

interface IProps extends FlexProps {
  fullScreen?: boolean
}

const Layout: React.FC<IProps> = ({ children, fullScreen, ...rest }) => {
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

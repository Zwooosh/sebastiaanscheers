import React from 'react'
import { Box, Flex, FlexProps } from 'rebass'

import Meta from './Meta'
import Nav from '../Nav'
import Footer from './Footer'

interface IProps extends FlexProps {
  hideNav?: boolean
}

const Layout: React.FC<IProps> = ({ children, hideNav, ...rest }) => {
  return (
    <>
      <Meta />
      <Flex flexDirection="column" height="100%" {...rest}>
        {!hideNav && <Nav />}
        <Box as="main" flex="1">
          {children}
        </Box>
        <Footer />
      </Flex>
    </>
  )
}

export default Layout

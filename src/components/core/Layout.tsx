import React from 'react'
import { Box, Flex, FlexProps } from 'rebass'

import Meta from './Meta'
import Footer from './Footer'

const Layout: React.FC<FlexProps> = ({ children, ...rest }) => {
  return (
    <>
      <Meta />
      <Flex flexDirection="column" height="100%" {...rest}>
        <Box as="main" flex="1">
          {children}
        </Box>
        <Footer />
      </Flex>
    </>
  )
}

export default Layout

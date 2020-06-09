import React from 'react'
import { Box, BoxProps } from 'rebass'

import Meta from './Meta'

const Layout: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <>
      <Meta />
      <Box height="100%" {...rest}>
        <main>{children}</main>
      </Box>
    </>
  )
}

export default Layout

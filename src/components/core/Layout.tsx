import { FC } from 'react'

import { __DEV__ } from 'shared/utils'
import { fadeInOut } from 'shared/animations'
import { IBoxProps, Flex, MotionBox } from '../styled'
import Meta from './Meta'
import Nav from '../Nav'
import Footer from './Footer'

interface IProps extends IBoxProps {
  fullScreen?: boolean
}

const Layout: FC<IProps> = ({ children, fullScreen, ...rest }) => {
  return (
    <MotionBox initial="initial" animate="animate" exit="exit" height="100%">
      <Meta />
      <Flex flexDirection="column" height="100%" {...rest}>
        {!fullScreen && <Nav />}
        <MotionBox as="main" flex="1" variants={!fullScreen && fadeInOut}>
          {children}
        </MotionBox>
        {!fullScreen && <Footer />}
      </Flex>
    </MotionBox>
  )
}

if (__DEV__) Layout.displayName = 'Layout'

export default Layout

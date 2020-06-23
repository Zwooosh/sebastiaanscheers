import { FC } from 'react'

import { IBoxProps, Flex, MotionBox } from '../styled'
import Meta from './Meta'
import Nav from '../Nav'
import Footer from './Footer'
import { fadeInOut } from 'shared/animations'

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

export default Layout

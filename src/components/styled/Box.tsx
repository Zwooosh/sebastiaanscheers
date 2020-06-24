import {
  space,
  color,
  layout,
  flexbox,
  compose,
  SpaceProps,
  ColorProps,
  LayoutProps,
  FlexboxProps,
} from 'styled-system'
import shouldForwardProp from '@styled-system/should-forward-prop'
import { css, SystemStyleObject } from '@styled-system/css'
import { motion } from 'framer-motion'

import styled, { Theme } from 'theme'
import { __DEV__ } from 'shared/utils'

type BoxProps = React.RefAttributes<any> &
  React.HTMLAttributes<any> &
  SpaceProps &
  ColorProps &
  LayoutProps &
  FlexboxProps

export interface IBoxProps extends BoxProps {
  _css?: SystemStyleObject
  sx?: SystemStyleObject
}

const sx = (props: { sx: SystemStyleObject; theme: Theme }) =>
  css(props.sx)(props.theme)
const _css = (props: { _css: SystemStyleObject; theme: Theme }) =>
  css(props._css)(props.theme)
export const Box = styled('div', {
  shouldForwardProp,
})(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  _css,
  sx,
  compose(space, color, layout, flexbox)
)

export const MotionBox = styled(motion.div)(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  _css,
  sx,
  compose(space, color, layout, flexbox)
)

export const Flex = styled(Box)({
  display: 'flex',
})
Flex.displayName = 'Flex'

export const MotionFlex = styled(MotionBox)({
  display: 'flex',
})

if (__DEV__) {
  Box.displayName = 'Box'
  MotionBox.displayName = 'MotionBox'
  MotionFlex.displayName = 'MotionFlex'
}

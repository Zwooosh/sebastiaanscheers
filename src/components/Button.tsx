import React, { FC, ButtonHTMLAttributes } from 'react'
import { typography, variant, TypographyProps } from 'styled-system'
import { MotionProps } from 'framer-motion'
import styled from '@emotion/styled'

import { __DEV__ } from 'shared/utils'
import { Box, IBoxProps, MotionBox } from './styled'

type ButtonProps = IBoxProps &
  TypographyProps &
  ButtonHTMLAttributes<HTMLButtonElement>
export interface IButtonProps extends ButtonProps {
  variant?: string
}

const baseCss = {
  appearance: 'none',
  display: 'inline-block',
  textAlign: 'center',
  lineHeight: 'inherit',
  textDecoration: 'none',
  fontSize: 'inherit',
  px: 3,
  py: 2,
  color: 'white',
  bg: 'primary',
  border: 0,
  borderRadius: 'md',
  backgroundColor: 'primary.500',
  cursor: 'pointer',
  transition: 'color 0.2s ease, background 0.2s ease',
  ':hover,:focus,:active': {
    backgroundColor: 'primary.600',
  },
}

const overrides = [
  typography,
  variant({
    variants: {
      nav: {
        lineHeight: 0,
        px: 2,
        py: 0,
        fontSize: '2xl',
        backgroundColor: 'transparent',
        color: 'inherit',
        ':hover,:focus,:active': {
          color: 'primary.500',
          backgroundColor: 'transparent',
        },
      },
    },
  }),
]

const Button: FC<IButtonProps> = (props) => {
  return <StyledButton _css={baseCss} {...props} />
}

export const MotionButton: FC<IButtonProps & MotionProps> = (props) => {
  return <StyledMotionButton _css={baseCss} {...props} />
}

const StyledButton = styled(Box)(...overrides)
StyledButton.defaultProps = { as: 'button' }

const StyledMotionButton = styled(MotionBox)(...overrides)
StyledMotionButton.defaultProps = { as: 'button' }

export default Button

if (__DEV__) {
  StyledButton.displayName = 'StyledButton'
  StyledMotionButton.displayName = 'StyledMotionButton'
}

import React, { FC, ButtonHTMLAttributes } from 'react'
import { typography, variant, TypographyProps } from 'styled-system'
import styled from '@emotion/styled'

import { Box, IBoxProps, MotionBox } from './styled'
import { MotionProps } from 'framer-motion'

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

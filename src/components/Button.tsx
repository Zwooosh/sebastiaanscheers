import React, { FC, ButtonHTMLAttributes } from 'react'
import { typography, variant, TypographyProps } from 'styled-system'
import css from '@styled-system/css'
import styled from '@emotion/styled'

import { Box, IBoxProps } from './styled'

type ButtonProps = IBoxProps &
  TypographyProps &
  ButtonHTMLAttributes<HTMLButtonElement>
export interface IButtonProps extends ButtonProps {
  variant?: string
}

const Button: FC<IButtonProps> = (props) => {
  return <StyledButton {...props} />
}

const StyledButton = styled(Box)(
  css({
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
  }),
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
  })
)
StyledButton.defaultProps = { as: 'button' }

export default Button

import NextLink from 'next/link'
import { variant, typography, TypographyProps } from 'styled-system'
import { css } from '@styled-system/css'
import styled from '@emotion/styled'

import { Box, IBoxProps } from './styled'
import { AnchorHTMLAttributes, FC } from 'react'

type LinkProps = IBoxProps &
  TypographyProps &
  AnchorHTMLAttributes<HTMLAnchorElement>
export interface ILinkProps extends LinkProps {
  external?: boolean
  variant?: string
  active?: boolean
}

const Link: FC<ILinkProps> = ({ external, href, ...rest }) => {
  if (external || href.match(/^(https?:\/\/)/)) {
    return (
      <HyperLink
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      />
    )
  }

  return (
    <NextLink href={href} passHref>
      <HyperLink {...rest} />
    </NextLink>
  )
}

const HyperLink = styled(Box)(
  ({ active }: ILinkProps) =>
    css({
      fontWeight: 'semibold',
      display: 'inline-block',
      color: active ? 'primary.500' : 'inherit',
      textDecoration: 'none',
      transition: 'all 0.2s ease',
      ':hover, :focus, :active': {
        color: active ? 'primary.600' : 'primary.500',
      },
    }),
  typography,
  variant({
    variants: {
      nav: {
        p: 2,
      },
      mobileNav: {
        fontSize: '2xl',
        display: 'block',
        px: 2,
        py: 6,
      },
    },
  })
)
HyperLink.defaultProps = { as: 'a' }

export default Link

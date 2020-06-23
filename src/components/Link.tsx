import NextLink from 'next/link'
import { variant, typography, TypographyProps } from 'styled-system'
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

const Link: FC<ILinkProps> = ({ active, external, href, ...rest }) => {
  const baseCss = {
    fontWeight: 'semibold',
    display: 'inline-block',
    color: active ? 'primary.500' : 'inherit',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    ':hover, :focus, :active': {
      color: active ? 'primary.600' : 'primary.500',
    },
  }
  if (external || href.match(/^(https?:\/\/)/)) {
    return (
      <HyperLink
        _css={baseCss}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      />
    )
  }

  return (
    <NextLink href={href} passHref>
      <HyperLink _css={baseCss} {...rest} />
    </NextLink>
  )
}

const HyperLink = styled(Box)(
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

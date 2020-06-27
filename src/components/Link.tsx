import { AnchorHTMLAttributes, FC } from 'react'
import NextLink from 'next/link'
import { variant, typography, TypographyProps } from 'styled-system'
import styled from '@emotion/styled'

import { __DEV__ } from 'shared/utils'
import { Box, IBoxProps } from './styled'

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
        fontSize: ['sm', null, 'inherit'],
        p: 2,
        lineHeight: 'none',
      },
    },
  })
)
HyperLink.defaultProps = { as: 'a' }

if (__DEV__) Link.displayName = 'Link'

export default Link

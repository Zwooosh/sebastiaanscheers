import React from 'react'
import NextLink from 'next/link'
import { Link, LinkProps } from 'rebass'

const RouteLink: React.FC<LinkProps> = ({ href, children, ...rest }) => {
  return (
    <NextLink href={href} passHref>
      <Link {...rest}>{children}</Link>
    </NextLink>
  )
}

export default RouteLink

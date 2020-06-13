import { Box, Flex, LinkProps, Button } from 'rebass'
import { useRouter } from 'next/router'

import Container from './core/Container'
import RouteLink from './core/RouteLink'
import Logo from './Logo'
import ThemeSwitcher from './ThemeSwitcher'
import { FiMenu } from 'react-icons/fi'

const NavLink: React.FC<LinkProps> = ({ ...props }) => {
  const router = useRouter()
  return (
    <RouteLink
      variant="nav"
      color={router.pathname?.includes(props.href) ? 'primary.500' : 'inherit'}
      {...props}
    />
  )
}

const Nav: React.FC = () => {
  return (
    <Box as="nav" py={2}>
      <Container alignItems="center">
        <Box mx={-2} flex="1" display={['none', null, 'flex']}>
          <NavLink href="/hello">about me</NavLink>
          <NavLink href="/projects">projects</NavLink>
          <NavLink href="/blog">blog</NavLink>
        </Box>
        <Logo size={[6, null, 10]} />
        <Flex mx={-2} flex="1" justifyContent="flex-end">
          <NavLink display={['none', null, 'inline-block']} href="/contact">
            contact
          </NavLink>
          <ThemeSwitcher />
          <Button variant="nav" fontSize="xl">
            <FiMenu />
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}

export default Nav

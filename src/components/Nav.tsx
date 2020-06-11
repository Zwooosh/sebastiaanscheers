import { Box, Flex, LinkProps, Button } from 'rebass'
import Container from './core/Container'
import RouteLink from './core/RouteLink'
import Logo from './Logo'
import { useRouter } from 'next/router'
import { useThemeToggle } from '@/theme'

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

const Nav = () => {
  const { theme, toggle } = useThemeToggle()

  return (
    <Box as="nav" py={2}>
      <Container alignItems="center">
        <Flex mx={-2} flex="1">
          <NavLink href="/hello">about me</NavLink>
          <NavLink href="/projects">projects</NavLink>
          <NavLink href="/blog">blog</NavLink>
        </Flex>
        <Logo size={10} />
        <Flex mx={-2} flex="1" justifyContent="flex-end">
          <NavLink href="/contact">contact</NavLink>
          <Button onClick={toggle}>
            {theme === 'light' ? 'set dark' : 'set light'}
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}

export default Nav

import { Box, Flex, LinkProps, Button } from 'rebass'
import { useRouter } from 'next/router'
import { FiMenu, FiX } from 'react-icons/fi'

import Container from './core/Container'
import RouteLink from './core/RouteLink'
import Logo from './Logo'
import ThemeSwitcher from './ThemeSwitcher'
import useDisclosure from 'hooks/useDisclosure'

const routes = [
  {
    href: '/hello',
    label: 'about me',
  },
  {
    href: '/projects',
    label: 'projects',
  },
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/contact',
    label: 'contact',
    split: true,
  },
]

const NavLink: React.FC<{ mobile?: boolean } & LinkProps> = ({
  mobile,
  ...props
}) => {
  const router = useRouter()
  return (
    <RouteLink
      variant={mobile ? 'mobileNav' : 'nav'}
      color={router.pathname?.includes(props.href) ? 'primary.500' : 'inherit'}
      {...props}
    />
  )
}

interface IMobileNavProps {
  isOpen: boolean
  onClose: () => void
}

const MobileNav: React.FC<IMobileNavProps> = ({ isOpen, onClose }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: isOpen ? '100vh' : 0,
        backgroundColor: 'white',
        color: 'black',
        overflow: 'hidden',
        transition: 'height .3s ease',
      }}
    >
      <Button
        variant="nav"
        onClick={onClose}
        sx={{
          position: 'absolute',
          fontSize: 'xl',
          top: 2,
          right: 2,
          padding: 2,
        }}
      >
        <FiX />
      </Button>
      <Flex flexDirection="column" alignItems="center" mt={16}>
        {routes.map((route) => {
          return (
            <NavLink mobile key={route.href} href={route.href}>
              {route.label}
            </NavLink>
          )
        })}
      </Flex>
    </Box>
  )
}

const Nav: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <MobileNav isOpen={isOpen} onClose={onClose} />
      <Box as="nav" py={2}>
        <Container alignItems="center">
          <Box mx={-2} flex="1" display={['none', null, 'flex']}>
            {routes.map((route) => {
              if (!route.split) {
                return (
                  <NavLink key={route.href} href={route.href}>
                    {route.label}
                  </NavLink>
                )
              }
            })}
          </Box>
          <Logo size={[6, null, 10]} />
          <Flex mx={-2} flex="1" justifyContent="flex-end">
            {routes.map((route) => {
              if (route.split) {
                return (
                  <NavLink
                    display={['none', null, 'inline-block']}
                    key={route.href}
                    href={route.href}
                  >
                    {route.label}
                  </NavLink>
                )
              }
            })}
            <ThemeSwitcher />
            <Button
              variant="nav"
              fontSize="xl"
              onClick={onOpen}
              display={['inline-block', null, 'none']}
            >
              <FiMenu />
            </Button>
          </Flex>
        </Container>
      </Box>
    </>
  )
}

export default Nav

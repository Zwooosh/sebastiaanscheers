import { useRouter } from 'next/router'
import { FiMenu, FiX } from 'react-icons/fi'
import { FocusOn } from 'react-focus-on'

import useDisclosure from '@/hooks/useDisclosure'
import Container from './core/Container'
import { Box, Flex } from './styled'
import Logo from './Logo'
import ThemeSwitcher from './ThemeSwitcher'
import Link, { ILinkProps } from './Link'
import Button from './Button'

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

const NavLink: React.FC<{ mobile?: boolean } & ILinkProps> = ({
  mobile,
  ...props
}) => {
  const router = useRouter()
  return (
    <Link
      variant={mobile ? 'mobileNav' : 'nav'}
      role={mobile ? 'menuItem' : null}
      active={router.pathname?.includes(props.href)}
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
    <FocusOn enabled={isOpen} autoFocus returnFocus onEscapeKey={onClose}>
      <Box
        sx={{
          position: 'fixed',
          zIndex: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '100vh',
          backgroundColor: 'backgroundInverse',
          color: 'background',
          overflow: 'hidden',
          transition: 'transform .3s ease',
          transform: `translateY(${isOpen ? '0' : '-100'}%)`,
        }}
        id="menu"
        role="menu"
        aria-labelledby="menubutton"
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
    </FocusOn>
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
              id="menubutton"
              variant="nav"
              fontSize="xl"
              onClick={onOpen}
              display={['inline-block', null, 'none']}
              role="button"
              aria-label="menu"
              aria-haspopup="true"
              aria-controls="menu"
              aria-expanded={isOpen ? 'true' : null}
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

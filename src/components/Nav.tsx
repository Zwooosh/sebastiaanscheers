import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { __DEV__ } from 'shared/utils'
import { fadeIn } from 'shared/animations'
import { useIntroContext } from 'context/IntroContext'
import Container from './core/Container'
import { Flex, MotionBox } from './styled'
import Logo from './Logo'
import ThemeSwitcher from './ThemeSwitcher'
import Link, { ILinkProps } from './Link'

const routes = [
  {
    href: '/projects',
    label: 'projects',
  },
  {
    href: '/contact',
    label: 'contact',
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
      active={router.pathname?.includes(props.href)}
      {...props}
    />
  )
}

const Nav = () => {
  const { isAfterIntro, setIsAfterIntro } = useIntroContext()

  useEffect(() => {
    if (isAfterIntro) {
      setIsAfterIntro(false)
    }
  })

  return (
    <MotionBox as="nav" py={2} variants={isAfterIntro && fadeIn}>
      <Container>
        <Flex flexDirection="row" alignItems="center" mx={-2}>
          <Flex
            flex="1"
            order={[2, null, 1]}
            justifyContent={['space-evenly', null, 'flex-start']}
          >
            {routes.map((route) => (
              <NavLink key={route.href} href={route.href}>
                {route.label}
              </NavLink>
            ))}
          </Flex>

          <Logo size={[6, null, 10]} order={[1, null, 2]} />

          <Flex flex={[null, null, '1']} justifyContent="flex-end" order={3}>
            <ThemeSwitcher />
          </Flex>
        </Flex>
      </Container>
    </MotionBox>
  )
}

if (__DEV__) {
  Nav.displayName = 'Nav'
}

export default Nav

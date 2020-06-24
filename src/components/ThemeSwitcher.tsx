import { FiMoon, FiSun } from 'react-icons/fi'

import { __DEV__ } from 'shared/utils'
import { useThemeToggle } from 'context/ThemeContext'
import Button from './Button'

const ThemeSwitcher = () => {
  const { theme, toggle } = useThemeToggle()
  return (
    <Button variant="nav" fontSize={['xl', null, '2xl']} onClick={toggle}>
      {theme === 'light' ? <FiMoon /> : <FiSun />}
    </Button>
  )
}

if (__DEV__) ThemeSwitcher.displayName = 'ThemeSwitcher'

export default ThemeSwitcher

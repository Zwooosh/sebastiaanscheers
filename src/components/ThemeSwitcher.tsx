import { Button } from 'rebass'
import { FiMoon, FiSun } from 'react-icons/fi'

import { useThemeToggle } from '@/theme'

const ThemeSwitcher = () => {
  const { theme, toggle } = useThemeToggle()
  return (
    <Button variant="nav" fontSize={['xl', null, '2xl']} onClick={toggle}>
      {theme === 'light' ? <FiMoon /> : <FiSun />}
    </Button>
  )
}

export default ThemeSwitcher

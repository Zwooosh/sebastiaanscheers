import {
  useEffect,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'
import { themeSelect } from './index'

const themeVariants = ['dark', 'light'] as const
export type ThemeVariants = typeof themeVariants[number]

interface IThemeState {
  theme: ThemeVariants
  toggle: () => void
}

const ThemeContext = createContext<IThemeState | undefined>(undefined)
const useThemeToggle = () => useContext(ThemeContext)

const useThemeState = () => {
  const [theme, setTheme] = useState<ThemeVariants>('dark')

  useEffect(() => {
    const lsTheme = localStorage.getItem('theme') as ThemeVariants
    if (lsTheme == null) {
      localStorage.setItem('theme', theme)
    } else {
      setTheme(lsTheme)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  return [theme, setTheme] as const
}

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useThemeState()

  const toggle = useCallback(() => {
    const i = (themeVariants.indexOf(theme) + 1) % themeVariants.length
    const newTheme = themeVariants[i]
    setTheme(newTheme)
  }, [theme])

  return (
    <EmotionThemeProvider theme={themeSelect(theme)}>
      <ThemeContext.Provider
        value={{
          theme,
          toggle,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </EmotionThemeProvider>
  )
}

export { ThemeProvider, useThemeToggle }

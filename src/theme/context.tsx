import {
  useEffect,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
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
    if (lsTheme == null || lsTheme !== theme) {
      localStorage.setItem('theme', theme)
    } else {
      const lsTheme = localStorage.getItem('theme') as ThemeVariants
      setTheme(lsTheme)
    }
  }, [theme])

  return [theme, setTheme] as [
    ThemeVariants,
    Dispatch<SetStateAction<ThemeVariants>>
  ]
}

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useThemeState()

  const toggle = () => {
    const i = (themeVariants.indexOf(theme) + 1) % themeVariants.length
    const newTheme = themeVariants[i]
    setTheme(newTheme)
  }

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

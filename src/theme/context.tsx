import React from 'react'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'
import { themeSelect } from './index'

const themeVariants = ['dark', 'light'] as const
export type ThemeVariants = typeof themeVariants[number]

interface IThemeState {
  theme: ThemeVariants
  toggle: () => void
}

const ThemeContext = React.createContext<IThemeState | undefined>(undefined)
const useThemeToggle = () => React.useContext(ThemeContext)

const useThemeState = () => {
  const [theme, setTheme] = React.useState<ThemeVariants>('dark')

  React.useEffect(() => {
    const lsTheme = localStorage.getItem('theme') as ThemeVariants
    if (lsTheme != theme) {
      setTheme(lsTheme)
    }
  }, [])

  return [theme, setTheme] as [
    ThemeVariants,
    React.Dispatch<React.SetStateAction<ThemeVariants>>
  ]
}

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useThemeState()

  const toggle = () => {
    const i = (themeVariants.indexOf(theme) + 1) % themeVariants.length
    const newTheme = themeVariants[i]
    localStorage.setItem('theme', newTheme)
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

import { useState, useMemo } from 'react'
import { useTheme } from 'emotion-theming'

import { Theme } from '@/theme'
import { breakpointAliases, BreakpointAliases } from '@/theme/breakpoints'
import { useSafeLayoutEffect } from './useSafeLayoutEffect'

const toPx = (breakpoint: string) => parseInt(breakpoint) * 16

const useBreakpoint = () => {
  const theme = useTheme<Theme>()
  const [screen, setScreen] = useState(0)

  useSafeLayoutEffect(() => {
    let debounce
    const setSideScreen = () => {
      if (debounce) clearTimeout(debounce)
      debounce = setTimeout(() => setScreen(window.innerWidth), 100)
    }
    if (screen === 0) setSideScreen()
    window.addEventListener('resize', setSideScreen)
    return () => {
      window.removeEventListener('resize', setSideScreen)
    }
  })

  const pxBreakpoints = useMemo(() => theme.breakpoints.map((b) => toPx(b)), [
    theme,
  ])

  const activeBreakpoint = pxBreakpoints.reduce((acc, val, i) => {
    if (screen >= val) {
      return breakpointAliases[i]
    } else {
      return acc
    }
  }, breakpointAliases[0])

  return breakpointAliases.reduce((acc, val) => {
    return { ...acc, [val]: val === activeBreakpoint }
  }, {}) as { [key in BreakpointAliases]: boolean }
}

export default useBreakpoint

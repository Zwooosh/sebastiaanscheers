import breakpoints from './breakpoints'
import { colorsDark, colorsLight } from './colors'
import radii from './radii'
import shadows from './shadows'
import sizes, { baseSizes } from './sizes'
import typography from './typography'
import zIndices from './zIndices'
import variants from './variants'

export const themeDark = {
  breakpoints,
  zIndices,
  radii,
  colors: colorsDark,
  ...typography,
  sizes,
  shadows,
  space: baseSizes,
  variants,
}

export const themeLight = {
  ...themeDark,
  colors: colorsLight,
}

export type Theme = typeof themeDark

const theme = (mode: string) => (mode === 'dark' ? themeDark : themeLight)

export default theme

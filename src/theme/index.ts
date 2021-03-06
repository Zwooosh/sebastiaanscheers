import styled, { CreateStyled } from '@emotion/styled'

import { ThemeVariants } from 'shared/types'
import breakpoints from './breakpoints'
import { colorsDark, colorsLight } from './colors'
import radii from './radii'
import shadows from './shadows'
import sizes, { baseSizes } from './sizes'
import typography from './typography'
import zIndices from './zIndices'

const themeDark = {
  breakpoints,
  zIndices,
  radii,
  colors: colorsDark,
  ...typography,
  sizes,
  shadows,
  space: baseSizes,
}

const themeLight = {
  ...themeDark,
  colors: colorsLight,
}

export type Theme = typeof themeDark
const themes: { [key in ThemeVariants]: Theme } = {
  dark: themeDark,
  light: themeLight,
}

export const themeSelect = (mode: ThemeVariants) =>
  (themes[mode] || themeDark) as Theme

export default styled as CreateStyled<Theme>

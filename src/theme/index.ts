import breakpoints from './breakpoints'
import colors from './colors'
import radii from './radii'
import shadows from './shadows'
import sizes, { baseSizes } from './sizes'
import typography from './typography'
import zIndices from './zIndices'

const theme = {
  breakpoints,
  zIndices,
  radii,
  colors,
  ...typography,
  sizes,
  shadows,
  space: baseSizes,
}

export type Theme = typeof theme

export default theme
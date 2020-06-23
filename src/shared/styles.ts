import { css } from '@emotion/core'
import { Theme } from '@/theme'

export const makeGlobalStyles = (theme: Theme) => css`
  html,
  body,
  #__next {
    padding: 0;
    margin: 0;
    font-family: ${theme.fonts.body};
    width: 100%;
    height: 100%;
    min-height: 100vh;
    overflow: hidden auto;
    outline: 0;
    transition: background-color 0.2s ease;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  ::selection {
    background-color: ${theme.colors.secondary[300]};
  }

  * {
    box-sizing: border-box;
  }
`

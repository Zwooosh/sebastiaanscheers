import App from 'next/app'
import { css, Global } from '@emotion/core'
import { withTheme } from 'emotion-theming'

import { Theme, ThemeProvider } from '@/theme'

const makeGlobalStyles = (theme: Theme) => css`
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

const GlobalStyles = withTheme(({ theme }) => (
  <Global styles={makeGlobalStyles(theme)} />
))

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}

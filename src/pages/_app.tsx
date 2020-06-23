import App from 'next/app'
import { Global } from '@emotion/core'
import { withTheme } from 'emotion-theming'

import { ThemeProvider } from '@/theme'
import { makeGlobalStyles } from 'shared/styles'

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

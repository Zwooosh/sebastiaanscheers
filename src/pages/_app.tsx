import App from 'next/app'
import { Global } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { AnimatePresence } from 'framer-motion'

import { ThemeProvider } from '@/theme'
import { makeGlobalStyles } from 'shared/styles'
import { AfterIntroProvider } from 'context/AfterIntroContext'

const GlobalStyles = withTheme(({ theme }) => (
  <Global styles={makeGlobalStyles(theme)} />
))

export default class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props
    return (
      <ThemeProvider>
        <GlobalStyles />
        <AfterIntroProvider>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </AfterIntroProvider>
      </ThemeProvider>
    )
  }
}

import App from 'next/app'
import { ThemeProvider, createGlobalStyle } from 'styled-components'

const theme = {
  colors: {
    bg: '#000000',
    white: '#ffffff',
    primary: '#ff0f81',
  },
}

const GlobalStyle = createGlobalStyle<{ theme: typeof theme }>`
  body {
    background-color: ${(props) => props.theme.colors.bg};
    color: ${(props) => props.theme.colors.white};
  }
`

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}

import App from 'next/app'
import styledNormalize from 'styled-normalize'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import { theme } from '@/styles/theme'

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  html, body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
      sans-serif;
    width: 100%;
    height: 100%;
    min-height: 100vh;
    overflow: hidden;
    outline: 0;
  }

  * {
    box-sizing: border-box;
  }
  
  body {
    background-color: ${(props: { theme: typeof theme }) =>
      props.theme.colors.bg};
    color: ${(props: { theme: typeof theme }) => props.theme.colors.white};
  }     
  
  canvas {
    display: block;
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

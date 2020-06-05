import Head from 'next/head'
import Leon from '../components/leon/Leon'

export const Home = (): JSX.Element => (
  <div className="container">
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.6/dat.gui.js"></script>
    </Head>

    <main>
      <Leon />
    </main>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        width: 100%;
        height: 100%;
        overflow: hidden;
        outline: 0;
      }

      * {
        box-sizing: border-box;
      }

      canvas {
        border: 1px solid black;
        display: block;
      }
    `}</style>
  </div>
)

export default Home

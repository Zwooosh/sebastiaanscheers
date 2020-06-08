import Head from 'next/head'
import Leon from '@/components/leon/Leon'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      </Head>

      <main>
        <Leon />
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          width: 100%;
          height: 100%;
          overflow: hidden;
          outline: 0;
        }

        * {
          box-sizing: border-box;
        }

        canvas {
          display: block;
        }
      `}</style>
    </div>
  )
}

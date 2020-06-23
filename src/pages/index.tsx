import { useTheme } from 'emotion-theming'
import useScript from 'react-script-hook'

import { Theme } from '@/theme'
import Layout from '@/components/core/Layout'
import Leon from '@/components/Leon'

export default function Home(): JSX.Element {
  const theme = useTheme<Theme>()
  const [loading, error] = useScript({
    src: '/lib/leon.js',
    checkForExisting: true,
  })

  return (
    <Layout bg="backgroundInverse" fullScreen>
      {!loading && !error && (
        <Leon color={theme.colors.background} href="/hello" />
      )}
    </Layout>
  )
}

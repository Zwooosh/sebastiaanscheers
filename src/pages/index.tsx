import Layout from '@/components/core/Layout'
import Leon from '@/components/Leon'
import { useTheme } from 'emotion-theming'
import { Theme } from '@/theme'

export default function Home(): JSX.Element {
  const theme = useTheme<Theme>()
  return (
    <Layout bg="backgroundInverse" fullScreen>
      <Leon href="/hello" color={theme.colors.background} />
    </Layout>
  )
}

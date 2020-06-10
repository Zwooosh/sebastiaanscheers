import Layout from '@/components/core/Layout'
import Leon from '@/components/Leon'

export default function Home(): JSX.Element {
  return (
    <Layout bg="white" hideNav>
      <Leon href="/hello" />
    </Layout>
  )
}

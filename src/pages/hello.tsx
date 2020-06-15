import Layout from '@/components/core/Layout'
import Container from '@/components/core/Container'
import Hero from '@/components/Hero'

export default function Hello(): JSX.Element {
  return (
    <Layout>
      <Container>
        <Hero />
      </Container>
    </Layout>
  )
}

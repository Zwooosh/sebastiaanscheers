import Layout from '@/components/core/Layout'
import Container from '@/components/core/Container'
import { Box } from 'rebass'

export default function Hello(): JSX.Element {
  return (
    <Layout>
      <Container>
        <Box height={'2000px'}>Hello</Box>
      </Container>
    </Layout>
  )
}

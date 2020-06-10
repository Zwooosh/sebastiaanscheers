import { Box } from 'rebass'
import Layout from '@/components/core/Layout'
import Nav from '@/components/Nav'

export default function Hello(): JSX.Element {
  return (
    <Layout
      sx={{
        bg: 'black',
        color: 'white',
      }}
    >
      <Nav />
      <Box
        sx={{
          maxWidth: 'container.xl',
          mx: 'auto',
          px: 3,
        }}
      >
        Hello
      </Box>
    </Layout>
  )
}

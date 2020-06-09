import Layout from '_base/Layout'
import { Box } from 'rebass'
import sizes from '@/theme/sizes'

export default function Hello(): JSX.Element {
  return (
    <Layout
      sx={{
        bg: 'black',
        color: 'white',
      }}
    >
      <Box
        sx={{
          maxWidth: sizes.container.xl,
          mx: 'auto',
          px: 3,
        }}
      >
        Hello
      </Box>
    </Layout>
  )
}

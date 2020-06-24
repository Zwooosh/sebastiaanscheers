import { useTheme } from 'emotion-theming'
import useScript from 'react-script-hook'

import { Theme } from 'theme'
import { useIntroContext } from 'context/IntroContext'
import Layout from 'components/core/Layout'
import Container from 'components/core/Container'
import Leon from 'components/Leon'
import Hero from 'components/Hero'
import { Box, Heading } from 'components/styled'
import SkillList from 'components/SkillList'

export default function Home(): JSX.Element {
  const { renderIntro, disableIntro } = useIntroContext()
  const theme = useTheme<Theme>()
  const [loading, error] = useScript({
    src: '/lib/leon.js',
    checkForExisting: true,
  })

  if (renderIntro) {
    return (
      <Layout bg="backgroundInverse" fullScreen>
        {!loading && !error && (
          <Leon color={theme.colors.background} onComplete={disableIntro} />
        )}
      </Layout>
    )
  }

  return (
    <Layout>
      <Container flexDirection="column">
        <Hero />
        <Heading>Skills.</Heading>
        <SkillList />
        <Box height="1000px"></Box>
      </Container>
    </Layout>
  )
}

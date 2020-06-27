import { useTheme } from 'emotion-theming'
import useScript from 'react-script-hook'
import { motion } from 'framer-motion'

import { Theme } from 'theme'
import { staggerChildren } from 'shared/animations'
import { useIntroContext } from 'context/IntroContext'
import Layout from 'components/core/Layout'
import Container from 'components/core/Container'
import Leon from 'components/Leon'
import Hero from 'components/Hero'
import SkillList from 'components/SkillList'
import { Space } from 'components/styled'

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
        <motion.div variants={staggerChildren}>
          <Space mb={[3, 6, 12]}>
            <Hero />
            <SkillList />
          </Space>
        </motion.div>
      </Container>
    </Layout>
  )
}

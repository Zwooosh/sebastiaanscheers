import Container from './Container'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      <Container
        justifyContent="flex-end"
        color="gray.300"
        pt={2}
        pb={2}
        fontSize="sm"
      >
        <span>&copy; {currentYear} - Sebastiaan Scheers</span>
      </Container>
    </footer>
  )
}

export default Footer

const variants = {
  nav: {
    fontWeight: 'bold',
    display: 'inline-block',
    p: 2,
    color: 'inherit',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    ':hover,:focus,:active': {
      color: 'primary.500',
    },
  },
}

export type Variants = typeof variants

export default variants

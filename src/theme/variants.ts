const variants = {
  nav: {
    fontWeight: 'bold',
    display: 'inline-block',
    p: 2,
    color: 'inherit',
    textDecoration: 'none',
    transition: 'all .2s ease-in',
    ':hover,:focus,:active': {
      color: 'pink.500',
    },
  },
}

export type Variants = typeof variants

export default variants

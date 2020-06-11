export const variants = {
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

export const buttons = {
  clean: {
    background: 'none',
    cursor: 'pointer',
    p: 0,
    color: 'text',
    lineHeight: 0,
  },
  nav: {
    display: 'inline-block',
    background: 'none',
    cursor: 'pointer',
    px: 2,
    py: 0,
    color: 'inherit',
    lineHeight: 0,
    fontSize: '2xl',
    transition: 'all 0.2s ease',
    ':hover,:focus,:active': {
      color: 'primary.500',
    },
  },
}

export type Buttons = typeof buttons

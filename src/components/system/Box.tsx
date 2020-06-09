import styled from 'styled-components'
import {
  compose,
  space,
  color,
  layout,
  typography,
  flexbox,
} from 'styled-system'

export const Box = styled.div(
  {
    boxSizing: 'border-box',
    minWidth: 0,
  },
  compose(space, color, layout, typography, color, flexbox)
)

export const Flex = styled(Box)({
  display: 'flex',
})

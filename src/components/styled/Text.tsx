import { HTMLAttributes } from 'react'
import { typography, TypographyProps } from 'styled-system'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import { IBoxProps, Box } from './Box'

export type TextProps = IBoxProps &
  TypographyProps &
  HTMLAttributes<HTMLParagraphElement> &
  HTMLAttributes<HTMLLabelElement> & {
    as?:
      | 'p'
      | 'small'
      | 'strong'
      | 'em'
      | 'span'
      | 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'h5'
      | 'h6'
      | 'label'
    target?: string
    singleLine?: boolean
  }

export type HeadingProps = TextProps &
  HTMLAttributes<HTMLHeadingElement> & {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  }

export const Text = styled(Box)<TextProps>(
  (props) =>
    props.singleLine &&
    css`
      max-width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    `,
  typography
)

export const Paragraph = styled(Text)({})

export const Heading = styled(Text)<HeadingProps>({})

Heading.defaultProps = {
  as: 'h2',
  fontSize: ['2xl', '3xl', '4xl'],
}

Text.defaultProps = {
  as: 'span',
}

Paragraph.defaultProps = {
  as: 'p',
}

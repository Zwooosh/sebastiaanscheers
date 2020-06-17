import { forwardRef, ImgHTMLAttributes } from 'react'

import { Box, Flex, IBoxProps } from './Box'
import { Space } from './Space'
import { Text, TextProps, Heading, Paragraph, HeadingProps } from './Text'

type ImageProps = IBoxProps & ImgHTMLAttributes<HTMLImageElement>
const Image = forwardRef<any, ImageProps>((props, ref) => (
  <Box ref={ref} as="img" maxWidth="100%" height="auto" {...props} />
))

export { Box, Flex, Space, Text, Heading, Paragraph, Image }
export type { TextProps, HeadingProps, IBoxProps }

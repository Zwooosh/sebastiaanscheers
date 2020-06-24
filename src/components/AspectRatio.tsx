import { forwardRef, Children } from 'react'

import { __DEV__ } from 'shared/utils'
import { IBoxProps, Box } from './styled'

interface IAspectRatioProps extends IBoxProps {
  /**
   * `21/9`, `16/9`, `9/16`, `4/3`, `1.85/1`
   */
  ratio?: number
}

const AspectRatio = forwardRef(function AspectRatio(
  { ratio = 4 / 3, children, ...rest }: IAspectRatioProps,
  ref: React.Ref<any>
) {
  // enforce single child
  const child = Children.only(children)

  return (
    <Box
      ref={ref}
      position="relative"
      _css={{
        ':before': {
          height: 0,
          content: `""`,
          display: 'block',
          paddingBottom: `${(1 / ratio) * 100}%`,
        },
        '& > *': {
          overflow: 'hidden',
          position: 'absolute',
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        },
        '& > img, & > video': {
          objectFit: 'cover',
        },
      }}
      {...rest}
    >
      {child}
    </Box>
  )
})

if (__DEV__) AspectRatio.displayName = 'AspectRatio'

export default AspectRatio

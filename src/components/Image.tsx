import { ImgHTMLAttributes, forwardRef } from 'react'

import { IUseImageProps, useImage } from 'hooks/useImage'
import { IBoxProps, Box } from './styled'

type ImageProps = IBoxProps &
  ImgHTMLAttributes<HTMLImageElement> &
  IUseImageProps

export interface IImageProps extends ImageProps {
  fallbackSrc?: string
  fallback?: React.ReactElement
  htmlWidth?: string | number
  htmlHeight?: string | number
  ignoreFallback?: boolean
}

const Image = forwardRef(function Image(
  props: IImageProps,
  ref: React.Ref<any>
) {
  const {
    fallbackSrc,
    fallback,
    src,
    ignoreFallback,
    crossOrigin,
    onError,
    onLoad,
    ...rest
  } = props

  const status = useImage(props)

  const shared = {
    ref,
    ...(ignoreFallback ? { onError, onLoad, ...rest } : rest),
  }

  if (status !== 'loaded') {
    if (fallback) return fallback

    return (
      <Box
        as="img"
        src={fallbackSrc}
        _css={{
          filter: 'blur(1rem)',
        }}
        {...shared}
      />
    )
  }

  return <Box as="img" src={src} crossOrigin={crossOrigin} {...shared} />
})

export default Image

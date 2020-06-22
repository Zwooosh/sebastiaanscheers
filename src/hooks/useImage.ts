import { useState, useRef, useCallback } from 'react'
import { useSafeLayoutEffect } from './useSafeLayoutEffect'

export interface IUseImageProps {
  src?: string
  srcSet?: string
  sizes?: string
  onLoad?(event: Event): void
  onError?(error: string | Event): void
  ignoreFallback?: boolean
  crossOrigin?: string
}

type Status = 'loading' | 'failed' | 'pending' | 'loaded'

export function useImage(props: IUseImageProps) {
  const {
    src,
    srcSet,
    onLoad,
    onError,
    crossOrigin,
    sizes,
    ignoreFallback,
  } = props

  const [status, setStatus] = useState<Status>(() => {
    return src ? 'loading' : 'pending'
  })

  const imageRef = useRef<HTMLImageElement | null>()

  const load = useCallback(() => {
    if (!src) return

    flush()

    const img = new Image()

    img.src = src

    if (crossOrigin) {
      img.crossOrigin = crossOrigin
    }

    if (srcSet) {
      img.srcset = srcSet
    }

    if (sizes) {
      img.sizes = sizes
    }

    img.onload = (event) => {
      flush()
      setStatus('loaded')
      onLoad?.(event)
    }
    img.onerror = (error) => {
      flush()
      setStatus('failed')
      onError?.(error)
    }

    imageRef.current = img
  }, [src, crossOrigin, srcSet, sizes, onLoad, onError])

  const flush = () => {
    if (imageRef.current) {
      imageRef.current.onload = null
      imageRef.current.onerror = null
      imageRef.current = null
    }
  }

  useSafeLayoutEffect(() => {
    if (ignoreFallback) return

    if (status === 'loading') {
      load()
    }
    return () => {
      flush()
    }
  }, [status, load, ignoreFallback])

  return ignoreFallback ? 'loaded' : status
}

export type UseImageReturn = ReturnType<typeof useImage>

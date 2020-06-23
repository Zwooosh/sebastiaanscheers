import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Router from 'next/router'
import styled from '@emotion/styled'

import { useAfterIntroContext } from 'context/AfterIntroContext'

declare global {
  interface Window {
    LeonSans: any
  }
}

interface IFont {
  total: number
  leon: any[]
  rect: { h: number; w: number }
  gap?: { x: number; y: number }
}

interface IProps {
  href?: string
  color: string
}

const Leon: React.FC<IProps> = ({ href, color }) => {
  const { setAfterIntro } = useAfterIntroContext()

  useEffect(() => {
    setAfterIntro(true)
  })

  const pixelRatio = 2
  const defaultWeight = 200
  let screenWidth: number
  let screenHeight: number
  let ctx: CanvasRenderingContext2D
  const rafId = React.useRef<number>()
  const canvas = useRef<HTMLCanvasElement>()

  const firstNameText = 'Sebastiaan'.split('')
  const firstName: IFont = {
    total: firstNameText.length,
    leon: [],
    rect: {
      h: 0,
      w: 0,
    },
    gap: {
      x: 0,
      y: 0,
    },
  }
  const lastNameText = 'Scheers'.split('')
  const lastName = {
    total: lastNameText.length,
    leon: [],
    rect: {
      h: 0,
      w: 0,
    },
    gap: {
      x: 0,
      y: 0,
    },
  }

  const canvasResize = () => {
    screenWidth = document.body.clientWidth
    screenHeight = document.body.clientHeight

    canvas.current.width = screenWidth * pixelRatio
    canvas.current.height = screenHeight * pixelRatio
    canvas.current.style.width = screenWidth + 'px'
    canvas.current.style.height = screenHeight + 'px'
    ctx.scale(pixelRatio, pixelRatio)
  }

  const getSize = (ratio: number) => {
    return screenWidth / 0.5 / ratio
  }

  const start = () => {
    if (!process.browser) {
      return
    }

    const sizeRatio = 16
    ctx = canvas.current.getContext('2d')
    canvasResize()

    firstName.leon = firstNameText.map((l) => {
      const letter = new window.LeonSans({
        text: l,
        color: [color],
        size: getSize(sizeRatio),
        weight: defaultWeight,
      })
      letter.drawing.forEach((d) => (d.value = 0))
      return letter
    })

    lastName.leon = lastNameText.map((l) => {
      const letter = new window.LeonSans({
        text: l,
        color: [color],
        size: getSize(sizeRatio),
        weight: defaultWeight,
      })
      letter.drawing.forEach((d) => (d.value = 0))
      return letter
    })
  }

  const render = () => {
    rafId.current = requestAnimationFrame(render)
    if (ctx) ctx.clearRect(0, 0, screenWidth, screenHeight)

    const letterSpacing = 5

    // Tracking firstName
    let w = 0,
      h = 0
    for (const l of firstName.leon) {
      w += l.rect.w + letterSpacing
      h = l.rect.h
    }
    firstName.rect = { w: w - letterSpacing, h }

    // Tracking lastName
    w = 0
    h = 0
    for (const l of lastName.leon) {
      w += l.rect.w + letterSpacing
      h = l.rect.h
    }
    lastName.rect = { w: w - letterSpacing, h }

    // Positioning firstName
    let x = (screenWidth - firstName.rect.w) / 2 + firstName.gap.x
    let y =
      (screenHeight - firstName.rect.h - lastName.rect.h) / 2 + firstName.gap.y
    let space = 0
    for (const l of firstName.leon) {
      l.position(x + space, y)
      l.draw(ctx)
      space += l.rect.w + letterSpacing
    }

    // Positioning lastName
    x = (screenWidth - lastName.rect.w) / 2 + lastName.gap.x
    y = y + firstName.rect.h + lastName.gap.y
    space = 0
    for (const l of lastName.leon) {
      l.position(x + space, y)
      l.draw(ctx)
      space += l.rect.w + letterSpacing
    }
  }

  const stop = () => {
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
    }

    for (const l of firstName.leon) {
      gsap.killTweensOf(l)
      for (const d of l.drawing) {
        gsap.killTweensOf(d)
      }
    }
    for (const l of lastName.leon) {
      gsap.killTweensOf(l)
      for (const d of l.drawing) {
        gsap.killTweensOf(d)
      }
    }
    gsap.killTweensOf(canvas.current)
    gsap.killTweensOf(animateWeight)
    gsap.killTweensOf(animateZoom)
  }

  const animateDrawing = () => {
    const duration = 2
    const delayPerLetter = 0.3
    const delayLastName = delayPerLetter * (firstName.total - 1)
    const delayNextCall = 0.4

    for (let i = 0; i < firstName.total; i++) {
      for (const d of firstName.leon[i].drawing) {
        gsap.fromTo(
          d,
          {
            value: 0,
          },
          {
            duration,
            delay: i * delayPerLetter,
            value: 1,
            ease: 'power4.out',
          }
        )
      }
    }
    for (let i = 0; i < lastName.total; i++) {
      for (const d of lastName.leon[i].drawing) {
        gsap.killTweensOf(d)
        gsap.fromTo(
          d,
          {
            value: 0,
          },
          {
            duration,
            delay: delayLastName + i * delayPerLetter,
            value: 1,
            ease: 'power4.out',
          }
        )
      }
    }
    gsap.delayedCall(
      delayPerLetter * (firstName.total + lastName.total - 1) + delayNextCall,
      animateWeight
    )
  }

  const animateWeight = () => {
    const weight = 600
    const duration = 1.4
    const delayPerLetter = 0.05
    const delayReset = 0.7
    const delayLastName = delayPerLetter * (firstName.total - 1)
    const delayNextCall = 0.8

    for (let i = 0; i < firstName.total; i++) {
      gsap.to(firstName.leon[i], {
        duration,
        delay: delayPerLetter * i,
        weight,
        ease: 'power4.out',
      })
      gsap.to(firstName.leon[i], {
        duration,
        delay: delayPerLetter * i + delayReset,
        weight: defaultWeight,
        ease: 'power4.out',
      })
    }

    for (let i = 0; i < lastName.total; i++) {
      gsap.to(lastName.leon[i], {
        duration,
        delay: delayLastName + delayPerLetter * i,
        weight,
        ease: 'power4.out',
      })
      gsap.to(lastName.leon[i], {
        duration,
        delay: delayLastName + delayPerLetter * i + delayReset,
        weight: defaultWeight,
        ease: 'power4.out',
      })
    }
    gsap.delayedCall(
      delayPerLetter * (firstName.total + lastName.total - 1) + delayNextCall,
      animateZoom
    )
  }

  const animateZoom = () => {
    const duration = 1.8
    const size =
      0.6 * Math.sqrt(screenWidth * screenWidth + screenHeight * screenHeight)

    for (let i = 0; i < firstName.total; i++) {
      gsap.to(firstName.leon[i], {
        duration,
        size,
        weight: 1,
        ease: 'power4.inOut',
        onComplete: function () {
          animateFullScreen()
        },
      })
    }

    for (let i = 0; i < lastName.total; i++) {
      gsap.to(lastName.gap, {
        duration,
        y: screenHeight,
        ease: 'power4.inOut',
      })
    }
  }

  const animateFullScreen = () => {
    const duration = 0.7
    const size =
      20 * Math.sqrt(screenWidth * screenWidth + screenHeight * screenHeight)

    for (const l of firstName.leon) {
      gsap.to(l, {
        duration,
        weight: 900,
        ease: 'power4.inOut',
      })
      gsap.to(l, {
        duration,
        size,
        ease: 'power4.in',
      })
    }
    gsap.to(canvas.current, {
      duration: duration / 2,
      delay: duration / 2,
      backgroundColor: color,
      ease: 'power4.in',
      onComplete: function () {
        if (href) {
          Router.push(href)
        } else {
          stop()
        }
      },
    })
  }

  useEffect(() => {
    window.addEventListener('resize', canvasResize, false)
    return () => {
      window.removeEventListener('resize', canvasResize, false)
    }
  }, [])

  useEffect(() => {
    start()
    rafId.current = requestAnimationFrame(render)
    animateDrawing()

    return () => {
      stop()
    }
  }, [color])

  useEffect(() => {
    if (href) {
      Router.prefetch(href)
    }
  }, [href])

  return <Canvas ref={canvas} />
}

export default Leon

const Canvas = styled.canvas`
  display: block;
`

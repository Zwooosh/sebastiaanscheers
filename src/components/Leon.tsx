import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { FiSkipForward } from 'react-icons/fi'

import styled from 'theme'
import { useIntroContext } from 'context/IntroContext'
import { MotionButton } from './Button'
import { Text, Box } from './styled'

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
  onComplete: () => void
  color: string
}

const Leon: React.FC<IProps> = ({ onComplete, color }) => {
  const { setIsAfterIntro } = useIntroContext()

  useEffect(() => {
    setIsAfterIntro(true)
  })

  const pixelRatio = 2
  const defaultWeight = 200
  let screenWidth: number
  let screenHeight: number
  let ctx: CanvasRenderingContext2D
  const rafId = useRef<number>()
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
      onComplete: onComplete,
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

  return (
    <>
      <MotionButton
        sx={{
          position: 'fixed',
          color: color,
          bottom: [4, null, 8],
          right: [8, 12, 16, null, 48],
          fontSize: 'sm',
          bg: 'transparent',
          padding: 4,
          ':hover, :focus, :active': {
            bg: 'transparent',
            color: 'primary.500',
          },
        }}
        onClick={onComplete}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{
          y: 50,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { type: 'spring', stiffness: 200, delay: 1 },
        }}
      >
        <Text display="flex" alignItems="center" mb={3}>
          Skip animation <Box as={FiSkipForward} ml={1} />
        </Text>
      </MotionButton>
      <Canvas ref={canvas} />
    </>
  )
}

export default Leon

const Canvas = styled.canvas`
  display: block;
`

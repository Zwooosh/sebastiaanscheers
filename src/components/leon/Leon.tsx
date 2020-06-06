import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import LeonSans from '../../lib/leon.js'

const Leon = () => {
  const canvas = useRef<HTMLCanvasElement>()
  const pixelRatio = 2
  const sizeRatio = 16

  let screenWidth: number
  let screenHeight: number
  let ctx: CanvasRenderingContext2D

  const firstNameText = 'Sebastiaan'.split('')
  const firstName = {
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

  const getSize = (ratio) => {
    return screenWidth / 0.5 / ratio
  }

  const init = () => {
    ctx = canvas.current.getContext('2d')
    canvasResize()

    firstName.leon = firstNameText.map((l) => {
      const letter = new LeonSans({
        text: l,
        color: ['#000000'],
        size: getSize(sizeRatio),
        weight: 200,
      })
      // letter.drawing.forEach((d) => (d.value = 0))
      return letter
    })

    lastName.leon = lastNameText.map((l) => {
      const letter = new LeonSans({
        text: l,
        color: ['#000000'],
        size: getSize(sizeRatio),
        weight: 200,
      })
      // letter.drawing.forEach((d) => (d.value = 0))
      return letter
    })
  }

  const draw = () => {
    requestAnimationFrame(draw)
    ctx.clearRect(0, 0, screenWidth, screenHeight)

    let w = 0,
      h = 0
    for (let i = 0; i < firstName.total; i++) {
      w += firstName.leon[i].rect.w + 5
      h = firstName.leon[i].rect.h
    }
    firstName.rect = { w, h }

    w = 0
    h = 0
    for (let i = 0; i < lastName.total; i++) {
      w += lastName.leon[i].rect.w + 5
      h = lastName.leon[i].rect.h
    }
    lastName.rect = { w, h }

    let x = (screenWidth - firstName.rect.w) / 2
    const y = (screenHeight - firstName.rect.h - lastName.rect.h) / 2
    let space = 0

    for (let j = 0; j < firstName.total; j++) {
      firstName.leon[j].position(x + space, y)
      firstName.leon[j].draw(ctx)
      space += firstName.leon[j].rect.w + 5
    }

    x = (screenWidth - lastName.rect.w) / 2
    space = 0
    for (let j = 0; j < lastName.total; j++) {
      lastName.leon[j].position(x + space, y + firstName.rect.h)
      lastName.leon[j].draw(ctx)
      space += lastName.leon[j].rect.w + 5
    }
  }

  const animateStroke = () => {
    for (let i = 0; i < firstName.total; i++) {
      const letter = firstName.leon[i]
      for (let j = 0; j < firstName.leon[i].drawing.length; j++) {
        gsap.fromTo(
          letter.drawing[j],
          2,
          {
            value: 0,
          },
          {
            delay: i * 0.2,
            value: 1,
            ease: 'power4.out',
          }
        )
      }
      const delay = 0.3 * (firstName.total - 1)
      for (let i = 0; i < lastName.total; i++) {
        const letter = lastName.leon[i]
        for (let j = 0; j < lastName.leon[i].drawing.length; j++) {
          gsap.fromTo(
            letter.drawing[j],
            2,
            {
              value: 0,
            },
            {
              delay: delay + i * 0.2,
              value: 1,
              ease: 'power4.out',
            }
          )
        }
      }
      gsap.delayedCall(
        0.3 * (firstName.total + lastName.total - 1) + 0.4,
        animateWeight
      )
    }
  }

  const animateWeight = () => {
    for (let i = 0; i < firstName.total; i++) {
      gsap.to(firstName.leon[i], {
        duration: 1.4,
        delay: 0.06 * i,
        weight: 600,
        ease: 'power4.out',
      })
    }
    const delay = 0.06 * (firstName.total - 1)
    for (let i = 0; i < lastName.total; i++) {
      gsap.to(lastName.leon[i], {
        duration: 1.4,
        delay: delay + 0.06 * i,
        weight: 600,
        ease: 'power4.out',
      })
    }
  }

  useEffect(() => {
    init()
    requestAnimationFrame(draw)
    // animateStroke()
  }, [canvas])

  useEffect(() => {
    window.addEventListener('resize', canvasResize, false)
    return () => {
      window.removeEventListener('resize', canvasResize, false)
    }
  }, [])

  return <canvas ref={canvas}></canvas>
}

export default Leon

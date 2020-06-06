import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import Router from 'next/router'

import LeonSans from '../../lib/leon.js'

interface IFont {
  total: number
  leon: typeof LeonSans[]
  rect: { h: number; w: number }
  gap?: { x: number; y: number }
}

const Leon = () => {
  const canvas = useRef<HTMLCanvasElement>()
  const pixelRatio = 2
  const defaultWeight = 200

  let screenWidth: number
  let screenHeight: number
  let ctx: CanvasRenderingContext2D

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
  const lastNameText = 'Scheers.nl'.split('')
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
    const sizeRatio = 16
    const textColor = '#000000'

    ctx = canvas.current.getContext('2d')
    canvasResize()

    firstName.leon = firstNameText.map((l) => {
      const letter = new LeonSans({
        text: l,
        color: [textColor],
        size: getSize(sizeRatio),
        weight: defaultWeight,
      })
      // letter.drawing.forEach((d) => (d.value = 0))
      return letter
    })

    lastName.leon = lastNameText.map((l) => {
      const letter = new LeonSans({
        text: l,
        color: [textColor],
        size: getSize(sizeRatio),
        weight: defaultWeight,
      })
      // letter.drawing.forEach((d) => (d.value = 0))
      return letter
    })
  }

  const render = () => {
    requestAnimationFrame(render)
    ctx.clearRect(0, 0, screenWidth, screenHeight)

    const letterSpacing = 5

    // Tracking firstName
    let w = 0,
      h = 0
    for (const l of firstName.leon) {
      w += l.rect.w + letterSpacing
      h = l.rect.h
    }
    firstName.rect = { w, h }

    // Tracking lastName
    w = 0
    h = 0
    for (const l of lastName.leon) {
      w += l.rect.w + letterSpacing
      h = l.rect.h
    }
    lastName.rect = { w, h }

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
  // 0,0,sw,sh
  function a(e, t, i, n) {
    // sw - 0
    // sh - 0
    var o = i - e,
      s = n - t
    return Math.sqrt(o * o + s * s)
  }

  const animateZoom = () => {
    const duration = 1.8
    const size =
      0.6 * Math.sqrt(screenWidth * screenWidth + screenHeight * screenHeight)
    console.log('animateZoom -> size', size)
    const x = -(size >> 1)
    const y = size / 20

    for (let i = 0; i < firstName.total; i++) {
      gsap.to(firstName.leon[i], {
        duration,
        size,
        weight: 1,
        ease: 'power4.inOut',
      })
      gsap.to(firstName.gap, {
        duration,
        x,
        y,
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
    const x = -(size >> 1)
    const y = size / 10

    for (const l of firstName.leon) {
      gsap.to(l, {
        duration: duration,
        weight: 900,
        ease: 'power4.inOut',
      })
      gsap.to(l, {
        duration: duration,
        size,
        ease: 'power4.in',
      })
    }
    gsap.to(firstName.gap, {
      duration: duration,
      x,
      y,
      ease: 'power4.in',
      onComplete: function () {
        // Router.push('/home')
      },
    })
  }

  useEffect(() => {
    init()
    requestAnimationFrame(render)
    animateZoom()
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

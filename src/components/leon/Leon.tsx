import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import LeonSans from '../../lib/leon.js'

const Leon = () => {
  const canvas = useRef<HTMLCanvasElement>()
  const pixelRatio = 2
  let sw
  let sh
  let ctx
  const sizeRatio = 16
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
    sw = document.body.clientWidth
    sh = document.body.clientHeight

    canvas.current.width = sw * pixelRatio
    canvas.current.height = sh * pixelRatio
    canvas.current.style.width = sw + 'px'
    canvas.current.style.height = sh + 'px'
    ctx.scale(pixelRatio, pixelRatio)

    // if (leon) leon.size = getSize(sizeRatio)
  }

  const getSize = (ratio) => {
    // let ratio = Math.sqrt(sw * sw + sh * sh) / 1800
    // if (ratio > 1) ratio = 1
    // else if (ratio < 0.5) ratio = 0.5
    // return size * ratio
    return sw / 0.5 / ratio
  }

  const init = () => {
    ctx = canvas.current.getContext('2d')
    canvasResize()

    firstName.leon = firstNameText.map(
      (l) =>
        new LeonSans({
          text: l,
          color: ['#000000'],
          size: getSize(sizeRatio),
          weight: 200,
        })
    )

    // leon = new LeonSans({
    //   text: 'Sebastiaan\nScheers',
    //   color: ['#000000'],
    //   size: getSize(sizeRatio),
    //   maxWidth: sw,
    //   weight: 200,
    //   align: 'center',
    // })
  }

  const draw = () => {
    requestAnimationFrame(draw)
    ctx.clearRect(0, 0, sw, sh)

    let w = 0,
      h = 0
    for (let i = 0; i < firstName.total; i++) {
      w += firstName.leon[i].rect.w + 5
      h = firstName.leon[i].rect.h
    }
    firstName.rect = { w, h }

    const x = (sw - firstName.rect.w) / 2
    const y = (sh - firstName.rect.h) / 2
    let space = 0

    for (let j = 0; j < firstName.total; j++) {
      firstName.leon[j].position(x + space, y)
      firstName.leon[j].draw(ctx)
      space += firstName.leon[j].rect.w + 5
    }

    // const x = (sw - leon.rect.w) / 2
    // const y = (sh - leon.rect.h) / 2
    // leon.position(x, y)

    // leon.draw(ctx)
  }

  const animate = () => {
    // const tl = gsap.timeline()
    // Draw letters
    // for (let i = 0; i < total; i++) {
    //   gsap.killTweensOf(leon.drawing[i])
    //   gsap.fromTo(
    //     leon.drawing[i],
    //     2,
    //     {
    //       value: 0,
    //     },
    //     {
    //       delay: i * 0.3,
    //       value: 1,
    //       ease: 'power4.out',
    //     }
    //   )
    // }
    // for (let i = 0; i < total; i++) {
    //   tl.fromTo(
    //     leon.drawing[i],
    //     {
    //       duration: 0.3,
    //       value: 0,
    //     },
    //     {
    //       // delay: i * 0.3,
    //       value: 1,
    //       ease: 'power4.out',
    //     }
    //   )
    // }

    // Expand width
    // for (let i = 0; i < total; i++) {
    //   gsap.to(leon[i], {
    //     duration: 1.4,
    //     delay: 0.06 * i,
    //     weight: 600,
    //     ease: 'power4.out',
    //   })
    // }
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
      gsap.delayedCall(0.3 * (firstName.total - 1) + 0.4, weight)
    }
  }

  const weight = () => {
    for (let i = 0; i < firstName.total; i++) {
      gsap.to(firstName.leon[i], {
        duration: 1.4,
        delay: 0.06 * i,
        weight: 600,
        ease: 'power4.out',
      })
    }
  }

  // const width = () => {
  //   let i,
  //     total = leon.drawing.length
  //   for (i = 0; i < total; i++) {
  //     window.TweenMax.to(leon, 1.4, {
  //       delay: 0.06 * i,
  //       weight: 900,
  //       size: 120,
  //       ease: window.Power4.easeOut,
  //     })
  //   }
  // }

  // const grow = () => {
  //   let i,
  //     total = leon.drawing.length
  //   for (i = 0; i < total; i++) {
  //     window.TweenMax.to(leon, 1.8, {
  //       x: 100,
  //       y: 100,
  //       ease: window.Power4.easeOut,
  //     })
  //   }
  // }

  useEffect(() => {
    init()
    requestAnimationFrame(draw)
    animate()
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

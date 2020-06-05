import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import LeonSans from '../../lib/leon.js'

const Leon = () => {
  const canvas = useRef<HTMLCanvasElement>()
  const pixelRatio = 2
  let sw
  let sh
  let ctx, leon
  const sizeRatio = 16
  const text = 'Sebastiaan\nScheers'.split('')
  const total = text.length

  const canvasResize = () => {
    sw = document.body.clientWidth
    sh = document.body.clientHeight

    canvas.current.width = sw * pixelRatio
    canvas.current.height = sh * pixelRatio
    canvas.current.style.width = sw + 'px'
    canvas.current.style.height = sh + 'px'
    ctx.scale(pixelRatio, pixelRatio)

    if (leon) leon.size = getSize(sizeRatio)
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

    // for (let i = 0; i < total; i++) {
    //   const letter = new LeonSans({
    //     text: text[i],
    //     color: ['#000000'],
    //     size: getSize(sizeRatio),
    //     weight: 200,
    //   })
    //   leon.push(letter)
    // }

    leon = new LeonSans({
      text: 'Sebastiaan\nScheers',
      color: ['#000000'],
      size: getSize(sizeRatio),
      maxWidth: sw,
      weight: 200,
      align: 'center',
    })
    console.log('init -> leon', leon)
  }

  const draw = () => {
    requestAnimationFrame(draw)
    ctx.clearRect(0, 0, sw, sh)

    const x = (sw - leon.rect.w) / 2
    const y = (sh - leon.rect.h) / 2
    leon.position(x, y)

    leon.draw(ctx)
  }

  const animate = () => {
    const tl = gsap.timeline()
    // Draw letters
    for (let i = 0; i < total; i++) {
      gsap.killTweensOf(leon.drawing[i])
      gsap.fromTo(
        leon.drawing[i],
        2,
        {
          value: 0,
        },
        {
          delay: i * 0.3,
          value: 1,
          ease: 'power4.out',
        }
      )
    }
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

'use client'

import { toJpeg, toPng } from 'html-to-image'
import { useEffect, useRef, useState } from 'react'
import { track } from 'utils/matomo'
import useTheme from 'components/layout/UseTheme'

export default function useScreenshot(slug: string, tracking: string, format: string = 'png') {
  const ref = useRef<HTMLDivElement>(null)

  const { theme } = useTheme()
  const transformFn = format === 'png' ? toPng : toJpeg

  const [isScreenshotting, setIsScreenshotting] = useState(false)
  useEffect(() => {
    if (isScreenshotting && ref.current !== null) {
      transformFn(ref.current, {
        cacheBust: true,
        backgroundColor: theme === 'night' ? 'black' : 'white', // variables CSS non disponibles au moment du screenshot
      })
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = `${slug}.${format}`
          link.href = dataUrl
          link.click()

          setIsScreenshotting(false)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [ref, isScreenshotting, format, slug, transformFn])

  const takeScreenshot = () => {
    track(tracking, 'Screenshot', slug)
    setIsScreenshotting(true)
  }

  return { ref, takeScreenshot, isScreenshotting }
}

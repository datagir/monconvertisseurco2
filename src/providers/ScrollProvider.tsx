'use client'

import { useEffect } from 'react'

const ScrollProvider = () => {
  useEffect(() => {
    if (window && window.location.hash) {
      const anchor = window.location.hash.replace('#', '')
      const element = document.getElementById(anchor)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [])

  return null
}

export default ScrollProvider

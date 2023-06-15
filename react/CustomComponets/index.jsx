import React, { useEffect } from 'react'
// import { Container } from './styles';
// import './style.global.css'

const Custom = () => {
  function removeSpanStyles() {
    const elements = document.querySelectorAll(
      '.vtex-store-components-3-x-productDescriptionText.c-muted-1 > *'
    )

    elements.forEach(element => {
      const spans = element.querySelectorAll('span')

      spans.forEach(span => {
        span.removeAttribute('style')
      })
    })
  }

  useEffect(() => {
    removeSpanStyles()
  }, [])

  return <div id="custom" className="custom" />
}

export { Custom }

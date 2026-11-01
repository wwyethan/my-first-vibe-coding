import { useEffect, useRef } from 'react'
import './MatrixRain.css'

function MatrixRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = '01'
    const fontSize = 7
    const columns = Math.floor(canvas.width / fontSize)
    const dropsPerColumn = 2
    const drops = Array(columns * dropsPerColumn)
      .fill(0)
      .map(() => Math.floor(Math.random() * (canvas.height / fontSize)))

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#0f0'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const col = i % columns
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillStyle = Math.random() > 0.98 ? '#fff' : '#0f0'
        ctx.fillText(text, col * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.89) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 12)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="matrix-rain" />
}

export default MatrixRain

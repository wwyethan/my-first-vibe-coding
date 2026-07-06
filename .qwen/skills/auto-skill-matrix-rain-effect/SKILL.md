---
name: matrix-rain-effect
description: Create animated Matrix-style digital rain background using HTML5 Canvas
source: auto-skill
extracted_at: '2026-07-06T13:03:16.776Z'
---

# Matrix Rain Effect with Canvas

## Overview

Create a "Matrix"-style falling code background using HTML5 `<canvas>` and JavaScript. The effect shows characters (typically 0s and 1s) falling down the screen like rain.

## Implementation Steps

### 1. Create Canvas Component

```jsx
import { useEffect, useRef } from 'react'
import './MatrixRain.css'

function MatrixRain() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Set canvas size to window size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = '01'
    const fontSize = 12  // Smaller = more dense
    const columns = canvas.width / fontSize
    const drops = Array(Math.floor(columns)).fill(1)

    function draw() {
      // Fade previous frame (creates trail effect)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#0f0'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillStyle = Math.random() > 0.98 ? '#fff' : '#0f0'
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Reset drop to top randomly after reaching bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 30)  // Lower = faster

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
```

### 2. CSS for Background Layer

```css
.matrix-rain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.3;  // Adjust for visibility
  pointer-events: none;  // Don't block clicks
}
```

### 3. Usage in App

```jsx
function App() {
  return (
    <div className="app">
      <MatrixRain />
      {/* Other content with z-index: 1 */}
    </div>
  )
}
```

## Key Parameters

| Parameter | Effect |
|-----------|--------|
| `fontSize` | Smaller = more columns, denser rain |
| `setInterval(draw, N)` | Lower N = faster animation |
| `rgba(0, 0, 0, 0.05)` | Lower alpha = longer trails |
| `opacity` in CSS | Controls overall visibility |

## Customization

- **Change characters**: Modify `chars` string (e.g., `'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%'`)
- **Change colors**: Modify `#0f0` (green) to any color
- **Multiple layers**: Create multiple canvas elements with different speeds/opacities

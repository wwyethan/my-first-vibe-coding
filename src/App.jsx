import { useState } from 'react'
import MatrixRain from './components/MatrixRain'
import About from './components/About'
import Skills from './components/Skills'
import CastleMode from './components/CastleMode'
import './App.css'

function App() {
  const [castleMode, setCastleMode] = useState(false)

  // 离开城堡模式；如果 toSkills 为 true，就顺便滚动到 Skills 那一区
  const exitCastle = (toSkills = false) => {
    setCastleMode(false)
    if (toSkills) {
      setTimeout(() => {
        document.querySelector('.skills')?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
    }
  }

  return (
    <div className="app">
      <MatrixRain />
      <About />
      <Skills />
      <footer className="footer">
        <p>Made with ❤️ by Ethan</p>
        <button className="castle-button" aria-label="城堡" onClick={() => setCastleMode(true)}>🏰</button>
      </footer>
      {castleMode && <CastleMode onExit={exitCastle} />}
    </div>
  )
}

export default App

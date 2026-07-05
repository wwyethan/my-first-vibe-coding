import { useState, useEffect } from 'react'
import './About.css'

function About() {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'HeavySniper'

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      setDisplayText(fullText.slice(0, index + 1))
      index++
      if (index >= fullText.length) {
        clearInterval(timer)
      }
    }, 150)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="about">
      <div className="about-card">
        <div className="terminal-header">
          <span className="terminal-dot red"></span>
          <span className="terminal-dot yellow"></span>
          <span className="terminal-dot green"></span>
          <span className="terminal-title">about_me.exe</span>
        </div>
        <div className="terminal-body">
          <div className="terminal-line">
            <span className="prompt">&gt;</span>
            <span className="command">whoami</span>
          </div>
          <h1 className="neon-name">
            {displayText}
            <span className="cursor">_</span>
          </h1>
          <div className="terminal-line">
            <span className="prompt">&gt;</span>
            <span className="command">cat info.txt</span>
          </div>
          <div className="info-grid">
            <div className="info-item">
              <span className="emoji">🎂</span>
              <span>10 years old</span>
            </div>
            <div className="info-item">
              <span className="emoji">📍</span>
              <span>Hong Kong</span>
            </div>
            <div className="info-item">
              <span className="emoji">🎓</span>
              <span>Grade 5</span>
            </div>
            <div className="info-item">
              <span className="emoji">🚀</span>
              <span>Learning AI & Vibe Coding</span>
            </div>
          </div>
          <div className="terminal-line">
            <span className="prompt">&gt;</span>
            <span className="command">cat languages.txt</span>
          </div>
          <div className="lang-tags">
            <span className="lang-tag">🇬🇧 English</span>
            <span className="lang-tag">🇭🇰 广东话</span>
            <span className="lang-tag">🇨🇳 普通话</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

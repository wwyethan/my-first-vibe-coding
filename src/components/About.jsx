import './About.css'

function About() {
  return (
    <section className="about">
      <div className="about-card">
        <div className="avatar">👋</div>
        <h1>Hi, I'm <span className="highlight">HeavySniper</span></h1>
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
        <div className="languages">
          <h3>Languages I Speak</h3>
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

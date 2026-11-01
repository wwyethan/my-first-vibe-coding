import './Skills.css'

function Skills() {
  const skills = [
    { name: 'JavaScript', icon: '⚡', level: 'Intermediate', color: '#f7df1e' },
    { name: 'React', icon: '⚛️', level: 'Intermediate', color: '#61dafb' },
    { name: 'AI', icon: '🤖', level: 'Learning', color: '#ff6b6b' },
    // Vibe Coding 卡可以点击，新分页打开学习笔记
    { name: 'Vibe Coding', icon: '🎵', level: 'Leveling Up!', color: '#a29bfe', link: `${import.meta.env.BASE_URL}learn/index.html` },
    { name: 'HozombFPS', icon: '🔫', level: 'Pro', color: '#ff9f43' },
    { name: 'Fighter Aircraft Pilot', icon: '🛫', level: 'Pro', color: '#0abde3' },
    { name: 'Mathematics', icon: '🧮', level: 'Intermediate', color: '#6c5ce7' },
    { name: 'Biology', icon: '🧬', level: 'Intermediate', color: '#00b894' },
    { name: 'Morse Code', icon: '📡', level: 'Intermediate', color: '#e17055' },
  ]

  return (
    <section className="skills">
      <div className="skills-header">
        <span className="prompt">&gt;</span>
        <h2 className="skills-title">ls ./skills/</h2>
      </div>
      <div className="skills-grid">
        {skills.map((skill, index) => {
          const cardStyle = {
            '--glow-color': skill.color,
            animationDelay: `${index * 0.1}s`,
          }
          const inner = (
            <>
              <div className="skill-icon">{skill.icon}</div>
              <h3 className="skill-name">{skill.name}</h3>
              <span className="skill-level">{skill.level}</span>
              {skill.link && <span className="skill-badge">📚 學習筆記</span>}
            </>
          )
          return skill.link ? (
            <a
              key={skill.name}
              className="skill-card skill-link"
              style={cardStyle}
              href={skill.link}
              target="_blank"
              rel="noopener noreferrer"
              title="打開學習筆記（新分頁）"
            >
              {inner}
            </a>
          ) : (
            <div key={skill.name} className="skill-card" style={cardStyle}>
              {inner}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Skills

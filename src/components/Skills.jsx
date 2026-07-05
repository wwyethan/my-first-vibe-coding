import './Skills.css'

function Skills() {
  const skills = [
    { name: 'JavaScript', icon: '⚡', level: 'Learning', color: '#f7df1e' },
    { name: 'React', icon: '⚛️', level: 'Learning', color: '#61dafb' },
    { name: 'AI', icon: '🤖', level: 'Exploring', color: '#ff6b6b' },
    { name: 'Vibe Coding', icon: '🎵', level: 'Having Fun!', color: '#a29bfe' },
    { name: 'POXEL.IO', icon: '🔫', level: 'Playing', color: '#ff9f43' },
    { name: 'BOXEL.IO', icon: '⚔️', level: 'Playing', color: '#0abde3' },
  ]

  return (
    <section className="skills">
      <h2 className="skills-title">My Skills</h2>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div key={skill.name} className="skill-card">
            <div className="skill-icon">{skill.icon}</div>
            <h3 className="skill-name">{skill.name}</h3>
            <span className="skill-level">{skill.level}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills

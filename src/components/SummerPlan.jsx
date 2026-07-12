import './SummerPlan.css'

function SummerPlan() {
  const plans = [
    {
      title: '暑期学习约定书',
      icon: '📜',
      desc: '我们的约定 · 过关制',
      link: '/my-first-vibe-coding/summer/agreement.html',
    },
    {
      title: '暑期学习打卡表',
      icon: '✅',
      desc: '每周一张 · 做完打勾',
      link: '/my-first-vibe-coding/summer/checklist.html',
    },
  ]

  return (
    <section className="summer-plan">
      <div className="summer-header">
        <span className="prompt">&gt;</span>
        <h2 className="summer-title">ls ./summer-plan/</h2>
      </div>
      <div className="summer-grid">
        {plans.map((plan) => (
          <a
            key={plan.title}
            href={plan.link}
            target="_blank"
            rel="noopener noreferrer"
            className="summer-card"
          >
            <div className="summer-icon">{plan.icon}</div>
            <h3 className="summer-name">{plan.title}</h3>
            <span className="summer-desc">{plan.desc}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

export default SummerPlan

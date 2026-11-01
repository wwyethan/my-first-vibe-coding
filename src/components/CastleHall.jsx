import { useMemo, useState } from 'react'
import './CastleHall.css'

function CastleHall({ onBack }) {
  const [view, setView] = useState('hall') // 'hall' 大厅 | 'room2' 下一个房间

  // 朝你飞来的金币（用 useMemo 固定，避免重渲染乱跳）
  const coins = useMemo(
    () =>
      Array.from({ length: 16 }, () => ({
        dx: (Math.random() * 2 - 1) * 58, // 飞向左右（vw）
        dy: (Math.random() * 2 - 1) * 58, // 飞向上下（vh）
        size: 26 + Math.random() * 30,
        dur: 2.6 + Math.random() * 2.6,
        delay: Math.random() * 4,
        endScale: 2.2 + Math.random() * 2.6,
        spin: (Math.random() * 540 + 180) * (Math.random() > 0.5 ? 1 : -1),
      })),
    []
  )

  // 漂浮的金色光点
  const sparkles = useMemo(
    () =>
      Array.from({ length: 45 }, () => ({
        left: Math.random() * 100,
        top: 30 + Math.random() * 70,
        size: Math.random() * 4 + 2,
        dur: 3 + Math.random() * 4,
        delay: Math.random() * 6,
      })),
    []
  )

  // ===== 下一个房间（占位，内容以后再做）=====
  if (view === 'room2') {
    return (
      <div className="hall-overlay room2">
        <div className="room2-card">
          <span className="big">🚪✨</span>
          <h2>下一个房间</h2>
          <p>
            这里还很空～ 内容以后再加！
            <br />
            你想在这个房间里放什么呢？
          </p>
        </div>
        <button className="hall-back" onClick={() => setView('hall')}>
          ← 回到大厅
        </button>
      </div>
    )
  }

  // ===== 大厅 =====
  return (
    <div className="hall-overlay">
      <div className="hall-bg" />
      <div className="door-rays" />
      <div className="hall-glow" />
      <div className="pillar left" />
      <div className="pillar right" />
      <div className="hall-floor" />

      {/* 大厅正中间的门：点击进入下一个房间 */}
      <div
        className="grand-door"
        role="button"
        tabIndex={0}
        aria-label="进入下一个房间"
        title="点击进入下一个房间"
        onClick={() => setView('room2')}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setView('room2')
          }
        }}
      >
        <div className="door-glow" />
        <div className="door-frame" />
        <div className="door-panel left" />
        <div className="door-panel right" />
        <div className="door-band b1" />
        <div className="door-band b2" />
        <div className="door-handle left" />
        <div className="door-handle right" />
        <div className="door-seam" />
      </div>

      {/* 漂浮的金色光点 */}
      <div className="sparkles">
        {sparkles.map((s, i) => (
          <span
            key={i}
            className="sparkle"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDuration: `${s.dur}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* 朝你飞来的金币 */}
      <div className="coins">
        {coins.map((c, i) => (
          <span
            key={i}
            className="coin"
            style={{
              width: `${c.size}px`,
              height: `${c.size}px`,
              '--dx': `${c.dx}vw`,
              '--dy': `${c.dy}vh`,
              '--end-scale': c.endScale,
              '--spin': `${c.spin}deg`,
              animationDuration: `${c.dur}s`,
              animationDelay: `${c.delay}s`,
            }}
          />
        ))}
      </div>

      {/* 顶部返回 & 底部提示 */}
      <button className="hall-back" onClick={onBack}>
        ← 回到城堡外面
      </button>
      <p className="hall-hint">🚪 点击中间的门 → 进入下一个房间　·　按 Esc 离开城堡</p>
    </div>
  )
}

export default CastleHall

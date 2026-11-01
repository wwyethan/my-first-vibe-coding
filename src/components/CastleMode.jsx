import { useEffect, useMemo, useState } from 'react'
import './CastleMode.css'

// 附魔风格的神秘符号：北欧符文 + 运算/数学符号（像 Minecraft 附魔台那种）
const GLYPHS = [
  'ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ',
  'ᛁ', 'ᛃ', 'ᛇ', 'ᛈ', 'ᛉ', 'ᛊ', 'ᛏ', 'ᛒ', 'ᛖ', 'ᛗ',
  'ᛚ', 'ᛜ', 'ᛝ', 'ᛟ', '∞', '∑', '∆', '√', '⊕', '≈', '∮', '⊗',
]

function CastleMode({ onExit }) {
  const [bursting, setBursting] = useState(false) // 鼠标移开：缩小 + 全屏绿光炸开
  const [warping, setWarping] = useState(false) // 点击：符号组成魔法阵
  const [teleporting, setTeleporting] = useState(false) // 点击后：传送闪光

  // 被吸进漩涡的符号（用 useMemo 固定，避免重渲染时乱跳）
  const symbols = useMemo(
    () =>
      Array.from({ length: 18 }, () => ({
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        start: Math.random() * 360,
        r: 95 + Math.random() * 80,
        dur: 3 + Math.random() * 3,
        delay: Math.random() * 5,
        size: 14 + Math.random() * 13,
      })),
    []
  )

  // 点击后在空中排成魔法阵的符号（均匀分布成一圈）
  const circleGlyphs = useMemo(
    () => Array.from({ length: 12 }, (_, i) => ({
      glyph: GLYPHS[(i * 3) % GLYPHS.length],
      a: i * 30,
    })),
    []
  )

  // 星星的固定位置（用 useMemo 记住，避免重渲染时乱跳）
  const stars = useMemo(
    () =>
      Array.from({ length: 70 }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 52,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 3,
      })),
    []
  )

  // 按 Esc 键也能回到原本的页面
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onExit(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onExit])

  // 点击漩涡：符号组成魔法阵 → 传送闪光 → 回到 Skills 页面
  const handleClick = () => {
    if (warping) return
    setWarping(true)
    setTimeout(() => setTeleporting(true), 1000)
    setTimeout(() => onExit(true), 1450)
  }

  return (
    <div className="castle-overlay">
      <div className="castle-scene">
        {/* 星星 */}
        {stars.map((s, i) => (
          <span
            key={i}
            className="star"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}

        {/* 月亮 */}
        <div className="moon" />

        {/* 云 */}
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />

        {/* 巨大的动漫城堡（SVG 画的） */}
        <svg className="castle" viewBox="0 0 800 620" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
          <defs>
            <linearGradient id="stoneGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a99bd0" />
              <stop offset="40%" stopColor="#544c82" />
              <stop offset="100%" stopColor="#241f3d" />
            </linearGradient>
            <linearGradient id="stoneDark" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6d6299" />
              <stop offset="100%" stopColor="#221d3a" />
            </linearGradient>
            <linearGradient id="roofGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5dffd0" />
              <stop offset="50%" stopColor="#14c394" />
              <stop offset="100%" stopColor="#0a6b52" />
            </linearGradient>
            <linearGradient id="roofDark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2fd6a6" />
              <stop offset="100%" stopColor="#08543f" />
            </linearGradient>
            <radialGradient id="gateGlow" cx="50%" cy="85%" r="75%">
              <stop offset="0%" stopColor="#fff6c8" />
              <stop offset="45%" stopColor="#ffc76b" />
              <stop offset="100%" stopColor="#a85a1c" />
            </radialGradient>
            <radialGradient id="winGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff8d0" />
              <stop offset="100%" stopColor="#ffcb52" />
            </radialGradient>
            <radialGradient id="horizonGlow" cx="50%" cy="100%" r="60%">
              <stop offset="0%" stopColor="rgba(255,170,90,0.7)" />
              <stop offset="100%" stopColor="rgba(255,120,80,0)" />
            </radialGradient>
          </defs>

          <ellipse cx="400" cy="620" rx="430" ry="200" fill="url(#horizonGlow)" />

          {/* 远处小塔 */}
          <rect x="82" y="415" width="58" height="205" fill="url(#stoneDark)" />
          <polygon points="111,345 76,420 146,420" fill="url(#roofDark)" />
          <rect x="660" y="415" width="58" height="205" fill="url(#stoneDark)" />
          <polygon points="689,345 654,420 724,420" fill="url(#roofDark)" />

          {/* 左右城墙 */}
          <rect x="120" y="470" width="225" height="150" fill="url(#stoneGrad)" />
          <rect x="455" y="470" width="225" height="150" fill="url(#stoneGrad)" />
          {Array.from({ length: 7 }).map((_, i) => (
            <rect key={`blL${i}`} x={124 + i * 32} y={453} width="18" height="19" fill="url(#stoneGrad)" />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <rect key={`blR${i}`} x={459 + i * 32} y={453} width="18" height="19" fill="url(#stoneGrad)" />
          ))}

          {/* 左塔 */}
          <rect x="203" y="328" width="88" height="292" fill="url(#stoneGrad)" />
          <polygon points="247,172 196,333 298,333" fill="url(#roofGrad)" />
          <rect x="196" y="325" width="102" height="12" rx="3" fill="#2c2650" />
          <line x1="247" y1="172" x2="247" y2="136" stroke="#e8e0ff" strokeWidth="3" />
          <polygon points="247,138 285,150 247,162" fill="#ff5d7a" />

          {/* 右塔 */}
          <rect x="509" y="328" width="88" height="292" fill="url(#stoneGrad)" />
          <polygon points="553,172 502,333 604,333" fill="url(#roofGrad)" />
          <rect x="502" y="325" width="102" height="12" rx="3" fill="#2c2650" />
          <line x1="553" y1="172" x2="553" y2="136" stroke="#e8e0ff" strokeWidth="3" />
          <polygon points="553,138 515,150 553,162" fill="#ff5d7a" />

          {/* 中央主堡 */}
          <rect x="338" y="248" width="124" height="372" fill="url(#stoneGrad)" />
          <polygon points="400,58 330,253 470,253" fill="url(#roofGrad)" />
          <rect x="330" y="245" width="140" height="14" rx="3" fill="#2c2650" />
          <line x1="400" y1="58" x2="400" y2="16" stroke="#e8e0ff" strokeWidth="3.5" />
          <polygon points="400,18 448,32 400,46" fill="#ffd23f" />

          {/* 发光的大门 */}
          <path d="M366 620 L366 538 Q400 492 434 538 L434 620 Z" fill="url(#gateGlow)" />
          <path d="M366 620 L366 538 Q400 492 434 538 L434 620" fill="none" stroke="#2a1a10" strokeWidth="5" />

          {/* 发光窗户 */}
          <g className="win" fill="url(#winGlow)">
            <rect x="356" y="300" width="16" height="24" rx="8" />
            <rect x="428" y="300" width="16" height="24" rx="8" />
            <rect x="356" y="360" width="16" height="24" rx="8" />
            <rect x="428" y="360" width="16" height="24" rx="8" />
            <rect x="228" y="380" width="14" height="22" rx="7" />
            <rect x="256" y="380" width="14" height="22" rx="7" />
            <rect x="228" y="440" width="14" height="22" rx="7" />
            <rect x="256" y="440" width="14" height="22" rx="7" />
            <rect x="530" y="380" width="14" height="22" rx="7" />
            <rect x="558" y="380" width="14" height="22" rx="7" />
            <rect x="530" y="440" width="14" height="22" rx="7" />
            <rect x="558" y="440" width="14" height="22" rx="7" />
          </g>
          <g className="win" fill="url(#winGlow)" opacity="0.9">
            <rect x="150" y="500" width="12" height="18" rx="6" />
            <rect x="300" y="500" width="12" height="18" rx="6" />
            <rect x="488" y="500" width="12" height="18" rx="6" />
            <rect x="638" y="500" width="12" height="18" rx="6" />
          </g>

          {/* 暖色轮廓光 */}
          <g fill="rgba(255,170,110,0.18)">
            <rect x="338" y="248" width="9" height="372" />
            <rect x="203" y="328" width="7" height="292" />
            <rect x="509" y="328" width="7" height="292" />
            <rect x="120" y="470" width="7" height="150" />
            <rect x="455" y="470" width="7" height="150" />
          </g>
        </svg>

        {/* 绿色时光扭曲漩涡 */}
        <div
          className={`time-portal${bursting ? ' bursting' : ''}${warping ? ' warping' : ''}`}
          role="button"
          tabIndex={0}
          aria-label="返回原本的页面"
          title="点我传送回原本的页面"
          onClick={handleClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              handleClick()
            }
          }}
          onMouseLeave={() => {
            if (!warping) setBursting(true)
          }}
        >
          <div className="portal-body">
            <div className="portal-glow" />
            <div className="portal-rays" />
            <div className="portal-swirl" />
            <div className="portal-core" />

            {/* 被吸进去的符号 */}
            <div className="symbols">
              {symbols.map((s, i) => (
                <span key={i} className="sym-wrap" style={{ transform: `rotate(${s.start}deg)` }}>
                  <span
                    className="sym"
                    style={{
                      '--r': `${s.r}px`,
                      '--dur': `${s.dur}s`,
                      fontSize: `${s.size}px`,
                      animationDelay: `${s.delay}s`,
                    }}
                  >
                    {s.glyph}
                  </span>
                </span>
              ))}
            </div>
          </div>

          {/* 点击后出现的魔法阵 */}
          {warping && (
            <div className="magic-circle">
              <div className="mc-ring" />
              <div className="mc-ring r2" />
              <div className="mc-rotor">
                {circleGlyphs.map((g, i) => (
                  <span key={i} className="mc-glyph" style={{ '--a': `${g.a}deg` }}>
                    {g.glyph}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="castle-hint">🌀 点击时光漩涡传送回原本页面（或按 Esc）· 移开鼠标会引爆绿光</p>
      </div>

      {/* 鼠标移开：覆盖全屏的绿光（不在漩涡内部，才能盖住整屏） */}
      {bursting && <div className="screen-flash" onAnimationEnd={() => setBursting(false)} />}

      {/* 点击：传送闪光 */}
      {teleporting && <div className="teleport-flash" />}
    </div>
  )
}

export default CastleMode

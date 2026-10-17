import { motion, useReducedMotion } from 'motion/react'

const W = 340
const H = 120
const box = { x: 22, y: 20, w: 296, h: 82 }

// Scalloped revision cloud around a rectangle, traversed clockwise so
// every arc bulges outward.
function cloudPath(x: number, y: number, w: number, h: number, step = 18) {
  const pts: [number, number][] = []
  const edge = (x1: number, y1: number, x2: number, y2: number) => {
    const n = Math.max(2, Math.round(Math.hypot(x2 - x1, y2 - y1) / step))
    for (let i = 0; i < n; i++) pts.push([x1 + ((x2 - x1) * i) / n, y1 + ((y2 - y1) * i) / n])
  }
  edge(x, y, x + w, y)
  edge(x + w, y, x + w, y + h)
  edge(x + w, y + h, x, y + h)
  edge(x, y + h, x, y)
  const r = step * 0.62
  return (
    `M${pts[0][0]} ${pts[0][1]}` +
    pts
      .slice(1)
      .concat([pts[0]])
      .map(([px, py]) => `A${r} ${r} 0 0 1 ${px.toFixed(1)} ${py.toFixed(1)}`)
      .join('')
  )
}

const cloud = cloudPath(box.x - 8, box.y - 8, box.w + 16, box.h + 16)

export function WipStamp() {
  const still = useReducedMotion() ?? false

  return (
    <svg className="wip-stamp" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Work in progress. Website under construction.">
      <rect x={box.x} y={box.y} width={box.w} height={box.h} className="wip-rect" />
      <text x={W / 2} y={box.y + 40} textAnchor="middle" className="wip-main">Work in progress</text>
      <text x={W / 2} y={box.y + 64} textAnchor="middle" className="wip-sub">Website under construction</text>

      <motion.path
        d={cloud}
        className="wip-cloud"
        initial={still ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 3.4, duration: 1.4, ease: 'easeInOut' }}
      />
      <motion.g
        initial={still ? false : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 4.6, duration: 0.4 }}
        style={{ transformOrigin: '14px 14px' }}
      >
        <path d="M14 2L26 24H2Z" className="wip-delta" />
        <text x="14" y="21" textAnchor="middle" className="wip-delta-text">A</text>
      </motion.g>
    </svg>
  )
}

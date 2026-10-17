import { useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'

// The VA monogram, drawn the way it would be set out on a drawing sheet:
// construction lines first, then member outlines, then the brand fills,
// then dimensions. Path data is copied verbatim from the brand SVG.
const members = [
  {
    id: 'left',
    fill: '#181818',
    depth: 10,
    d: 'M102.416 296.38L214.347 296.52C226.657 319.57 239.945 342.67 252.521 365.65C274.799 406.45 297.295 447.13 320.007 487.7C307.437 509.38 295.923 532.3 283.359 554.27C277.079 566.03 270.482 578.89 263.79 590.3C237.96 543.92 212.41 497.38 187.142 450.69L117.972 324.56C112.857 315.06 107.443 306.01 102.416 296.38Z',
  },
  {
    id: 'navy',
    fill: '#0B2842',
    depth: 18,
    d: 'M458.9 297.55C495.69 298.08 533.88 297.54 570.8 297.54C558.62 318.45 547.53 340.54 536 361.81L462.5 498.24L358.14 691.3C351.73 702.9 344.66 715.57 338.793 727.38L301.639 659.33C295.389 647.86 289.325 635.94 282.91 624.61C290.202 609.59 298.554 595.04 306.484 580.37L348.95 501.42L424.96 360.18C436.21 339.47 447.18 317.96 458.9 297.55Z',
  },
  {
    id: 'mid',
    fill: '#181818',
    depth: 26,
    d: 'M538.43 428.77C539.66 429.65 553.64 455.9 555.96 460.14C568.7 483.84 581.68 507.41 594.9 530.84C591.39 535.82 586.71 545.17 583.71 550.76L565.43 584.74L514.29 679.45C505.77 695.26 496.86 712.8 487.95 728.28L432.42 728.19C413.74 728.3 395.02 727.93 376.34 728.3C379.49 721.43 385.38 711.86 389.16 704.78C402.67 679.47 416.5 654.39 430.09 629.1L492.28 513.95C507.43 485.43 522.81 457.04 538.43 428.77Z',
  },
  {
    id: 'amber',
    fill: '#DC922A',
    depth: 34,
    d: 'M611.74 294.74C613.71 296.19 684.47 423.05 691.43 435.42L856.92 728.36C839.14 728.74 820.22 728.42 802.36 728.41C784.04 728.43 762.49 728.94 744.4 728.19C737.88 717.61 731.1 704.33 724.96 693.28L688.5 628.21L557.26 393.48C569.44 371.57 581.49 349.6 593.4 327.54C598.12 318.89 606.31 302.32 611.74 294.74Z',
  },
]

// Setting-out lines: the two datums plus each member's governing edge,
// extended past the shape so the geometry reads like a drawing.
const construction = [
  'M48 296.4H912',
  'M48 728.4H912',
  'M76.9 250L357.1 760',
  'M484.5 250L227.2 760',
  'M635.2 250L359.1 760',
  'M586.4 250L874.9 760',
]

const T = {
  construction: 0.2,
  outline: 0.9,
  fill: 2.3,
  dims: 2.9,
}

const ease = [0.65, 0, 0.35, 1] as const

function Member({
  m,
  i,
  px,
  py,
  still,
}: {
  m: (typeof members)[number]
  i: number
  px: MotionValue<number>
  py: MotionValue<number>
  still: boolean
}) {
  const x = useTransform(px, (v) => v * m.depth)
  const y = useTransform(py, (v) => v * m.depth)
  return (
    <motion.g style={{ x, y }}>
      <motion.path
        d={m.d}
        fill={m.fill}
        stroke="#0B2842"
        strokeWidth={1.6}
        vectorEffect="non-scaling-stroke"
        initial={still ? false : { pathLength: 0, fillOpacity: 0, strokeOpacity: 1 }}
        animate={{ pathLength: 1, fillOpacity: 1, strokeOpacity: 0 }}
        transition={{
          pathLength: { delay: T.outline + i * 0.18, duration: 1.1, ease },
          fillOpacity: { delay: T.fill + i * 0.12, duration: 0.7, ease: 'easeOut' },
          strokeOpacity: { delay: T.fill + 0.5 + i * 0.12, duration: 0.6 },
        }}
      />
    </motion.g>
  )
}

function Dim({ children, delay, still }: { children: React.ReactNode; delay: number; still: boolean }) {
  return (
    <motion.g
      initial={still ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.6 }}
    >
      {children}
    </motion.g>
  )
}

export function Monogram() {
  const still = useReducedMotion() ?? false
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const px = useSpring(rawX, { stiffness: 60, damping: 18 })
  const py = useSpring(rawY, { stiffness: 60, damping: 18 })

  // Members drift by different amounts as the pointer moves, so the
  // monogram reads as separate pieces stacked in depth.
  useEffect(() => {
    if (still) return
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [still, rawX, rawY])

  return (
    <svg
      className="monogram"
      viewBox="40 200 900 630"
      role="img"
      aria-label="Vira Engineering VA monogram"
    >
      <g className="construction">
        {construction.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            initial={still ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: T.construction + i * 0.08, duration: 0.9, ease }}
          />
        ))}
      </g>

      {members.map((m, i) => (
        <Member key={m.id} m={m} i={i} px={px} py={py} still={still} />
      ))}

      <g className="dims">
        <Dim delay={T.dims} still={still}>
          {/* overall width */}
          <path d="M102.4 744V806M856.9 744V806" />
          <path d="M102.4 790H856.9" markerStart="url(#tick)" markerEnd="url(#tick)" />
          <text x="479.6" y="780" textAnchor="middle">755</text>
        </Dim>
        <Dim delay={T.dims + 0.25} still={still}>
          {/* overall height */}
          <path d="M872 294.7H926M872 728.4H926" />
          <path d="M910 294.7V728.4" markerStart="url(#tick)" markerEnd="url(#tick)" />
          <text x="900" y="511.5" textAnchor="middle" transform="rotate(-90 900 511.5)">434</text>
        </Dim>
        <Dim delay={T.dims + 0.5} still={still}>
          {/* amber member angle off the baseline */}
          <path d="M906.9 728.4A50 50 0 0 1 881.5 771.9" />
          <text x="902" y="768">60.5°</text>
        </Dim>
      </g>

      <defs>
        <marker id="tick" viewBox="-6 -6 12 12" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M-4 4L4 -4" stroke="#3B4250" strokeWidth="1.4" />
        </marker>
      </defs>
    </svg>
  )
}

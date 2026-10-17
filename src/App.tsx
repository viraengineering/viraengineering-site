import { motion, useReducedMotion } from 'motion/react'
import { Monogram } from './components/Monogram'
import { PlotStamp } from './components/PlotStamp'
import { Tape } from './components/Tape'
import { TitleBlock } from './components/TitleBlock'
import wordmark from './assets/vira-wordmark.svg'
import { site } from './site'

const zonesX = ['1', '2', '3', '4', '5', '6', '7', '8']
const zonesY = ['A', 'B', 'C', 'D', 'E']

function Zones() {
  return (
    <>
      {(['top', 'bottom'] as const).map((side) => (
        <div key={side} className={`zones zones-x zones-${side}`} aria-hidden="true">
          {zonesX.map((z) => <span key={z}>{z}</span>)}
        </div>
      ))}
      {(['left', 'right'] as const).map((side) => (
        <div key={side} className={`zones zones-y zones-${side}`} aria-hidden="true">
          {zonesY.map((z) => <span key={z}>{z}</span>)}
        </div>
      ))}
    </>
  )
}

export default function App() {
  const still = useReducedMotion() ?? false

  return (
    <div className="sheet">
      <Zones />

      <div className="frame">
        <PlotStamp />
        <Tape />

        <header className="top">
          <img className="wordmark" src={wordmark} alt="Vira Engineering" width="240" height="107" />
          <a className="top-contact" href={`mailto:${site.email}`}>{site.email}</a>
        </header>

        <main className="hero">
          <motion.div
            className="copy"
            initial={still ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1>Control systems for the infrastructure people rely on every day.</h1>
            <p className="lede">
              Vira Engineering designs and delivers control and monitoring systems for road
              tunnels, motorways, water and power. Our website is still on the drawing board.
            </p>
            <a className="cta" href={`mailto:${site.email}`}>Email us</a>
          </motion.div>

          <figure className="figure">
            <Monogram />
            <figcaption className="drawing-title">
              <span>VA monogram setting out</span>
              <small>Scale: NTS</small>
            </figcaption>
          </figure>
        </main>

        <TitleBlock />
      </div>
    </div>
  )
}

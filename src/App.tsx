import { motion, useReducedMotion } from 'motion/react'
import { Monogram } from './components/Monogram'
import { TitleBlock } from './components/TitleBlock'
import wordmark from './assets/vira-wordmark.svg'
import { site } from './site'

const zonesX = ['1', '2', '3', '4', '5', '6']
const zonesY = ['A', 'B', 'C', 'D']

export default function App() {
  const still = useReducedMotion() ?? false

  return (
    <div className="sheet">
      {/* Zone references along the border, as on a drawing sheet */}
      <div className="zones zones-x" aria-hidden="true">
        {zonesX.map((z) => <span key={z}>{z}</span>)}
      </div>
      <div className="zones zones-y" aria-hidden="true">
        {zonesY.map((z) => <span key={z}>{z}</span>)}
      </div>

      <div className="frame">
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

          <div className="figure">
            <Monogram />
          </div>
        </main>

        <TitleBlock />
      </div>
    </div>
  )
}

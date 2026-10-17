import { useEffect, useState } from 'react'
import { site } from '../site'

const fmt = new Intl.DateTimeFormat('en-AU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
})

// Plot date and file path in the sheet margin, as printed by CAD plotters.
export function PlotStamp() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="plotstamp" aria-hidden="true">
      <span>Plot date &amp; time: {fmt.format(now)}</span>
      <span>File path: {site.domain}/index.html</span>
    </div>
  )
}

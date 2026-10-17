const phrase = 'Website under construction'

// Construction tape across the top of the sheet. The text runs twice so
// the scroll can loop seamlessly at -50%.
export function Tape() {
  const run = Array.from({ length: 8 }, (_, i) => (
    <span key={i}>{phrase}</span>
  ))
  return (
    <div className="tape" role="status">
      <span className="visually-hidden">{phrase}</span>
      <div className="tape-track" aria-hidden="true">
        {run}
        {run}
      </div>
    </div>
  )
}

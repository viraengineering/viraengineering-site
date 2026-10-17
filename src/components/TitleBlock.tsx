import wordmark from '../assets/vira-wordmark.svg'
import { site } from '../site'
import { WipStamp } from './WipStamp'

const today = new Intl.DateTimeFormat('en-AU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})
  .format(new Date())
  .replaceAll('/', '.')

const futureSheets = ['Services', 'Projects', 'About', 'Contact']

// A drawing title block carries the "work in progress" message: the
// site is issued as a preliminary revision, not for construction.
export function TitleBlock() {
  return (
    <footer className="titleblock" aria-label="Site status">
      <div className="wip-box">
        <WipStamp />
      </div>

      <div className="tb-grid">
        <section className="tb-panel tb-rev" aria-label="Revisions">
          <table>
            <colgroup>
              <col className="c-rev" />
              <col />
              <col className="c-app" />
              <col className="c-date" />
            </colgroup>
            <tbody>
              {[0, 1, 2].map((i) => (
                <tr key={i} aria-hidden="true">
                  <td />
                  <td />
                  <td />
                  <td />
                </tr>
              ))}
              <tr>
                <td>{site.revision}</td>
                <td>Preliminary issue</td>
                <td>VIRA</td>
                <td>{today}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th scope="col">Rev.</th>
                <th scope="col">Description</th>
                <th scope="col">App.</th>
                <th scope="col">Date</th>
              </tr>
            </tfoot>
          </table>
        </section>

        <section className="tb-panel tb-scale" aria-label="Scale">
          <span className="tb-label">Scale:</span>
          <span className="scale-value">NTS @ screen</span>
          <svg className="scalebar" viewBox="0 0 130 30" aria-hidden="true">
            <g className="scalebar-text">
              {[0, 250, 500, 750, 1000].map((n, i) => (
                <text key={n} x={6 + i * 28} y="8" textAnchor="middle">{n}</text>
              ))}
              <text x="118" y="24" textAnchor="end">mm</text>
            </g>
            <path d="M6 12H118" className="scalebar-line" />
            <path d="M6 12H34M62 12H90" className="scalebar-fill" />
            <path d="M6 10V14M34 10V14M62 10V14M90 10V14M118 10V14" className="scalebar-line" />
          </svg>
          <span className="tb-foot">Coord. system: GDA2020</span>
        </section>

        <section className="tb-panel tb-key" aria-label="Key plan">
          <span className="tb-label">Key plan</span>
          <div className="keyplan">
            <span className="kp-node kp-here">Home</span>
            <div className="kp-children">
              {futureSheets.map((s) => (
                <span key={s} className="kp-node">{s}</span>
              ))}
            </div>
          </div>
          <span className="tb-foot">Dashed sheets to follow</span>
        </section>

        <section className="tb-panel tb-sign" aria-label="Sign-off">
          <table>
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Name</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Drafted by</td><td>VIRA</td><td>{today}</td></tr>
              <tr><td>Designed by</td><td>VIRA</td><td>{today}</td></tr>
              <tr><td>Checked by</td><td>Pending</td><td /></tr>
              <tr><td>Approved</td><td>Pending</td><td /></tr>
            </tbody>
          </table>
          <div className="tb-classification">
            <span className="tb-label">Classification</span>
            <strong>Public</strong>
          </div>
        </section>

        <section className="tb-panel tb-logo" aria-label="Vira Engineering">
          <img src={wordmark} alt="Vira Engineering" width="160" height="71" />
        </section>

        <section className="tb-panel tb-title" aria-label="Drawing title">
          <div className="tb-title-head">
            <span className="tb-label">Project name / drawing title</span>
            <span className="tb-label">Sheet 1/1</span>
          </div>
          <div className="tb-title-body">
            <strong className="tb-project-name">{site.domain}</strong>
            <span>Stage 1, holding page</span>
            <span>VA monogram setting out</span>
          </div>
          <dl className="tb-title-meta">
            <div>
              <dt>Project stage</dt>
              <dd>Preliminary</dd>
            </div>
            <div>
              <dt>Drawing no.</dt>
              <dd>{site.drawingNo}</dd>
            </div>
            <div>
              <dt>Suit. code</dt>
              <dd>S0</dd>
            </div>
            <div>
              <dt>Revision</dt>
              <dd>{site.revision}</dd>
            </div>
          </dl>
        </section>
      </div>

      <div className="tb-notes">
        <div className="swatches" aria-hidden="true">
          <span style={{ background: 'var(--navy)' }} />
          <span style={{ background: 'var(--amber)' }} />
          <span style={{ background: 'var(--charcoal)' }} />
          <span style={{ background: 'var(--navy-tint)' }} />
          <small>Original in colour</small>
        </div>
        <p>
          This website is a preliminary issue and is still being developed. Content is indicative
          only. Do not scale from screen. Enquiries: <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </div>
    </footer>
  )
}

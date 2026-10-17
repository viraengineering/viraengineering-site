import { site } from '../site'

const today = new Intl.DateTimeFormat('en-AU', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
}).format(new Date())
const year = new Date().getFullYear()

// A drawing title block carries the "work in progress" message: the
// site is issued as a preliminary revision, not for construction.
export function TitleBlock() {
  return (
    <footer className="titleblock" aria-label="Site status">
      <dl>
        <div className="tb-project">
          <dt>Project</dt>
          <dd>{site.domain}</dd>
        </div>
        <div>
          <dt>Drawing no.</dt>
          <dd>{site.drawingNo}</dd>
        </div>
        <div>
          <dt>Rev</dt>
          <dd>{site.revision}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>{today}</dd>
        </div>
        <div className="tb-status">
          <dt>Status</dt>
          <dd>
            <span className="stamp">Preliminary</span>
            Not for construction. Full site coming soon.
          </dd>
        </div>
      </dl>
      <p className="copyright">© {year} Vira Engineering</p>
    </footer>
  )
}

/** Brand loading state: a mini sloshing bottle while the page streams in. */
export function LoadingState() {
  return (
    <div className="state-page" role="status" aria-label="Loading">
      <div>
        <div className="bottle loading-bottle" aria-hidden="true">
          <div className="cap t" />
          <div className="neck t" />
          <div className="glass t">
            <div className="liquid t" />
          </div>
        </div>
        <p className="big">
          pressing<em>…</em>
        </p>
        <p>Fresh juice takes a second. Worth it.</p>
      </div>
    </div>
  );
}

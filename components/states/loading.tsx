import { STATE_BIG, STATE_PAGE } from "@/lib/styles";

/** Brand loading state: a mini sloshing bottle while the page streams in. */
export function LoadingState() {
  return (
    <div className={STATE_PAGE} role="status" aria-label="Loading">
      <div>
        <div className="bottle loading-bottle" aria-hidden="true">
          <div className="cap t" />
          <div className="neck t" />
          <div className="glass t">
            <div className="liquid t" />
          </div>
        </div>
        <p className={STATE_BIG}>
          pressing<em className="text-accent not-italic">…</em>
        </p>
        <p className="mx-auto mt-4.5 mb-7 max-w-[42ch] font-medium">
          Fresh juice takes a second. Worth it.
        </p>
      </div>
    </div>
  );
}

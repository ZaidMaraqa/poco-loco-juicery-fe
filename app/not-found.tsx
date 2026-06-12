import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="state-page">
      <div>
        <p className="big">
          404 — this flavor
          <br />
          <em>doesn&apos;t exist.</em>
        </p>
        <p>
          We pressed every fruit in Amman and still couldn&apos;t find that
          page. The good stuff is back home.
        </p>
        <div className="actions">
          <Button asChild className="btn ink t">
            <Link href="/">Back to the juice</Link>
          </Button>
          <Button asChild className="btn ghost t">
            <Link href="/#menu">See the menu</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { BTN_GHOST, BTN_INK, STATE_ACTIONS, STATE_BIG, STATE_PAGE } from "@/lib/styles";

export default function NotFound() {
  return (
    <div className={STATE_PAGE}>
      <div>
        <p className={STATE_BIG}>
          404 — this flavor
          <br />
          <em className="text-accent not-italic">doesn&apos;t exist.</em>
        </p>
        <p className="mx-auto mt-4.5 mb-7 max-w-[42ch] font-medium">
          We pressed every fruit in Amman and still couldn&apos;t find that
          page. The good stuff is back home.
        </p>
        <div className={STATE_ACTIONS}>
          <Button asChild className={BTN_INK}>
            <Link href="/">Back to the juice</Link>
          </Button>
          <Button asChild className={BTN_GHOST}>
            <Link href="/#menu">See the menu</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { BTN_INK, STATE_ACTIONS, STATE_BIG, STATE_PAGE } from "@/lib/styles";

interface ErrorStateProps {
  reset: () => void;
}

export function ErrorState({ reset }: ErrorStateProps) {
  return (
    <div className={STATE_PAGE}>
      <div>
        <p className={STATE_BIG}>
          we spilled <em className="text-accent not-italic">the juice.</em>
        </p>
        <p className="mx-auto mt-4.5 mb-7 max-w-[42ch] font-medium">
          Something went wrong on our end. Grab a towel — or just try again.
        </p>
        <div className={STATE_ACTIONS}>
          <Button type="button" className={BTN_INK} onClick={reset}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}

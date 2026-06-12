"use client";

import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  reset: () => void;
}

export function ErrorState({ reset }: ErrorStateProps) {
  return (
    <div className="state-page">
      <div>
        <p className="big">
          we spilled <em>the juice.</em>
        </p>
        <p>
          Something went wrong on our end. Grab a towel — or just try again.
        </p>
        <div className="actions">
          <Button type="button" className="btn ink t" onClick={reset}>
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}

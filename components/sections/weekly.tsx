import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { WEEKLY_SECTION } from "@/data/site";
import { BTN_FILL } from "@/lib/styles";

export function WeeklySection() {
  return (
    <section
      id="weekly"
      className="t relative overflow-hidden border-y-4 border-foreground bg-foreground py-[clamp(80px,11vh,140px)] text-card"
    >
      <div className="wrap">
        <Reveal
          as="span"
          className="mb-3 block text-center font-sans text-xs font-bold tracking-[0.2em] text-background uppercase"
        >
          {WEEKLY_SECTION.kicker}
        </Reveal>
        <Reveal as="h2">{WEEKLY_SECTION.title}</Reveal>
        <Reveal
          className="mt-12.5 flex flex-wrap justify-center gap-3.5"
          aria-hidden="true"
        >
          {WEEKLY_SECTION.days.map((day) => (
            <div
              className="w-23 rounded-[18px] border-[3px] border-dashed border-white/35 bg-transparent px-2 pt-4.5 pb-3.5 text-center transition-[transform,border-color,background-color] duration-200 ease-(--pop) hover:-translate-y-1.5 hover:-rotate-2 hover:border-solid hover:border-background"
              key={day}
            >
              <span className="font-sans text-[11px] font-extrabold tracking-[0.14em] uppercase opacity-70">
                {day}
              </span>
              <div className="mx-auto mt-2.5 h-12 w-8.5 rounded-[8px_8px_12px_12px] border-[3px] border-card bg-[linear-gradient(180deg,transparent_18%,var(--accent)_18%)] transition-[background] duration-700" />
            </div>
          ))}
        </Reveal>
        <Reveal
          as="p"
          className="mx-auto mt-10 max-w-[52ch] text-center font-medium text-white/85"
        >
          {WEEKLY_SECTION.pitch}
        </Reveal>
        <Reveal className="mt-7.5 flex justify-center">
          <Button asChild className={BTN_FILL}>
            <Link href={WEEKLY_SECTION.cta.href}>{WEEKLY_SECTION.cta.label}</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

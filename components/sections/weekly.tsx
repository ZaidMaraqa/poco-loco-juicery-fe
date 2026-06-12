import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { WEEKLY_SECTION } from "@/data/site";

export function WeeklySection() {
  return (
    <section id="weekly" className="section-weekly t">
      <div className="wrap">
        <Reveal as="span" className="sec-kicker">
          {WEEKLY_SECTION.kicker}
        </Reveal>
        <Reveal as="h2">{WEEKLY_SECTION.title}</Reveal>
        <Reveal className="week" aria-hidden="true">
          {WEEKLY_SECTION.days.map((day) => (
            <div className="day" key={day}>
              <span className="d">{day}</span>
              <div className="b t" />
            </div>
          ))}
        </Reveal>
        <Reveal as="p" className="pitch">
          {WEEKLY_SECTION.pitch}
        </Reveal>
        <Reveal className="actions">
          <Button asChild className="btn fill t">
            <Link href={WEEKLY_SECTION.cta.href}>
              {WEEKLY_SECTION.cta.label}
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

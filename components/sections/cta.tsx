import Link from "next/link";
import { Fragment } from "react";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { CTA_SECTION } from "@/data/site";

export function CtaSection() {
  return (
    <section id="go" className="section-go">
      <div className="wrap">
        <Reveal as="p" className="big">
          {CTA_SECTION.lines.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              {i === CTA_SECTION.accentLine ? (
                <em className="t">{line}</em>
              ) : (
                line
              )}
            </Fragment>
          ))}
        </Reveal>
        <Reveal className="actions">
          {CTA_SECTION.actions.map((action) => (
            <Button
              key={action.label}
              asChild
              className={`btn ${action.variant === "fill" ? "ink" : "ghost"} t`}
            >
              <Link href={action.href}>{action.label}</Link>
            </Button>
          ))}
        </Reveal>
        <Reveal as="p" className="micro">
          {CTA_SECTION.micro} · <span className="ar">{CTA_SECTION.microArabic}</span>
        </Reveal>
      </div>
    </section>
  );
}

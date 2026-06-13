import Link from "next/link";
import { Fragment } from "react";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { CTA_SECTION } from "@/data/site";
import { BTN_GHOST, BTN_INK } from "@/lib/styles";

export function CtaSection() {
  return (
    <section id="go" className="py-[clamp(90px,12vh,150px)] text-center">
      <div className="wrap">
        <Reveal
          as="p"
          className="font-heading text-[clamp(38px,7.6vw,96px)] leading-[1.04] lowercase"
        >
          {CTA_SECTION.lines.map((line, i) => (
            <Fragment key={line}>
              {i > 0 && <br />}
              {i === CTA_SECTION.accentLine ? (
                <em className="text-accent not-italic transition-colors duration-700">
                  {line}
                </em>
              ) : (
                line
              )}
            </Fragment>
          ))}
        </Reveal>
        <Reveal className="mt-9 flex flex-wrap justify-center gap-4">
          {CTA_SECTION.actions.map((action) => (
            <Button
              key={action.label}
              asChild
              className={action.variant === "fill" ? BTN_INK : BTN_GHOST}
            >
              <Link href={action.href}>{action.label}</Link>
            </Button>
          ))}
        </Reveal>
        <Reveal
          as="p"
          className="mt-6 font-sans text-xs font-bold tracking-[0.16em] uppercase opacity-70"
        >
          {CTA_SECTION.micro} ·{" "}
          <span className="font-arabic text-[15px] leading-none font-bold tracking-normal normal-case">
            {CTA_SECTION.microArabic}
          </span>
        </Reveal>
      </div>
    </section>
  );
}

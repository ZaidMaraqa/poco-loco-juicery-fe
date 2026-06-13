"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

import { DEFAULT_FLAVOR, FLAVORS, type FlavorId } from "@/data/flavors";
import { HERO } from "@/data/site";

const BUBBLES = [
  { x: "20%", s: "8px", t: "4s", d: "0s" },
  { x: "45%", s: "6px", t: "5s", d: "1.4s" },
  { x: "70%", s: "9px", t: "4.5s", d: "2.6s" },
  { x: "58%", s: "5px", t: "5.5s", d: ".8s" },
];

export function Hero() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pourRef = useRef<HTMLDivElement>(null);
  const busyRef = useRef(false);

  useEffect(() => setMounted(true), []);

  const flavorId = (mounted ? theme : DEFAULT_FLAVOR) as FlavorId;
  const flavor = FLAVORS.find((f) => f.id === flavorId) ?? FLAVORS[0];

  function pickFlavor(next: (typeof FLAVORS)[number]) {
    if (busyRef.current || next.id === flavorId) return;
    const pour = pourRef.current;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (calm || !pour) {
      setTheme(next.id);
      return;
    }
    busyRef.current = true;
    // overlay takes the NEW flavor's juice color before sliding down
    pour.style.setProperty("--pour-juice", next.juice);
    pour.classList.add("go");
    // swap colors while the screen is covered
    const swap = setTimeout(() => setTheme(next.id), 420);
    pour.addEventListener(
      "animationend",
      () => {
        pour.classList.remove("go");
        pour.style.removeProperty("--pour-juice");
        busyRef.current = false;
        clearTimeout(swap);
        setTheme(next.id);
      },
      { once: true }
    );
  }

  return (
    <header
      className="relative overflow-hidden pt-[clamp(50px,8vh,100px)] pb-[clamp(60px,9vh,110px)]"
      id="top"
    >
      <div ref={pourRef} className="pour" aria-hidden="true" />
      <div className="wrap grid grid-cols-[1.1fr_0.9fr] items-center gap-[clamp(30px,5vw,70px)] max-[880px]:grid-cols-1">
        <div>
          <span className="t mb-6 inline-flex -rotate-2 items-center gap-2.5 rounded-full border-[3px] border-foreground px-4.5 py-2.25 font-sans text-xs font-bold tracking-[0.2em] uppercase">
            {HERO.kicker} ·{" "}
            <span className="font-arabic text-[15px] leading-none font-bold tracking-normal normal-case">
              {HERO.kickerArabic}
            </span>
          </span>
          <h1>
            drink a
            <br />
            little{" "}
            <span className="t inline-block text-accent animate-[squeeze_3.2s_var(--pop)_infinite]">
              crazy
            </span>
            .
          </h1>
          <p className="mt-5.5 max-w-[44ch] text-[clamp(16px,1.9vw,20px)] font-medium">
            {HERO.lede}
          </p>
          <div className="mt-8">
            <span className="mb-3 block font-sans text-xs font-extrabold uppercase tracking-[0.14em]">
              {HERO.flavorLabel}
            </span>
            <div
              className="flex flex-wrap gap-3"
              role="group"
              aria-label="Choose site flavor"
            >
              {FLAVORS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className="cursor-pointer rounded-full border-[3px] border-foreground bg-transparent px-5.5 py-3.25 font-sans text-sm font-extrabold tracking-[0.02em] text-foreground transition-[transform,background-color,color] duration-200 ease-(--pop) hover:-translate-y-0.75 hover:rotate-[-1.5deg] aria-pressed:rotate-[1.5deg] aria-pressed:bg-foreground aria-pressed:text-card"
                  aria-pressed={flavorId === f.id}
                  onClick={() => pickFlavor(f)}
                >
                  <span
                    className="mr-2 inline-block h-2.75 w-2.75 rounded-full bg-(--dot) align-[-1px]"
                    style={{ "--dot": f.dot } as React.CSSProperties}
                  />
                  {f.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="relative grid place-items-center">
          <div className="bottle" aria-hidden="true">
            <div className="cap t" />
            <div className="neck t" />
            <div className="glass t">
              <div className="liquid t">
                {BUBBLES.map((b, i) => (
                  <span
                    key={i}
                    className="bubble"
                    style={
                      {
                        "--x": b.x,
                        "--s": b.s,
                        "--bt": b.t,
                        "--d": b.d,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            </div>
            <div className="tag-label t" suppressHydrationWarning>
              {flavor.name}
              <small>{HERO.bottleTagline}</small>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

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
    <header className="hero" id="top">
      <div ref={pourRef} className="pour" aria-hidden="true" />
      <div className="wrap">
        <div>
          <span className="kicker t">
            {HERO.kicker} · <span className="ar">{HERO.kickerArabic}</span>
          </span>
          <h1>
            drink a
            <br />
            little <span className="squeeze t">crazy</span>.
          </h1>
          <p className="lede">{HERO.lede}</p>
          <div className="flavors">
            <span className="lab">{HERO.flavorLabel}</span>
            <div className="pills" role="group" aria-label="Choose site flavor">
              {FLAVORS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className="pill t"
                  aria-pressed={flavorId === f.id}
                  onClick={() => pickFlavor(f)}
                >
                  <span
                    className="dot"
                    style={{ "--dot": f.dot } as React.CSSProperties}
                  />
                  {f.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="bottle-zone">
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

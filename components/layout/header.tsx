"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }
    const sections = NAV_LINKS.map((l) =>
      document.getElementById(l.sectionId)
    ).filter((el): el is HTMLElement => el !== null);

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <nav
      className="t sticky top-0 z-90 border-b-4 border-foreground bg-background"
      aria-label="Main"
    >
      <div className="wrap flex min-h-17.5 items-center justify-between gap-3.5">
        <Link
          className="inline-block font-heading text-[26px] text-foreground no-underline transition-transform duration-250 ease-(--pop) hover:scale-[1.06] hover:-rotate-3"
          href="/"
        >
          {SITE.name}
        </Link>
        <div className="flex flex-wrap items-center gap-1 max-[760px]:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border-[3px] border-transparent px-3.5 py-1.75 font-sans text-[13px] font-bold tracking-[0.04em] text-foreground uppercase no-underline transition-[transform,border-color,background-color,color] duration-200 ease-(--pop) hover:rotate-[-1.5deg] hover:border-foreground aria-current:bg-foreground aria-current:text-card"
              aria-current={
                activeSection === link.sectionId ? "true" : undefined
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Button
          asChild
          className="h-auto rounded-full bg-foreground px-6 py-3.25 font-sans text-[13px] font-extrabold tracking-wider text-card uppercase no-underline transition-transform duration-200 ease-(--pop) hover:rotate-2 hover:scale-[1.08] hover:bg-foreground active:scale-[0.94]"
        >
          <Link href="/#order-fresh">Order now</Link>
        </Button>
      </div>
    </nav>
  );
}

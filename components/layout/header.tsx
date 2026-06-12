"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/data/site";

export function Header() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Scroll-spy: highlight the nav link of the section currently in view.
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
    <nav className="site-nav t" aria-label="Main">
      <div className="wrap">
        <Link className="logo t" href="/">
          {SITE.name}
        </Link>
        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              aria-current={
                activeSection === link.sectionId ? "true" : undefined
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Button asChild className="order-btn t">
          <Link href="/#order-fresh">Order now</Link>
        </Button>
      </div>
    </nav>
  );
}

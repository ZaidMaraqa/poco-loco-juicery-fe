import { FOOTER } from "@/data/site";

export function Footer() {
  return (
    <footer className="t border-t-4 border-foreground pt-7.5 pb-10.5">
      <div className="wrap flex flex-wrap items-center justify-between gap-3.5 font-sans text-[13px] font-semibold">
        <span>{FOOTER.blurb}</span>
        <span>
          {FOOTER.links.map((link, i) => (
            <span key={link.label}>
              {i > 0 && " · "}
              <a href={link.href} className="no-underline hover:underline">
                {link.label}
              </a>
            </span>
          ))}
        </span>
      </div>
    </footer>
  );
}

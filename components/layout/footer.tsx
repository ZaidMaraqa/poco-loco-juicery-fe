import { FOOTER } from "@/data/site";

export function Footer() {
  return (
    <footer className="site-footer t">
      <div className="wrap">
        <span>{FOOTER.blurb}</span>
        <span>
          {FOOTER.links.map((link, i) => (
            <span key={link.label}>
              {i > 0 && " · "}
              <a href={link.href}>{link.label}</a>
            </span>
          ))}
        </span>
      </div>
    </footer>
  );
}

import { MARQUEE } from "@/data/site";

export function Marquee() {
  // items are doubled so the track can loop seamlessly
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="marquee t" aria-hidden="true">
      <div className="track">
        {items.map((item, i) => (
          <span key={i} className={item.arabic ? "ar" : undefined}>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}

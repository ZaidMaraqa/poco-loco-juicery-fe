import { MARQUEE } from "@/data/site";

const STAR =
  "after:ml-11 after:text-accent after:transition-colors after:duration-700 after:content-['✺']";

export function Marquee() {
  // items are doubled so the track can loop seamlessly
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div
      className="t group overflow-hidden bg-foreground py-3.75 text-card rotate-[1.4deg] scale-[1.03]"
      aria-hidden="true"
    >
      <div className="flex w-max animate-[scroll_24s_linear_infinite] gap-11 font-heading text-[19px] leading-[1.4] whitespace-nowrap lowercase group-hover:paused">
        {items.map((item, i) => (
          <span
            key={i}
            className={
              item.arabic
                ? `font-arabic text-[23px] leading-[1.2] font-bold ${STAR}`
                : STAR
            }
          >
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}

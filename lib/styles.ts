/**
 * Shared Tailwind class strings for the chunky brand buttons (the old
 * `.btn` / `.btn.fill` / `.btn.ghost` / `.btn.ink` rules), used across the
 * CTA, weekly, error and not-found surfaces.
 */
export const BTN_BASE =
  "h-auto rounded-full px-8.5 py-4.5 font-sans text-sm font-extrabold tracking-wider uppercase no-underline transition-[transform,background-color,color] duration-200 ease-(--pop)";

export const BTN_INK = `${BTN_BASE} bg-foreground text-card hover:scale-[1.07] hover:-rotate-2 hover:bg-foreground`;

export const BTN_GHOST = `${BTN_BASE} border-[3px] border-foreground bg-transparent text-foreground hover:scale-[1.07] hover:rotate-2 hover:bg-foreground hover:text-card`;

export const BTN_FILL = `${BTN_BASE} bg-background text-foreground hover:scale-[1.07] hover:-rotate-2 hover:bg-background`;

/** Shared styles for the loading / 404 / error pages (was `.state-page`). */
export const STATE_PAGE =
  "grid min-h-[70vh] place-items-center px-5 py-[clamp(60px,10vh,120px)] text-center";
export const STATE_BIG =
  "font-heading text-[clamp(48px,9vw,120px)] leading-none lowercase";
export const STATE_ACTIONS = "flex flex-wrap justify-center gap-3.5";

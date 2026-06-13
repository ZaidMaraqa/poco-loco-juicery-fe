import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { MENU } from "@/data/menu";
import { MENU_SECTION } from "@/data/site";
import { formatJd } from "@/lib/order";

export function MenuSection() {
  return (
    <section id="menu" className="py-[clamp(80px,11vh,140px)]">
      <div className="wrap">
        <Reveal
          as="span"
          className="mb-3 block text-center font-sans text-xs font-bold tracking-[0.2em] uppercase"
        >
          {MENU_SECTION.kicker}
        </Reveal>
        <Reveal as="h2">{MENU_SECTION.title}</Reveal>
        <Reveal as="p" className="mx-auto max-w-[48ch] text-center font-medium">
          {MENU_SECTION.lede}
        </Reveal>
        <div className="mt-15 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6.5">
          {MENU.map((juice, i) => {
            // even cards (1-based) tilt the other way on hover
            const even = i % 2 === 1;
            return (
              <Reveal key={juice.id}>
                <Link
                  className={`group relative block rounded-[22px] border-4 border-foreground bg-card px-6 py-7 text-foreground no-underline shadow-[8px_8px_0_var(--foreground)] transition-[transform,box-shadow] duration-220 ease-(--pop) hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[14px_14px_0_var(--foreground)] ${
                    even ? "hover:rotate-1" : "hover:-rotate-1"
                  }`}
                  href="/#order-fresh"
                >
                  <div className="relative mb-3.5 grid h-53.75 place-items-center">
                    <div
                      className="absolute h-30 w-30 rounded-[50%_46%_54%_50%/52%_50%_50%_48%] animate-[blobby_5s_ease-in-out_infinite]"
                      style={{ background: juice.splat }}
                      aria-hidden="true"
                    />
                    <Image
                      className={`relative h-50 w-auto drop-shadow-[0_16px_14px_rgba(0,0,0,0.28)] transition-transform duration-300 ease-(--pop) group-hover:-translate-y-2 group-hover:scale-[1.04] ${
                        even ? "group-hover:rotate-3" : "group-hover:-rotate-3"
                      }`}
                      src={juice.image.src}
                      width={juice.image.width}
                      height={juice.image.height}
                      alt={juice.image.alt}
                      sizes="200px"
                    />
                  </div>
                  <h3 className="font-heading text-2xl leading-[1.1] lowercase">
                    {juice.name}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium opacity-75">
                    {juice.ingredients}
                  </p>
                  <div className="mt-4.5 flex items-center justify-between">
                    <span className="font-heading text-[20px]">
                      {formatJd(juice.prices["500"])}
                    </span>
                    <span className="rounded-full border-[3px] border-foreground px-3.5 py-2 font-sans text-[11px] font-extrabold tracking-widest uppercase transition-[background-color,color,transform] duration-200 ease-(--pop) group-hover:-rotate-2 group-hover:bg-foreground group-hover:text-card">
                      Add
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { MENU } from "@/data/menu";
import { MENU_SECTION } from "@/data/site";
import { formatJd } from "@/lib/order";

export function MenuSection() {
  return (
    <section id="menu" className="section-menu">
      <div className="wrap">
        <Reveal as="span" className="sec-kicker">
          {MENU_SECTION.kicker}
        </Reveal>
        <Reveal as="h2">{MENU_SECTION.title}</Reveal>
        <Reveal as="p" className="lede-c">
          {MENU_SECTION.lede}
        </Reveal>
        <div className="juice-grid">
          {MENU.map((juice) => (
            <Reveal key={juice.id}>
              <Link className="jcard t" href="/#order-fresh">
                <div className="stage">
                  <div
                    className="splat"
                    style={{ background: juice.splat }}
                    aria-hidden="true"
                  />
                  <Image
                    className="bimg"
                    src={juice.image.src}
                    width={juice.image.width}
                    height={juice.image.height}
                    alt={juice.image.alt}
                    sizes="200px"
                  />
                </div>
                <h3>{juice.name}</h3>
                <p className="ings">{juice.ingredients}</p>
                <div className="row">
                  <span className="price">{formatJd(juice.prices["500"])}</span>
                  <span className="add t">Add</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

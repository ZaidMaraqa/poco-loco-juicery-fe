"use client";

import Image from "next/image";
import { useState } from "react";

import { Reveal } from "@/components/reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MENU, type BottleSize, type JuiceId } from "@/data/menu";
import { ORDER_SECTION } from "@/data/site";
import {
  INITIAL_ORDER,
  bottlesAndSubtotal,
  formatJd,
  orderTotal,
  packPrice,
  whatsappOrderUrl,
  type OrderDetails,
  type OrderState,
} from "@/lib/order";

const SIZES: BottleSize[] = ["330", "500"];

const FIELD_CLASS =
  "h-auto w-full rounded-[12px] border-[3px] border-transparent bg-black/5 px-3.5 py-3.25 font-sans text-[15px] font-semibold text-foreground transition-colors focus-visible:border-foreground focus-visible:bg-card focus-visible:ring-0 md:text-[15px]";

const OCARD =
  "t rounded-[24px] border-4 border-foreground bg-card p-[clamp(22px,3vw,32px)] text-foreground shadow-[10px_10px_0_var(--foreground)]";

// segmented toggle (was .seg / .seg button)
const SEG = "grid grid-cols-2 gap-2 rounded-full bg-black/6 p-1.5";
const SEG_BTN =
  "cursor-pointer rounded-full border-0 bg-transparent px-2.5 py-3.25 font-sans text-[13px] font-extrabold tracking-[0.02em] text-foreground transition-[background-color,color,transform] duration-250 ease-(--pop) hover:scale-[1.02] aria-pressed:bg-foreground aria-pressed:text-card";
// order rows (was .orow and friends)
const OROW =
  "flex items-center justify-between gap-3.5 border-b-[3px] border-dashed border-black/18 py-3.25";
const NM = "flex items-center gap-3 font-bold";
const NM_SMALL = "block text-xs font-semibold opacity-60";
const RIGHT = "flex items-center gap-3.5";
const PR = "font-heading text-base whitespace-nowrap";
const STEP = "flex items-center gap-2.5";
const STEP_BTN =
  "h-8.5 w-8.5 cursor-pointer rounded-full border-[3px] border-foreground bg-transparent font-sans text-base font-extrabold leading-none text-foreground transition-[background-color,color,transform] duration-150 ease-(--pop) hover:scale-[1.1] hover:bg-foreground hover:text-card active:scale-90";
const Q = "min-w-5 text-center font-sans text-base font-extrabold";
// detail-form bits (was .f-lab / .sumline)
const F_LAB =
  "mt-3.5 mb-1.5 block font-sans text-[11px] font-extrabold tracking-[0.16em] uppercase";
const SUMLINE = "flex justify-between gap-2.5 py-2.25 text-[14.5px] font-semibold";

const EMPTY_DETAILS: OrderDetails = {
  name: "",
  phone: "",
  address: "",
  notes: "",
};

export function OrderSection() {
  const [order, setOrder] = useState<OrderState>(INITIAL_ORDER);
  const [details, setDetails] = useState<OrderDetails>(EMPTY_DETAILS);

  const [bottles, subtotal] = bottlesAndSubtotal(order);
  const total = orderTotal(subtotal, order.freq);

  const setQty = (id: JuiceId, delta: number) =>
    setOrder((o) => ({
      ...o,
      qty: { ...o.qty, [id]: Math.max(0, o.qty[id] + delta) },
    }));

  const setDetail = (key: keyof OrderDetails, value: string) =>
    setDetails((d) => ({ ...d, [key]: value }));

  function placeOrder() {
    if (bottles === 0) {
      alert("Add at least one bottle first — go a little loco.");
      return;
    }
    window.open(whatsappOrderUrl(order, details), "_blank");
  }

  return (
    <section id="order-fresh" className="py-[clamp(80px,11vh,140px)]">
      <div className="wrap">
        <Reveal
          as="span"
          className="mb-3 block text-center font-sans text-xs font-bold tracking-[0.2em] uppercase"
        >
          {ORDER_SECTION.kicker}
        </Reveal>
        <Reveal as="h2">
          {ORDER_SECTION.title[0]}
          <br />
          {ORDER_SECTION.title[1]}
        </Reveal>
        <Reveal as="p" className="mx-auto max-w-[48ch] text-center font-medium">
          {ORDER_SECTION.lede}
        </Reveal>
        <div className="mt-13.5 grid grid-cols-[1.15fr_0.85fr] items-start gap-7 max-[920px]:grid-cols-1">
          {/* builder */}
          <Reveal className={OCARD}>
            <div className={SEG} role="group" aria-label="Order type">
              <button
                type="button"
                className={SEG_BTN}
                aria-pressed={order.mode === "mix"}
                onClick={() => setOrder((o) => ({ ...o, mode: "mix" }))}
              >
                Build a Mix Pack
              </button>
              <button
                type="button"
                className={SEG_BTN}
                aria-pressed={order.mode === "sampler"}
                onClick={() => setOrder((o) => ({ ...o, mode: "sampler" }))}
              >
                Sampler Pack — All 6
              </button>
            </div>
            <div className="mt-5 flex items-center gap-3 font-sans text-xs font-extrabold tracking-[0.12em] uppercase">
              <span>Bottle size:</span>
              {SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  className="cursor-pointer rounded-full border-[3px] border-foreground bg-transparent px-4.5 py-2.25 font-sans text-[13px] font-extrabold tracking-[0.02em] normal-case text-foreground transition-[background-color,color,transform] duration-200 ease-(--pop) aria-pressed:-rotate-2 aria-pressed:bg-foreground aria-pressed:text-card"
                  aria-pressed={order.size === size}
                  onClick={() => setOrder((o) => ({ ...o, size }))}
                >
                  {size}ml
                </button>
              ))}
            </div>
            <div className="mt-5.5 border-t-[3px] border-dashed border-black/18">
              {MENU.map((juice) => (
                <div className={OROW} key={juice.id}>
                  <span className={NM}>
                    <Image
                      className="h-11.5 w-auto drop-shadow-[0_4px_4px_rgba(0,0,0,0.22)]"
                      src={juice.image.src}
                      width={juice.image.width}
                      height={juice.image.height}
                      alt=""
                      sizes="46px"
                    />
                    <span>
                      {juice.name}
                      <small className={NM_SMALL}>
                        {order.mode === "sampler"
                          ? `1 per pack · ${order.size}ml`
                          : `${order.size}ml`}
                      </small>
                    </span>
                  </span>
                  {order.mode === "mix" ? (
                    <span className={RIGHT}>
                      <span className={PR}>
                        {formatJd(juice.prices[order.size])}
                      </span>
                      <span className={STEP}>
                        <button
                          type="button"
                          className={STEP_BTN}
                          aria-label={`Remove one ${juice.name}`}
                          onClick={() => setQty(juice.id, -1)}
                        >
                          −
                        </button>
                        <span className={Q}>{order.qty[juice.id]}</span>
                        <button
                          type="button"
                          className={STEP_BTN}
                          aria-label={`Add one ${juice.name}`}
                          onClick={() => setQty(juice.id, 1)}
                        >
                          +
                        </button>
                      </span>
                    </span>
                  ) : (
                    <span className={PR}>
                      {formatJd(juice.prices[order.size])}
                    </span>
                  )}
                </div>
              ))}
              {order.mode === "sampler" && (
                <div className={OROW}>
                  <span className={NM}>
                    <span>
                      Number of packs
                      <small className={NM_SMALL}>
                        6 bottles — one of each flavor
                      </small>
                    </span>
                  </span>
                  <span className={RIGHT}>
                    <span className={PR}>
                      {formatJd(packPrice(order.size))} / pack
                    </span>
                    <span className={STEP}>
                      <button
                        type="button"
                        className={STEP_BTN}
                        aria-label="One fewer pack"
                        onClick={() =>
                          setOrder((o) => ({
                            ...o,
                            packs: Math.max(1, o.packs - 1),
                          }))
                        }
                      >
                        −
                      </button>
                      <span className={Q}>{order.packs}</span>
                      <button
                        type="button"
                        className={STEP_BTN}
                        aria-label="One more pack"
                        onClick={() =>
                          setOrder((o) => ({ ...o, packs: o.packs + 1 }))
                        }
                      >
                        +
                      </button>
                    </span>
                  </span>
                </div>
              )}
            </div>
            <div className="t mt-5.5 flex items-center justify-between gap-3 rounded-[16px] bg-foreground px-5.5 py-4.5 font-extrabold text-card">
              <span>
                {bottles} {bottles === 1 ? "bottle" : "bottles"} total
              </span>
              <span className="font-heading text-[22px]">{formatJd(total)}</span>
            </div>
          </Reveal>

          {/* details */}
          <Reveal className={OCARD}>
            <h3 className="mb-4.5 font-heading text-2xl lowercase">
              your details
            </h3>
            <label className={F_LAB} htmlFor="fName">
              Name
            </label>
            <Input
              className={FIELD_CLASS}
              id="fName"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={details.name}
              onChange={(e) => setDetail("name", e.target.value)}
            />
            <label className={F_LAB} htmlFor="fPhone">
              Phone
            </label>
            <Input
              className={FIELD_CLASS}
              id="fPhone"
              type="tel"
              autoComplete="tel"
              placeholder="07X XXX XXXX"
              value={details.phone}
              onChange={(e) => setDetail("phone", e.target.value)}
            />
            <label className={F_LAB} htmlFor="fAddr">
              Delivery address
            </label>
            <Input
              className={FIELD_CLASS}
              id="fAddr"
              type="text"
              autoComplete="street-address"
              placeholder="Area, street, building"
              value={details.address}
              onChange={(e) => setDetail("address", e.target.value)}
            />
            <label className={F_LAB} htmlFor="fNotes">
              Notes (optional)
            </label>
            <Textarea
              className={`${FIELD_CLASS} min-h-18.5 resize-y field-sizing-fixed`}
              id="fNotes"
              placeholder="Doorbell broken, call on arrival…"
              value={details.notes}
              onChange={(e) => setDetail("notes", e.target.value)}
            />

            <div className="mt-5">
              <div className={SUMLINE}>
                <span>Subtotal</span>
                <b>{formatJd(subtotal)}</b>
              </div>
              <div className={SUMLINE}>
                <span>Delivery</span>
                <b>Calculated on WhatsApp</b>
              </div>
              <span className={F_LAB}>Delivery frequency</span>
              <div className={SEG} role="group" aria-label="Delivery frequency">
                <button
                  type="button"
                  className={SEG_BTN}
                  aria-pressed={order.freq === "once"}
                  onClick={() => setOrder((o) => ({ ...o, freq: "once" }))}
                >
                  One-time Order
                </button>
                <button
                  type="button"
                  className={SEG_BTN}
                  aria-pressed={order.freq === "weekly"}
                  onClick={() => setOrder((o) => ({ ...o, freq: "weekly" }))}
                >
                  Weekly Delivery
                </button>
              </div>
              <p className="mt-2 text-center font-sans text-[11px] font-bold tracking-[0.08em] uppercase opacity-65">
                {ORDER_SECTION.weeklySaveNote}
              </p>
              <div className="mt-2 flex justify-between gap-2.5 border-t-[3px] border-dashed border-black/18 pt-3.5 pb-2.25 text-base font-extrabold">
                <span>Total</span>
                <b>
                  {formatJd(total)}
                  {order.freq === "weekly" && " / week"}
                </b>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2.5 rounded-[14px] bg-black/6 px-3.75 py-3.25 text-[13.5px] font-semibold">
              <span
                className="h-5 w-5 flex-none rounded-full border-[2.5px] border-foreground text-center font-sans text-xs font-extrabold leading-4"
                aria-hidden="true"
              >
                i
              </span>
              <span>{ORDER_SECTION.deliveryNote}</span>
            </div>
            <button
              className="mt-4.5 block h-auto w-full cursor-pointer rounded-full border-0 bg-foreground px-5 py-4.75 text-center font-sans text-[15px] font-extrabold tracking-[0.04em] text-card uppercase no-underline transition-[transform,opacity] duration-200 ease-(--pop) hover:scale-[1.03] hover:-rotate-1 active:scale-[0.96]"
              type="button"
              onClick={placeOrder}
            >
              Place Order via WhatsApp
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

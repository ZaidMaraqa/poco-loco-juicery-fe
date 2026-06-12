"use client";

import Image from "next/image";
import { useState } from "react";

import { Reveal } from "@/components/reveal";
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
    <section id="order-fresh" className="section-order">
      <div className="wrap">
        <Reveal as="span" className="sec-kicker">
          {ORDER_SECTION.kicker}
        </Reveal>
        <Reveal as="h2">
          {ORDER_SECTION.title[0]}
          <br />
          {ORDER_SECTION.title[1]}
        </Reveal>
        <Reveal as="p" className="lede-c">
          {ORDER_SECTION.lede}
        </Reveal>
        <div className="order-grid">
          {/* builder */}
          <Reveal className="ocard t">
            <div className="seg" role="group" aria-label="Order type">
              <button
                type="button"
                aria-pressed={order.mode === "mix"}
                onClick={() => setOrder((o) => ({ ...o, mode: "mix" }))}
              >
                Build a Mix Pack
              </button>
              <button
                type="button"
                aria-pressed={order.mode === "sampler"}
                onClick={() => setOrder((o) => ({ ...o, mode: "sampler" }))}
              >
                Sampler Pack — All 6
              </button>
            </div>
            <div className="size-row">
              <span>Bottle size:</span>
              {SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  className="chip t"
                  aria-pressed={order.size === size}
                  onClick={() => setOrder((o) => ({ ...o, size }))}
                >
                  {size}ml
                </button>
              ))}
            </div>
            <div className="olist">
              {MENU.map((juice) => (
                <div className="orow" key={juice.id}>
                  <span className="nm">
                    <Image
                      className="thumb"
                      src={juice.image.src}
                      width={juice.image.width}
                      height={juice.image.height}
                      alt=""
                      sizes="46px"
                    />
                    <span>
                      {juice.name}
                      <small>
                        {order.mode === "sampler"
                          ? `1 per pack · ${order.size}ml`
                          : `${order.size}ml`}
                      </small>
                    </span>
                  </span>
                  {order.mode === "mix" ? (
                    <span className="right">
                      <span className="pr">
                        {formatJd(juice.prices[order.size])}
                      </span>
                      <span className="step">
                        <button
                          type="button"
                          aria-label={`Remove one ${juice.name}`}
                          onClick={() => setQty(juice.id, -1)}
                        >
                          −
                        </button>
                        <span className="q">{order.qty[juice.id]}</span>
                        <button
                          type="button"
                          aria-label={`Add one ${juice.name}`}
                          onClick={() => setQty(juice.id, 1)}
                        >
                          +
                        </button>
                      </span>
                    </span>
                  ) : (
                    <span className="pr">
                      {formatJd(juice.prices[order.size])}
                    </span>
                  )}
                </div>
              ))}
              {order.mode === "sampler" && (
                <div className="orow">
                  <span className="nm">
                    <span>
                      Number of packs
                      <small>6 bottles — one of each flavor</small>
                    </span>
                  </span>
                  <span className="right">
                    <span className="pr">
                      {formatJd(packPrice(order.size))} / pack
                    </span>
                    <span className="step">
                      <button
                        type="button"
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
                      <span className="q">{order.packs}</span>
                      <button
                        type="button"
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
            <div className="total-bar t">
              <span>
                {bottles} {bottles === 1 ? "bottle" : "bottles"} total
              </span>
              <span className="amt">{formatJd(total)}</span>
            </div>
          </Reveal>

          {/* details */}
          <Reveal className="ocard t">
            <h3 className="dh">your details</h3>
            <label className="f-lab" htmlFor="fName">
              Name
            </label>
            <input
              className="f-in t"
              id="fName"
              type="text"
              autoComplete="name"
              placeholder="Your name"
              value={details.name}
              onChange={(e) => setDetail("name", e.target.value)}
            />
            <label className="f-lab" htmlFor="fPhone">
              Phone
            </label>
            <input
              className="f-in t"
              id="fPhone"
              type="tel"
              autoComplete="tel"
              placeholder="07X XXX XXXX"
              value={details.phone}
              onChange={(e) => setDetail("phone", e.target.value)}
            />
            <label className="f-lab" htmlFor="fAddr">
              Delivery address
            </label>
            <input
              className="f-in t"
              id="fAddr"
              type="text"
              autoComplete="street-address"
              placeholder="Area, street, building"
              value={details.address}
              onChange={(e) => setDetail("address", e.target.value)}
            />
            <label className="f-lab" htmlFor="fNotes">
              Notes (optional)
            </label>
            <textarea
              className="f-in t"
              id="fNotes"
              placeholder="Doorbell broken, call on arrival…"
              value={details.notes}
              onChange={(e) => setDetail("notes", e.target.value)}
            />

            <div className="sumwrap">
              <div className="sumline">
                <span>Subtotal</span>
                <b>{formatJd(subtotal)}</b>
              </div>
              <div className="sumline">
                <span>Delivery</span>
                <b>Calculated on WhatsApp</b>
              </div>
              <span className="f-lab">Delivery frequency</span>
              <div className="seg" role="group" aria-label="Delivery frequency">
                <button
                  type="button"
                  aria-pressed={order.freq === "once"}
                  onClick={() => setOrder((o) => ({ ...o, freq: "once" }))}
                >
                  One-time Order
                </button>
                <button
                  type="button"
                  aria-pressed={order.freq === "weekly"}
                  onClick={() => setOrder((o) => ({ ...o, freq: "weekly" }))}
                >
                  Weekly Delivery
                </button>
              </div>
              <p className="save-note">{ORDER_SECTION.weeklySaveNote}</p>
              <div className="sumline bold">
                <span>Total</span>
                <b>
                  {formatJd(total)}
                  {order.freq === "weekly" && " / week"}
                </b>
              </div>
            </div>

            <div className="info-note">
              <span className="i" aria-hidden="true">
                i
              </span>
              <span>{ORDER_SECTION.deliveryNote}</span>
            </div>
            <button className="wa-btn t" type="button" onClick={placeOrder}>
              Place Order via WhatsApp
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

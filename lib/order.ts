import { MENU, ORDER_NAMES, type BottleSize, type JuiceId } from "@/data/menu";
import { SITE } from "@/data/site";

export type OrderMode = "mix" | "sampler";
export type OrderFrequency = "once" | "weekly";

export interface OrderState {
  mode: OrderMode;
  size: BottleSize;
  /** Bottle quantities per juice, used in mix mode */
  qty: Record<JuiceId, number>;
  /** Number of sampler packs, used in sampler mode */
  packs: number;
  freq: OrderFrequency;
}

export interface OrderDetails {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

export const WEEKLY_DISCOUNT = 0.9;

export const EMPTY_QTY = Object.fromEntries(
  MENU.map((m) => [m.id, 0])
) as Record<JuiceId, number>;

export const INITIAL_ORDER: OrderState = {
  mode: "mix",
  size: "500",
  qty: EMPTY_QTY,
  packs: 1,
  freq: "once",
};

export const formatJd = (n: number) => `${n.toFixed(2)} JD`;

/** Price of one sampler pack (one of each flavor) at the given size */
export const packPrice = (size: BottleSize) =>
  MENU.reduce((sum, m) => sum + m.prices[size], 0);

export function bottlesAndSubtotal(order: OrderState): [number, number] {
  if (order.mode === "sampler") {
    return [6 * order.packs, packPrice(order.size) * order.packs];
  }
  const bottles = MENU.reduce((sum, m) => sum + order.qty[m.id], 0);
  const subtotal = MENU.reduce(
    (sum, m) => sum + order.qty[m.id] * m.prices[order.size],
    0
  );
  return [bottles, subtotal];
}

export const orderTotal = (subtotal: number, freq: OrderFrequency) =>
  freq === "weekly" ? subtotal * WEEKLY_DISCOUNT : subtotal;

export function whatsappOrderUrl(order: OrderState, details: OrderDetails) {
  const [bottles, subtotal] = bottlesAndSubtotal(order);
  const total = orderTotal(subtotal, order.freq);
  const items =
    order.mode === "sampler"
      ? `Sampler Pack (${order.size}ml) x ${order.packs} — one of each flavor`
      : MENU.filter((m) => order.qty[m.id] > 0)
          .map((m) => `${ORDER_NAMES[m.id]} (${order.size}ml) x ${order.qty[m.id]}`)
          .join("\n");

  const msg = [
    "New order — poco loco.",
    "",
    items,
    "",
    `Bottles: ${bottles}`,
    `Frequency: ${order.freq === "weekly" ? "Weekly (10% off)" : "One-time"}`,
    `Total: ${formatJd(total)}`,
    "",
    `Name: ${details.name || "-"}`,
    `Phone: ${details.phone || "-"}`,
    `Address: ${details.address || "-"}`,
    `Notes: ${details.notes || "-"}`,
  ].join("\n");

  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

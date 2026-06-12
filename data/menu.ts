export type JuiceId = "pure" | "grape" | "golden" | "kiwi" | "sun" | "pom";

export type BottleSize = "330" | "500";

export interface Juice {
  id: JuiceId;
  name: string;
  /** Ingredient / benefit line shown under the name */
  ingredients: string;
  /** Price per bottle in JD, keyed by size */
  prices: Record<BottleSize, number>;
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
  };
  /** Blob color behind the bottle on the menu card */
  splat: string;
}

export const MENU: Juice[] = [
  {
    id: "pure",
    name: "pure orange",
    ingredients: "100% orange · naturally rich in vitamin C",
    prices: { "330": 2.75, "500": 3.5 },
    image: {
      src: "/assets/bottles/bottle-orange.png",
      width: 415,
      height: 900,
      alt: "Pure Orange bottle",
    },
    splat: "#FF8C1A",
  },
  {
    id: "grape",
    name: "grapefruit",
    ingredients: "100% grapefruit · immunity & hydration",
    prices: { "330": 2.75, "500": 3.5 },
    image: {
      src: "/assets/bottles/bottle-grapefruit.png",
      width: 405,
      height: 900,
      alt: "Grapefruit bottle",
    },
    splat: "#F2545B",
  },
  {
    id: "golden",
    name: "golden glow",
    ingredients: "orange & carrot · vision & skin health",
    prices: { "330": 2.75, "500": 3.5 },
    image: {
      src: "/assets/bottles/bottle-golden-glow.png",
      width: 359,
      height: 695,
      alt: "Golden Glow bottle",
    },
    splat: "#F7B32B",
  },
  {
    id: "kiwi",
    name: "kiwi berry",
    ingredients: "kiwi & strawberry · antioxidants, boosts energy",
    prices: { "330": 2.85, "500": 3.6 },
    image: {
      src: "/assets/bottles/bottle-kiwi-berry.png",
      width: 348,
      height: 716,
      alt: "Kiwi Berry bottle",
    },
    splat: "#7CB342",
  },
  {
    id: "sun",
    name: "sunberry",
    ingredients: "orange & strawberry · vitamin C energy boost",
    prices: { "330": 2.75, "500": 3.5 },
    image: {
      src: "/assets/bottles/bottle-sunberry.png",
      width: 369,
      height: 675,
      alt: "Sunberry bottle",
    },
    splat: "#E0354B",
  },
  {
    id: "pom",
    name: "pomegranate",
    ingredients: "100% pomegranate · supports heart health",
    prices: { "330": 8.0, "500": 10.0 },
    image: {
      src: "/assets/bottles/bottle-pomegranate.png",
      width: 354,
      height: 705,
      alt: "Pomegranate bottle",
    },
    splat: "#8E1538",
  },
];

/** Display name used in the WhatsApp order summary (title case) */
export const ORDER_NAMES: Record<JuiceId, string> = {
  pure: "Pure Orange",
  grape: "Grapefruit",
  golden: "Golden Glow",
  kiwi: "Kiwi Berry",
  sun: "Sunberry",
  pom: "Pomegranate",
};

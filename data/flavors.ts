export type FlavorId = "classic" | "mango" | "beet" | "greens";

export interface Flavor {
  id: FlavorId;
  /** Label shown on the pill and the bottle tag */
  name: string;
  /** Swatch color shown inside the pill dot */
  dot: string;
  /** The --juice color, used to paint the pour overlay before the theme swaps */
  juice: string;
}

export const FLAVORS: Flavor[] = [
  { id: "classic", name: "the original", dot: "#2C492E", juice: "#2C492E" },
  { id: "mango", name: "mango sunrise", dot: "#FF5C1F", juice: "#FF5C1F" },
  { id: "beet", name: "beet loco", dot: "#92104F", juice: "#92104F" },
  { id: "greens", name: "mean greens", dot: "#2E7D32", juice: "#2E7D32" },
];

export const DEFAULT_FLAVOR: FlavorId = "classic";

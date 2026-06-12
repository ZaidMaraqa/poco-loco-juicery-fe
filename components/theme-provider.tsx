"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import { DEFAULT_FLAVOR, FLAVORS } from "@/data/flavors";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="data-flavor"
      defaultTheme={DEFAULT_FLAVOR}
      themes={FLAVORS.map((f) => f.id)}
      enableSystem={false}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

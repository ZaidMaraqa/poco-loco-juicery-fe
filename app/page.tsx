import { BaseLayout } from "@/components/layout";
import {
  CtaSection,
  Hero,
  Marquee,
  MenuSection,
  OrderSection,
  WeeklySection,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <MenuSection />
      <OrderSection />
      <WeeklySection />
      <CtaSection />
    </>
  );
}

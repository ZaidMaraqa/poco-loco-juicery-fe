import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { cn } from "@/lib/utils";

export function BaseLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className={cn("flex flex-1 flex-col", className)}>
        {children}
      </div>
      <Footer />
    </div>
  );
}

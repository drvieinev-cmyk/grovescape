/**
 * iOS 26 Native UIToolbar Component
 * Features: Liquid glass blur effect, backdrop filter, native iOS styling
 */

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface UIToolbarProps {
  children: ReactNode;
  className?: string;
  position?: "top" | "bottom";
  transparent?: boolean;
}

export function UIToolbar({
  children,
  className,
  position = "top",
  transparent = false,
}: UIToolbarProps) {
  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-300",
        position === "top" ? "top-0" : "bottom-0",
        transparent
          ? "bg-transparent"
          : "bg-card/80 backdrop-blur-2xl border-border/50",
        position === "top" ? "border-b" : "border-t",
        "shadow-sm",
        className
      )}
      style={{
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      }}
    >
      <div className="container mx-auto">{children}</div>
    </div>
  );
}

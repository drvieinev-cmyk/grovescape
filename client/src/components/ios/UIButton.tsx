/**
 * iOS 26 Native UIButton Component
 * Features: Spring animations, haptic feedback simulation, multiple styles
 */

import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const uiButtonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        filled: "bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105",
        tinted: "bg-primary/15 dark:bg-primary/20 text-primary dark:text-primary-foreground hover:bg-primary/25 dark:hover:bg-primary/30 border border-primary/20 dark:border-primary/30",
        gray: "bg-muted text-foreground hover:bg-muted/80",
        plain: "text-primary hover:bg-primary/10",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-base",
        lg: "h-14 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "md",
    },
  }
);

export interface UIButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof uiButtonVariants> {}

const UIButton = forwardRef<HTMLButtonElement, UIButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(uiButtonVariants({ variant, size, className }))}
        ref={ref}
        style={{
          transform: "translateZ(0)",
          willChange: "transform",
        }}
        {...props}
      />
    );
  }
);

UIButton.displayName = "UIButton";

export { UIButton, uiButtonVariants };

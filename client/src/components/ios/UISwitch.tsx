/**
 * iOS 26 Native UISwitch Component
 * Features: Native animations, smooth transitions, haptic feedback simulation
 */

import { useState } from "react";
import { cn } from "@/lib/utils";

interface UISwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export function UISwitch({
  checked: controlledChecked,
  onChange,
  disabled = false,
  className,
}: UISwitchProps) {
  const [internalChecked, setInternalChecked] = useState(false);
  const checked = controlledChecked ?? internalChecked;

  const handleToggle = () => {
    if (disabled) return;
    const newValue = !checked;
    setInternalChecked(newValue);
    onChange?.(newValue);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={handleToggle}
      className={cn(
        "relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-200",
        checked ? "bg-primary" : "bg-muted",
        disabled && "opacity-50 cursor-not-allowed",
        "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        className
      )}
    >
      <span
        className={cn(
          "inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-200",
          checked ? "translate-x-7" : "translate-x-1"
        )}
      />
    </button>
  );
}

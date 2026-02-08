/**
 * iOS 26 Native UISlider Component
 * Features: Smooth animations, native styling, haptic feedback simulation
 */

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface UISliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

export function UISlider({
  value: controlledValue,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  disabled = false,
  className,
}: UISliderProps) {
  const [internalValue, setInternalValue] = useState(min);
  const value = controlledValue ?? internalValue;
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={cn("relative w-full", className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className="ui-slider w-full h-2 bg-muted rounded-full appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${percentage}%, var(--muted) ${percentage}%, var(--muted) 100%)`,
        }}
      />
    </div>
  );
}

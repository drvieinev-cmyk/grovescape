/**
 * iOS 26 Native UISegmentedControl Component
 * Features: Smooth animations, SF Symbol support, native styling
 */

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Segment {
  id: string;
  label: string;
  icon?: string;
}

interface UISegmentedControlProps {
  segments: Segment[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function UISegmentedControl({
  segments,
  defaultValue,
  onChange,
  className,
}: UISegmentedControlProps) {
  const [selected, setSelected] = useState(defaultValue || segments[0]?.id);

  const handleSelect = (id: string) => {
    setSelected(id);
    onChange?.(id);
  };

  const selectedIndex = segments.findIndex((s) => s.id === selected);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 p-1 rounded-xl bg-muted/50 backdrop-blur-md",
        className
      )}
    >
      {segments.map((segment, index) => (
        <button
          key={segment.id}
          onClick={() => handleSelect(segment.id)}
          className={cn(
            "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
            selected === segment.id
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {selected === segment.id && (
            <div
              className="absolute inset-0 bg-card rounded-lg shadow-sm transition-transform duration-200"
              style={{
                transform: `translateX(${(selectedIndex - index) * 100}%)`,
              }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {segment.icon && <span>{segment.icon}</span>}
            {segment.label}
          </span>
        </button>
      ))}
    </div>
  );
}

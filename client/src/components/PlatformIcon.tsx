/**
 * iOS 26 Platform Icon Component
 * Features: Liquid glass blur effects, depth, native iOS styling
 */

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PlatformIconProps {
  icon: ReactNode;
  gradient: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-12 h-12",
  md: "w-16 h-16",
  lg: "w-20 h-20",
};

export default function PlatformIcon({ 
  icon, 
  gradient, 
  size = "md",
  className 
}: PlatformIconProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[22%]",
        "shadow-lg shadow-black/20 dark:shadow-black/40",
        sizeClasses[size],
        className
      )}
      style={{
        background: gradient,
      }}
    >
      {/* Liquid glass overlay */}
      <div className="absolute inset-0 bg-white/10 dark:bg-white/5 backdrop-blur-xl" />
      
      {/* Glossy highlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent" />
      
      {/* Icon container */}
      <div className="relative w-full h-full flex items-center justify-center text-white">
        {icon}
      </div>
      
      {/* Inner shadow for depth */}
      <div className="absolute inset-0 rounded-[22%] shadow-inner shadow-black/10" />
    </div>
  );
}

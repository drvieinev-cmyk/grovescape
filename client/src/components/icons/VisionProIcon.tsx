/**
 * Vision Pro Icon Component
 * Line art style matching other platform icons
 */

interface VisionProIconProps {
  className?: string;
}

export function VisionProIcon({ className = "w-6 h-6" }: VisionProIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Vision Pro headset outline - simplified line art */}
      <path d="M3 10c0-2 1-3 3-3h12c2 0 3 1 3 3v2c0 2-1 3-3 3H6c-2 0-3-1-3-3v-2z" />
      {/* Left lens */}
      <circle cx="8" cy="11" r="2.5" />
      {/* Right lens */}
      <circle cx="16" cy="11" r="2.5" />
      {/* Nose bridge */}
      <path d="M10.5 11h3" />
      {/* Head strap left */}
      <path d="M3 11c-1 0-2 1-2 2v0c0 1 1 2 2 2" />
      {/* Head strap right */}
      <path d="M21 11c1 0 2 1 2 2v0c0 1-1 2-2 2" />
    </svg>
  );
}

import { Star } from "lucide-react";

export function StarDisplay({ rating, size = 18 }) {
  const full = Math.floor(rating); // whole stars
  const fraction = rating - full; // 0–0.99 part
  const empty = 5 - full - (fraction > 0 ? 1 : 0);

  const starStyle = { width: size, height: size, minWidth: size };

  return (
    <div className="inline-flex items-center" style={{ gap: 4 }} dir="ltr">
      {/* Full stars */}
      {Array.from({ length: full }).map((_, i) => (
        <Star
          key={`f${i}`}
          style={starStyle}
          fill="currentColor"
          className="text-yellow-500"
        />
      ))}

      {/* Partial star */}
      {fraction > 0 && (
        <span
          className="relative inline-block"
          style={{ width: size, height: size }}
        >
          {/* background star (empty) */}
          <Star style={starStyle} className="text-gray-300" />

          {/* foreground star (clip by fraction) */}
          <Star
            style={{
              ...starStyle,
              position: "absolute",
              left: 0,
              top: 0,
              clipPath: `inset(0 ${100 - fraction * 100}% 0 0)`,
            }}
            fill="currentColor"
            className="text-yellow-500"
          />
        </span>
      )}

      {/* Empty stars */}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e${i}`} style={starStyle} className="text-gray-300" />
      ))}
    </div>
  );
}

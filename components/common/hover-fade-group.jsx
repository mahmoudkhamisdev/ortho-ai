"use client";

import { useState } from "react";

export default function HoverFadeGroup({ data, renderItem, className }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={`flex gap-4 ${className || ""}`}>
      {data.map((item, index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className={`group relative w-fit transition-opacity duration-300 
            ${
              hoveredIndex !== null && hoveredIndex !== index
                ? "opacity-60"
                : "opacity-100"
            }`}
        >
          {renderItem(item, index)}
          {/* <span className="absolute -bottom-1 left-0 w-full h-[.5px] bg-muted" /> */}
          <span
            className="absolute -bottom-0.5 left-0 w-full h-[0.5px] bg-main
                 transform scale-x-0 origin-right transition-transform duration-300 
                 group-hover:scale-x-100 group-hover:origin-left"
          />
        </div>
      ))}
    </div>
  );
}

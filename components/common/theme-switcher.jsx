"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { flushSync } from "react-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

const themes = [
  { key: "system", icon: Monitor, label: "System theme" },
  { key: "light", icon: Sun, label: "Light theme" },
  { key: "dark", icon: Moon, label: "Dark theme" },
];

export const ThemeSwitcher = ({ className, duration = 800 }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRefs = useRef({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleThemeClick = useCallback(
    async (themeKey) => {
      if (isTransitioning || themeKey === theme) return;
      setIsTransitioning(true);

      const button = buttonRefs.current[themeKey];

      const rect = button.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      await document.startViewTransition(() => {
        flushSync(() => setTheme(themeKey));
      }).ready;

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );

      if (!button) {
        setTheme(themeKey);
        setIsTransitioning(false);
        return;
      }

      setTimeout(() => setIsTransitioning(false), duration);
    },
    [setTheme, duration, theme, isTransitioning]
  );

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      className={cn(
        "relative isolate flex justify-between h-8 rounded-full bg-background p-1 ring-1 ring-border w-[5.5rem]",
        className
      )}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive =
          theme === key || (key !== "system" && resolvedTheme === key);
        return (
          <button
            key={key}
            ref={(el) => (buttonRefs.current[key] = el)}
            aria-label={label}
            onClick={() => handleThemeClick(key)}
            className="relative h-6 w-6 rounded-full"
            type="button"
          >
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-secondary"
                layoutId="activeTheme"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <Icon
              className={cn(
                "relative z-10 m-auto h-4 w-4 transition-colors",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

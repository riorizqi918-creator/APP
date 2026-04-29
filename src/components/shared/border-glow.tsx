"use client";

import { CSSProperties, ReactNode, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function BorderGlow({
  children,
  className,
  contentClassName,
  edgeSensitivity = 30,
  glowColor = "40 80 80",
  backgroundColor = "#060010",
  borderRadius = 28,
  glowRadius = 44,
  glowIntensity = 1,
  colors = ["#c084fc", "#f472b6", "#38bdf8"],
}: BorderGlowProps) {
  const [pointer, setPointer] = useState({ x: 0, y: 0, opacity: 0 });

  const gradient = useMemo(() => {
    const [c1, c2, c3] = colors;
    return `radial-gradient(${glowRadius}px circle at ${pointer.x}px ${pointer.y}px, ${c1} 0%, ${c2} 35%, ${c3} 65%, transparent 100%)`;
  }, [colors, glowRadius, pointer.x, pointer.y]);

  const fallbackGlow = useMemo(() => {
    return `radial-gradient(${glowRadius}px circle at ${pointer.x}px ${pointer.y}px, rgb(${glowColor}) 0%, transparent 100%)`;
  }, [glowColor, glowRadius, pointer.x, pointer.y]);

  const wrapperStyle: CSSProperties = {
    borderRadius,
  };

  const glowStyle: CSSProperties = {
    borderRadius,
    opacity: pointer.opacity,
    backgroundImage: colors.length > 0 ? gradient : fallbackGlow,
  };

  const contentStyle: CSSProperties = {
    borderRadius: Math.max(borderRadius - 1, 0),
    backgroundColor,
  };

  return (
    <div
      className={cn("relative p-px", className)}
      style={wrapperStyle}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const dist = Math.min(x, y, rect.width - x, rect.height - y);
        const nearEdge = clamp((edgeSensitivity - dist) / edgeSensitivity, 0, 1);
        setPointer({ x, y, opacity: nearEdge * clamp(glowIntensity, 0, 2) });
      }}
      onMouseLeave={() => setPointer((prev) => ({ ...prev, opacity: 0 }))}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={wrapperStyle}>
        <div className="absolute inset-0 transition-opacity duration-200" style={glowStyle} />
        <div className="absolute inset-0 border border-white/15" style={{ borderRadius }} />
      </div>

      <div className={cn("relative", contentClassName)} style={contentStyle}>
        {children}
      </div>
    </div>
  );
}

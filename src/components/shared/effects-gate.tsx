"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SplashCursor = dynamic(() => import("@/components/SplashCursor"), { ssr: false });
const GlobalEffects = dynamic(() => import("@/components/shared/global-effects").then((mod) => mod.GlobalEffects), { ssr: false });

export function EffectsGate() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const disabled = pathname.startsWith("/admin");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Disabled globally for now to keep first-load rendering stable.
  if (true || disabled || !mounted) return null;

  return (
    <>
      <GlobalEffects />
      <SplashCursor />
    </>
  );
}

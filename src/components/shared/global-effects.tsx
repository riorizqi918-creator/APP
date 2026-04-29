"use client";

import LightPillar from "@/components/LightPillar";

export function GlobalEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#060010]" />
      <LightPillar
        topColor="#5227FF"
        bottomColor="#FF9FFC"
        intensity={1}
        rotationSpeed={0.3}
        glowAmount={0.002}
        pillarWidth={3}
        pillarHeight={0.4}
        noiseIntensity={0.5}
        pillarRotation={25}
        interactive={false}
        mixBlendMode="screen"
        quality="high"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(148,87,255,.22),transparent_30%),radial-gradient(circle_at_85%_5%,rgba(255,159,252,.18),transparent_28%)]" />
    </div>
  );
}

"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import MinimalNavbar from "@/components/MinimalNavbar";
import HeroCanvasScroll from "@/components/HeroCanvasScroll";
import ContentSections from "@/components/ContentSections";
import MinimalFooter from "@/components/MinimalFooter";
import AntiGravityWrapper from "@/components/AntiGravityWrapper";
import { product } from "@/data/product";

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Pills fade out as the hero scroll section exits
  const pillsOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <main>
      <MinimalNavbar />

      {/* Floating feature pills — anchored to bottom-left, fade with hero */}
      <motion.div
        style={{ opacity: pillsOpacity }}
        className="fixed bottom-10 left-8 z-40 flex flex-col gap-2 pointer-events-none"
      >
        {product.features.map((feature, i) => (
          <AntiGravityWrapper
            key={feature}
            delay={0.3 + i * 0.1}
            fallDistance={50}
            stiffness={55}
            damping={13}
          >
            <span
              className="inline-block font-sans text-xs font-medium uppercase tracking-widest px-4 py-2"
              style={{
                backgroundColor: "rgba(237, 232, 220, 0.85)",
                color: "var(--forest)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(200, 212, 191, 0.5)",
              }}
            >
              {feature}
            </span>
          </AntiGravityWrapper>
        ))}
      </motion.div>

      {/* Hero canvas scroll — 400vh */}
      <div ref={heroRef}>
        <HeroCanvasScroll />
      </div>

      {/* Content (cream bg) */}
      <ContentSections />

      {/* Footer */}
      <MinimalFooter />
    </main>
  );
}

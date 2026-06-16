"use client";

import AntiGravityWrapper from "./AntiGravityWrapper";
import MagneticElement from "./MagneticElement";

export default function MinimalNavbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6"
      style={{ background: "transparent" }}
    >
      {/* Brand */}
      <AntiGravityWrapper delay={0} fallDistance={60} stiffness={50} damping={12}>
        <a
          href="#"
          className="font-display text-2xl tracking-wide"
          style={{ color: "var(--forest)" }}
        >
          Wildflower
        </a>
      </AntiGravityWrapper>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-10">
        <AntiGravityWrapper delay={0.08} fallDistance={60} stiffness={55} damping={13}>
          <a
            href="#story"
            className="font-sans text-xs uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity duration-300"
            style={{ color: "var(--forest)" }}
          >
            Our Story
          </a>
        </AntiGravityWrapper>
        <AntiGravityWrapper delay={0.14} fallDistance={60} stiffness={55} damping={13}>
          <a
            href="#details"
            className="font-sans text-sm font-medium uppercase tracking-widest text-forest opacity-70 hover:opacity-100 transition-opacity"
          >
            Ingredients
          </a>
        </AntiGravityWrapper>
        <AntiGravityWrapper delay={0.2} fallDistance={60} stiffness={55} damping={13}>
          <MagneticElement strength={5} radius={70}>
            <a
              href="#buy"
              className="font-sans text-sm font-medium uppercase tracking-widest px-6 py-3 border border-forest text-forest hover:bg-forest hover:text-cream transition-all duration-300"
            >
              Pre-order
            </a>
          </MagneticElement>
        </AntiGravityWrapper>
      </div>
    </nav>
  );
}

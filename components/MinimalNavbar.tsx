"use client";

import AntiGravityWrapper from "./AntiGravityWrapper";
import MagneticElement from "./MagneticElement";
import Link from "next/link";

export default function MinimalNavbar() {
  return (
    <nav
      className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6"
      style={{ background: "transparent" }}
    >
      {/* Brand */}
      <AntiGravityWrapper delay={0} fallDistance={60} stiffness={50} damping={12}>
        <Link
          href="/"
          className="font-display text-4xl tracking-wide font-medium"
          style={{ color: "var(--forest)" }}
        >
          Wildflower
        </Link>
      </AntiGravityWrapper>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-10">
        <AntiGravityWrapper delay={0.08} fallDistance={60} stiffness={55} damping={13}>
          <Link
            href="/"
            className="font-sans text-sm font-medium uppercase tracking-widest opacity-90 hover:opacity-100 transition-opacity duration-300"
            style={{ color: "var(--forest)" }}
          >
            Our Story
          </Link>
        </AntiGravityWrapper>
        
        <AntiGravityWrapper delay={0.2} fallDistance={60} stiffness={55} damping={13}>
          <MagneticElement strength={5} radius={70}>
            <Link
              href="/catalogue"
              className="font-sans text-base font-semibold uppercase tracking-widest px-8 py-4 border-2 border-forest text-forest hover:bg-forest hover:text-cream transition-all duration-300"
            >
              Catalogue
            </Link>
          </MagneticElement>
        </AntiGravityWrapper>
      </div>
    </nav>
  );
}

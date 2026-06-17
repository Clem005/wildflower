"use client";

import { useState } from "react";
import { products } from "@/data/product";

import MinimalNavbar from "@/components/MinimalNavbar";
import HeroCanvasScroll from "@/components/HeroCanvasScroll";
import ContentSections from "@/components/ContentSections";
import MinimalFooter from "@/components/MinimalFooter";
import { motion } from "framer-motion";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const product = products[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % products.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <main className="bg-cream min-h-screen text-forest overflow-hidden">
      <MinimalNavbar />

      {/* Duality Toggle Pill */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 flex items-center bg-mist/50 backdrop-blur-md rounded-full p-1 border border-sage/20 shadow-xl">
        {products.map((p, i) => {
          const isActive = activeIndex === i;
          return (
            <button
              key={p.id}
              onClick={() => setActiveIndex(i)}
              className={`relative px-6 py-2 rounded-full font-sans text-xs uppercase tracking-widest transition-colors duration-300 ${
                isActive ? "text-cream" : "text-forest/70 hover:text-forest"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-forest rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{p.id}</span>
            </button>
          );
        })}
      </div>

      <HeroCanvasScroll 
        product={product} 
        onNext={handleNext} 
        onPrev={handlePrev} 
      />

      {/* Floating Pill behind content */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-sage opacity-10 blur-[120px] rounded-full pointer-events-none mix-blend-screen -z-10" />

      <ContentSections product={product} />

      <MinimalFooter />
    </main>
  );
}

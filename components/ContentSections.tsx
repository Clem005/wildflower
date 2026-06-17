"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { Product } from "@/data/product";
import MagneticElement from "./MagneticElement";
import PreOrderModal from "./PreOrderModal";
import { useState } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function ContentSections({ product }: { product: Product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      id="details"
      className="relative z-10 overflow-hidden"
      style={{
        backgroundColor: "var(--cream)",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* ─── Hero Identity ─────────────────────────────────────────── */}
          <section className="pt-4 pb-24 px-6">
            <div className="max-w-2xl mx-auto">
              <FadeUp delay={0}>
                <p className="font-sans text-xs uppercase tracking-widest text-sage mb-4">
                  Wildflower · Essential Collection
                </p>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-6">
                  <h1 className="font-display text-5xl md:text-7xl leading-none text-forest">
                    {product.name}
                  </h1>
                  <span className="inline-flex items-center justify-center font-sans text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 border border-sage text-sage rounded-full self-start md:self-center mt-2 md:mt-0">
                    Coming Soon
                  </span>
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="font-sans text-sm font-light text-charcoal opacity-60 tracking-widest uppercase">
                  {product.subName}
                </p>
              </FadeUp>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-3 mt-10">
                {product.features.map((f, i) => (
                  <FadeUp key={f} delay={0.25 + i * 0.08}>
                    <MagneticElement strength={4} radius={60}>
                      <span
                        className="inline-block font-sans text-xs font-medium uppercase tracking-widest px-4 py-2 border border-mist text-forest"
                        style={{ backgroundColor: "var(--parchment)" }}
                      >
                        {f}
                      </span>
                    </MagneticElement>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>

          <Divider />

          {/* ─── Botanical Purity ───────────────────────────────────────── */}
          <section className="py-24 px-6">
            <div className="max-w-2xl mx-auto grid md:grid-cols-5 gap-12 items-start">
              <div className="md:col-span-2">
                <FadeUp delay={0}>
                  <h2 className="font-display text-4xl md:text-5xl text-forest leading-tight">
                    {product.detailsSection.title}
                  </h2>
                </FadeUp>
              </div>
              <div className="md:col-span-3">
                <FadeUp delay={0.1}>
                  <p className="font-sans font-light text-base leading-relaxed text-charcoal opacity-75">
                    {product.detailsSection.description}
                  </p>
                </FadeUp>
              </div>
            </div>
          </section>

          <Divider />

          {/* ─── Plant-Based & Gentle ───────────────────────────────────── */}
          <section className="py-24 px-6">
            <div className="max-w-2xl mx-auto">
              <FadeUp delay={0}>
                <p className="font-sans text-xs uppercase tracking-widest text-sage mb-8">
                  Formulation
                </p>
              </FadeUp>

              <FadeUp delay={0.08}>
                <h2 className="font-display text-4xl md:text-5xl text-forest leading-tight mb-8">
                  {product.freshnessSection.title}
                </h2>
              </FadeUp>

              <FadeUp delay={0.16}>
                <p className="font-sans font-light text-base leading-relaxed text-charcoal opacity-75 max-w-lg">
                  {product.freshnessSection.description}
                </p>
              </FadeUp>

              {/* Ingredient grid */}
              <div className="grid grid-cols-3 gap-6 mt-16">
                {[
                  { name: "Aloe Vera", note: "Soothes scalp" },
                  { name: "Chamomile", note: "Adds golden shine" },
                  { name: "Plant Keratin", note: "Repairs damage" },
                ].map((ing, i) => (
                  <FadeUp key={ing.name} delay={0.22 + i * 0.08}>
                    <div className="border-t border-mist pt-5">
                      <p className="font-display text-lg text-forest mb-1">
                        {ing.name}
                      </p>
                      <p className="font-sans text-xs font-light text-charcoal opacity-60">
                        {ing.note}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>
          </section>

          <Divider />

          {/* ─── Buy Now ────────────────────────────────────────────────── */}
          <section id="buy" className="py-32 px-6">
            <div className="max-w-2xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-12">
              <div>
                <FadeUp delay={0}>
                  <p className="font-sans text-xs uppercase tracking-widest text-sage mb-4">
                    Ready to Order
                  </p>
                </FadeUp>

                <FadeUp delay={0.08}>
                  <p className="font-display text-6xl text-forest mb-2">
                    {product.buyNowSection.price}
                  </p>
                </FadeUp>

                <FadeUp delay={0.14}>
                  <p className="font-sans text-xs font-light text-charcoal opacity-55 mb-6">
                    {product.buyNowSection.unit}
                  </p>
                </FadeUp>

                <FadeUp delay={0.2}>
                  <p className="font-sans text-xs font-light text-charcoal opacity-50 max-w-xs leading-relaxed">
                    {product.buyNowSection.deliveryPromise}
                  </p>
                </FadeUp>
              </div>

              <FadeUp delay={0.28}>
                <MagneticElement strength={6} radius={90}>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="group relative font-sans text-sm font-medium uppercase tracking-widest px-10 py-5 bg-forest text-cream overflow-hidden transition-all duration-500 hover:shadow-xl"
                    id="add-to-cart-btn"
                  >
                    <span className="relative z-10">Pre-Order Now</span>
                    <span className="absolute inset-0 bg-charcoal translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
                  </button>
                </MagneticElement>
              </FadeUp>
            </div>
          </section>
        </motion.div>
      </AnimatePresence>

      <PreOrderModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={product} 
      />
    </div>
  );
}

function Divider() {
  return (
    <div className="px-6">
      <div className="max-w-2xl mx-auto border-t border-mist" />
    </div>
  );
}

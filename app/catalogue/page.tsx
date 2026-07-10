"use client";

import { products, ProductParent } from "@/data/product";
import { useState } from "react";
import MinimalNavbar from "@/components/MinimalNavbar";
import MinimalFooter from "@/components/MinimalFooter";
import FadeUp from "@/components/FadeUp";
import ProductPopup from "@/components/ProductPopup";

export default function CataloguePage() {
  const [selectedProduct, setSelectedProduct] = useState<ProductParent | null>(null);

  return (
    <main className="bg-cream min-h-screen text-forest overflow-hidden flex flex-col pt-32">
      <MinimalNavbar />

      {/* Floating Pill behind content */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-sage opacity-10 blur-[120px] rounded-full pointer-events-none mix-blend-screen -z-10" />

      <section className="px-8 pb-32 max-w-[1600px] mx-auto w-full flex-grow">
        <FadeUp delay={0}>
          <div className="mb-16 md:mb-24 text-center md:text-left">
            <h1 className="font-display text-4xl md:text-6xl text-forest mb-4">The Collection</h1>
            <p className="font-sans text-sm tracking-widest uppercase text-forest opacity-60">Pure botanicals for daily rituals</p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-24">
          {products.map((product, idx) => (
            <FadeUp key={product.id} delay={0.1 * (idx % 2)}>
              <button 
                onClick={() => setSelectedProduct(product)}
                className="group block w-full flex flex-col items-center text-center cursor-pointer"
              >
                <div className="relative aspect-[4/5] w-full max-w-[280px] md:max-w-[320px] mb-8 group-hover:-translate-y-2 transition-transform duration-700">
                  <img 
                    src={product.coverImage} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Steamy fade out at the bottom */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
                    style={{
                      background: "linear-gradient(to top, var(--cream) 0%, rgba(228, 220, 211,0.7) 40%, rgba(228, 220, 211,0) 100%)",
                      filter: "blur(4px)",
                      WebkitFilter: "blur(4px)",
                      transform: "translateY(2px) scaleX(1.1)", 
                    }}
                  />
                </div>
                
                <div className="flex flex-col items-center">
                  <h3 className="font-display text-2xl text-forest mb-2 group-hover:text-sage transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="font-sans text-xs tracking-widest uppercase text-forest opacity-60 mb-6">
                    {product.subName}
                  </p>
                  <span className="inline-flex items-center justify-center font-sans text-[9px] uppercase tracking-[0.2em] px-6 py-3 border border-mist hover:border-sage text-forest transition-colors rounded-sm">
                    View Variants
                  </span>
                </div>
              </button>
            </FadeUp>
          ))}
        </div>
      </section>

      <MinimalFooter />

      <ProductPopup 
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
    </main>
  );
}

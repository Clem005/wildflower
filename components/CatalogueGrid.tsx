import { products } from "@/data/product";
import Link from "next/link";
import FadeUp from "./FadeUp";

export default function CatalogueGrid() {
  return (
    <section id="catalogue" className="px-8 py-24 md:py-32 max-w-[1600px] mx-auto">
      <FadeUp delay={0}>
        <div className="mb-16 md:mb-24 text-center md:text-left">
          <h2 className="font-display text-4xl md:text-6xl text-forest mb-4">The Collection</h2>
          <p className="font-sans text-sm tracking-widest uppercase text-forest opacity-60">Discover our meticulously crafted ranges</p>
        </div>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 md:gap-y-24">
        {products.map((product, idx) => (
          <FadeUp key={product.id} delay={0.1 * (idx % 3)}>
            <Link href={`/product/${product.id}`} className="group block">
              <div className="relative aspect-[4/5] bg-sage/5 overflow-hidden mb-6 rounded-sm">
                <img 
                  src={product.coverImage} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center justify-center font-sans text-[10px] uppercase tracking-[0.2em] px-3 py-1 bg-cream/90 backdrop-blur-sm text-forest rounded-full shadow-sm">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col">
                <h3 className="font-display text-2xl text-forest mb-1 group-hover:text-sage transition-colors duration-300">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="font-sans text-xs tracking-widest uppercase text-forest opacity-60">
                    {product.variant}
                  </p>
                  <span className="inline-flex items-center justify-center font-sans text-[9px] uppercase tracking-[0.2em] px-3 py-1 border border-sage text-sage rounded-full">
                    Coming Soon
                  </span>
                </div>
              </div>
            </Link>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

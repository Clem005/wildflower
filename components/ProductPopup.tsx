"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ProductParent, ProductVariant } from "@/data/product";
import { useEffect, useState } from "react";
import PurchaseModal from "./PurchaseModal";
import Image from "next/image";

interface ProductPopupProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductParent | null;
}

export default function ProductPopup({ isOpen, onClose, product }: ProductPopupProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [activeProduct, setActiveProduct] = useState<ProductParent | null>(product);

  useEffect(() => {
    if (product) {
      setActiveProduct(product);
    }
  }, [product]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!activeProduct) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-forest/40 backdrop-blur-md"
              onClick={onClose}
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-5xl bg-cream rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-mist/50 backdrop-blur-sm text-forest hover:bg-forest hover:text-cream transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className="p-8 md:p-12 overflow-y-auto">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16 pt-4">
                  <p className="font-sans text-xs uppercase tracking-widest text-sage mb-3">
                    {activeProduct.subName}
                  </p>
                  <h2 className="font-display text-4xl md:text-5xl text-forest mb-6">
                    {activeProduct.name}
                  </h2>
                  <p className="font-sans font-light text-charcoal opacity-75 leading-relaxed text-sm md:text-base">
                    {activeProduct.shortDescription}
                  </p>
                </div>

                {/* Variants Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                  {activeProduct.variants.map((variant) => (
                    <div key={variant.id} className="flex flex-col border border-mist hover:border-sage transition-colors duration-300 rounded-sm bg-white/30 overflow-hidden">
                      <div className="relative aspect-square bg-sage/5">
                        <Image 
                          src={variant.image} 
                          alt={variant.name}
                          width={400}
                          height={400}
                          quality={100}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="p-6 md:p-8 flex flex-col flex-grow">
                        <h4 className="font-display text-2xl text-forest mb-3">{variant.name}</h4>
                        <p className="font-sans text-sm font-light text-charcoal opacity-70 leading-relaxed mb-8 flex-grow">
                          {variant.description}
                        </p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <p className="font-sans text-sm font-medium tracking-widest text-forest">
                            {variant.price}
                          </p>
                          <button 
                            onClick={() => setSelectedVariant(variant)}
                            className="font-sans text-xs font-medium uppercase tracking-widest px-6 py-3 bg-forest text-cream hover:bg-sage transition-colors"
                          >
                            Purchase
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <PurchaseModal 
        isOpen={!!selectedVariant} 
        onClose={() => setSelectedVariant(null)} 
        productName={activeProduct.name}
        variantName={selectedVariant?.name || ""}
      />
    </>
  );
}

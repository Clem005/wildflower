"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sendPurchase } from "@/app/actions/sendPurchase";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  variantName: string;
}

export default function PurchaseModal({ isOpen, onClose, productName, variantName }: PurchaseModalProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    formData.append("product", `${productName} - ${variantName}`);

    try {
      const result = await sendPurchase(formData);

      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Failed to submit. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("A server error occurred. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-forest/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative w-full max-w-md bg-cream text-charcoal rounded-3xl p-8 shadow-2xl overflow-hidden"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-charcoal/50 hover:text-charcoal transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>

            {status === "success" ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-sage/20 text-sage rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="font-display text-3xl text-forest mb-2">Order Received</h3>
                <p className="font-sans text-sm text-charcoal/70 mb-8">
                  Thank you for placing your order for the {productName} ({variantName}). Please check your email inbox for confirmation and next steps. We will get to your order shortly!
                </p>
                <button
                  onClick={onClose}
                  className="w-full bg-forest text-cream py-4 uppercase tracking-widest text-xs font-semibold"
                >
                  Return to Site
                </button>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <p className="font-sans text-xs uppercase tracking-widest text-sage mb-2">
                    Place Order
                  </p>
                  <h3 className="font-display text-3xl text-forest leading-tight">
                    {productName}
                  </h3>
                  <p className="font-sans text-sm text-charcoal/60 mt-1">
                    {variantName}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest text-forest/70 mb-1">Full Name</label>
                    <input
                      name="fullName"
                      required
                      type="text"
                      className="w-full bg-transparent border-b border-mist py-2 font-sans text-base focus:outline-none focus:border-sage transition-colors placeholder-charcoal/30"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest text-forest/70 mb-1">Email Address</label>
                    <input
                      name="email"
                      required
                      type="email"
                      className="w-full bg-transparent border-b border-mist py-2 font-sans text-base focus:outline-none focus:border-sage transition-colors placeholder-charcoal/30"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest text-forest/70 mb-1">Phone Number</label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      className="w-full bg-transparent border-b border-mist py-2 font-sans text-base focus:outline-none focus:border-sage transition-colors placeholder-charcoal/30"
                      placeholder="+27 82 123 4567"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs uppercase tracking-widest text-forest/70 mb-1">Shipping Address</label>
                    <textarea
                      name="address"
                      required
                      rows={2}
                      className="w-full bg-transparent border-b border-mist py-2 font-sans text-base focus:outline-none focus:border-sage transition-colors placeholder-charcoal/30 resize-none"
                      placeholder="123 Botanica Way..."
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-500 text-xs mt-2">{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="mt-6 w-full bg-forest text-cream py-4 uppercase tracking-widest text-xs font-semibold hover:bg-charcoal transition-colors disabled:opacity-70 disabled:cursor-wait"
                  >
                    {status === "loading" ? "Processing..." : "Place Order"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { products } from "@/data/product";
import Link from "next/link";
import MinimalNavbar from "@/components/MinimalNavbar";
import HeroCanvasScroll from "@/components/HeroCanvasScroll";
import MinimalFooter from "@/components/MinimalFooter";
import FadeUp from "@/components/FadeUp";
import MagneticElement from "@/components/MagneticElement";

export default function Home() {
  const heroProduct = products[0];

  return (
    <main className="bg-cream min-h-screen text-forest overflow-hidden">
      <MinimalNavbar />

      <HeroCanvasScroll 
        folderPath="/images/banner_seq" 
        totalFrames={192} 
        baseExtension=".jpg" 
        finalExtension=".png" 
      />

      {/* Floating Pill behind content */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-sage opacity-10 blur-[120px] rounded-full pointer-events-none mix-blend-screen -z-10" />

      {/* The Philosophy Section */}
      <section className="px-8 py-32 md:py-48 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        <div className="md:w-1/2">
          <FadeUp delay={0.1}>
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-forest opacity-60 mb-6 block">Our Philosophy</span>
            <h2 className="font-display text-4xl md:text-5xl text-forest mb-8 leading-tight">
              Raw botanicals, <br /> refined for your daily ritual.
            </h2>
          </FadeUp>
        </div>
        <div className="md:w-5/12">
          <FadeUp delay={0.2}>
            <p className="font-sans font-light text-forest opacity-80 text-lg leading-relaxed mb-6">
              We believe in uncompromised nature. Sourced ethically and crafted in small batches, our formulations harness the purest ingredients to restore, protect, and elevate your hair.
            </p>
            <p className="font-sans font-light text-forest opacity-80 text-lg leading-relaxed">
              Every drop is a testament to our commitment to luxury without synthetic shortcuts. Real hydration, profound shine, and absolute purity.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* The Ritual Section */}
      <section className="px-8 py-24 bg-forest text-cream relative z-10">
        <div className="max-w-6xl mx-auto">
          <FadeUp delay={0.1}>
            <div className="text-center mb-24">
              <span className="font-sans text-xs uppercase tracking-[0.2em] opacity-60 mb-6 block">The Protocol</span>
              <h2 className="font-display text-4xl md:text-5xl mb-6">Three Steps to Perfection</h2>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {[
              { step: "01", title: "Cleanse", desc: "Purify the scalp and strip away environmental buildup without compromising natural oils." },
              { step: "02", title: "Nourish", desc: "Infuse strands with weightless moisture, sealing the cuticle for a mirror-like finish." },
              { step: "03", title: "Restore", desc: "A potent weekly infusion of heat-activated botanicals to repair fundamental damage." }
            ].map((item, idx) => (
              <FadeUp key={item.step} delay={0.2 + (idx * 0.1)}>
                <div className="flex flex-col border-t border-cream/20 pt-8">
                  <span className="font-display text-3xl opacity-40 mb-6">{item.step}</span>
                  <h3 className="font-display text-2xl mb-4">{item.title}</h3>
                  <p className="font-sans font-light opacity-70 leading-relaxed text-sm">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-8 py-48 text-center relative z-10 flex flex-col items-center">
        <FadeUp delay={0.1}>
          <h2 className="font-display text-5xl md:text-7xl text-forest mb-12">
            Experience the <br className="hidden md:block"/> Difference
          </h2>
        </FadeUp>
        
        <FadeUp delay={0.2}>
          <MagneticElement strength={6} radius={90}>
            <Link 
              href="/catalogue"
              className="relative inline-flex font-sans text-sm font-medium uppercase tracking-[0.2em] px-12 py-6 bg-forest text-cream overflow-hidden transition-all duration-700 hover:shadow-2xl group"
            >
              <span className="relative z-10 group-hover:text-cream transition-colors duration-500">Shop The Collection</span>
              <span className="absolute inset-0 bg-sage translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
            </Link>
          </MagneticElement>
        </FadeUp>
      </section>

      <MinimalFooter />
    </main>
  );
}

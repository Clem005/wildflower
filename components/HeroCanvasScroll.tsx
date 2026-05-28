"use client";

import { useEffect, useRef } from "react";
import { useScroll, motion } from "framer-motion";
import { product } from "@/data/product";
import AntiGravityWrapper from "./AntiGravityWrapper";

export default function HeroCanvasScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const frames = useRef<(HTMLImageElement | null)[]>(
    Array(product.totalFrames).fill(null)
  );
  const currentFrame = useRef<number>(product.totalFrames - 1);
  const introPlaying = useRef<boolean>(true);
  const introTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const introTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafPending = useRef<number | null>(null);

  // ─── Canvas resize (DPR-correct) ────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      drawFrame(currentFrame.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // ─── Preload all frames ──────────────────────────────────────────
  useEffect(() => {
    for (let i = 0; i < product.totalFrames; i++) {
      const img = new Image();
      const idx = i;
      img.onload = () => {
        frames.current[idx] = img;
        // Show last frame as soon as it's ready (for intro start)
        if (idx === product.totalFrames - 1) drawFrame(idx);
      };
      img.src = `${product.folderPath}/${String(i + 1).padStart(3, "0")}.jpg`;
    }
  }, []);

  // ─── Backwards intro: frame 89 → 0 ──────────────────────────────
  useEffect(() => {
    introTimeoutRef.current = setTimeout(() => {
      let frame = product.totalFrames - 1;
      currentFrame.current = frame;
      drawFrame(frame);

      introTimerRef.current = setInterval(() => {
        frame--;
        if (frame < 0) {
          if (introTimerRef.current) clearInterval(introTimerRef.current);
          introPlaying.current = false;
          currentFrame.current = 0;
          drawFrame(0);
          return;
        }
        currentFrame.current = frame;
        drawFrame(frame);
      }, 25); // ~40 fps
    }, 700);

    return () => {
      if (introTimeoutRef.current) clearTimeout(introTimeoutRef.current);
      if (introTimerRef.current) clearInterval(introTimerRef.current);
    };
  }, []);

  // ─── Scroll → frame (RAF-batched) ───────────────────────────────
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (introPlaying.current) return;

      const frameIndex = Math.min(
        Math.floor(v * product.totalFrames),
        product.totalFrames - 1
      );
      if (frameIndex === currentFrame.current) return;
      currentFrame.current = frameIndex;

      if (rafPending.current) cancelAnimationFrame(rafPending.current);
      rafPending.current = requestAnimationFrame(() => {
        drawFrame(frameIndex);
        rafPending.current = null;
      });
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // ─── Draw ────────────────────────────────────────────────────────
  function drawFrame(index: number) {
    const canvas = canvasRef.current;
    const img = frames.current[index];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const dpr = window.devicePixelRatio || 1;
    const lw = canvas.width / dpr;
    const lh = canvas.height / dpr;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover-fill — no letterboxing
    const scale = Math.max(lw / iw, lh / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (lw - dw) / 2;
    const dy = (lh - dh) / 2;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, lw, lh);
    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.restore();
  }

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative"
      style={{ height: "250vh" }}
    >
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: "100vh" }}
      >
        <AntiGravityWrapper
          delay={0.1}
          fallDistance={80}
          stiffness={40}
          damping={16}
          mass={2}
          className="w-full h-full"
        >
          <canvas ref={canvasRef} style={{ display: "block" }} />
        </AntiGravityWrapper>

        {/* Scroll indicator — fades away after intro finishes */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          animate={{ opacity: [1, 1, 0] }}
          transition={{ duration: 2, delay: 3.5, ease: "easeOut" }}
        >
          <span className="font-sans text-xs uppercase tracking-widest text-cream opacity-80">
            Scroll
          </span>
          <motion.div
            className="w-px bg-cream opacity-60"
            animate={{ height: [12, 28, 12] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}

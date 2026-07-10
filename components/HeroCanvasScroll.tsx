"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, motion, useTransform } from "framer-motion";
import AntiGravityWrapper from "./AntiGravityWrapper";

interface HeroCanvasScrollProps {
  folderPath: string;
  totalFrames: number;
  baseExtension?: string;
  finalExtension?: string;
}

export default function HeroCanvasScroll({ 
  folderPath, 
  totalFrames, 
  baseExtension = ".jpg", 
  finalExtension = ".jpg" 
}: HeroCanvasScrollProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const frames = useRef<(HTMLImageElement | null)[]>(
    Array(totalFrames).fill(null)
  );
  const currentFrame = useRef<number>(totalFrames - 1);
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

  // ─── Preload all frames on product change ───────────────────────
  useEffect(() => {
    // Reset state for new product
    introPlaying.current = true;
    if (introTimerRef.current) clearInterval(introTimerRef.current);
    if (introTimeoutRef.current) clearTimeout(introTimeoutRef.current);
    
    frames.current = Array(totalFrames).fill(null);
    currentFrame.current = totalFrames - 1;

    // Load frames backwards so the intro animation (which plays backwards) gets its frames first
    let loadedCount = 0;
    for (let i = totalFrames - 1; i >= 0; i--) {
      const img = new Image();
      const idx = i;
      img.onload = () => {
        frames.current[idx] = img;
        loadedCount++;
        // Show last frame as soon as it's ready (for intro start)
        if (idx === totalFrames - 1) drawFrame(idx);
      };
      const extension = i === totalFrames - 1 ? finalExtension : baseExtension;
      // Note: ffmpeg %03d starts at 001, so i+1 is correct
      img.src = `${folderPath}/${String(i + 1).padStart(3, "0")}${extension}`;
    }

    // Backwards intro: frame N-1 → 0
    introTimeoutRef.current = setTimeout(() => {
      let frame = totalFrames - 1;
      currentFrame.current = frame;
      drawFrame(frame);

      introTimerRef.current = setInterval(() => {
        const nextFrame = frame - 1;
        if (nextFrame < 0) {
          if (introTimerRef.current) clearInterval(introTimerRef.current);
          introPlaying.current = false;
          currentFrame.current = 0;
          drawFrame(0);
          return;
        }

        // Buffering: Only proceed if the next frame is loaded
        const nextImg = frames.current[nextFrame];
        if (nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
          frame = nextFrame;
          currentFrame.current = frame;
          drawFrame(frame);
        }
      }, 25); // ~40 fps
    }, 400);
    return () => {
      if (introTimeoutRef.current) clearTimeout(introTimeoutRef.current);
      if (introTimerRef.current) clearInterval(introTimerRef.current);
    };
  }, [folderPath, totalFrames, baseExtension, finalExtension]);

  // ─── Scroll → frame (RAF-batched) ───────────────────────────────
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (introPlaying.current) return;

      const frameIndex = Math.min(
        Math.floor(v * totalFrames),
        totalFrames - 1
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
  }, [scrollYProgress, totalFrames]);

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

    ctx.save();
    ctx.scale(dpr, dpr);

    // Fill background with cream color to prevent empty boxes when zoomed out
    ctx.fillStyle = "#E4DCD3";
    ctx.fillRect(0, 0, lw, lh);

    // Base cover-fill scale
    let scale = Math.max(lw / iw, lh / ih);

    // Zoom out on mobile screens so the product isn't too massive
    if (lw < 768) {
      scale = scale * 0.7; // Reduce scale by 30%
    }

    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (lw - dw) / 2;
    const dy = (lh - dh) / 2;

    ctx.drawImage(img, dx, dy, dw, dh);
    ctx.restore();
  }

  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative w-full h-[100vh] overflow-hidden"
    >
        <AntiGravityWrapper
          delay={0.1}
          fallDistance={80}
          stiffness={40}
          damping={16}
          mass={2}
          className="w-full h-full"
        >
          <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
        </AntiGravityWrapper>

        {/* Steamy Smoke Transition at the bottom */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to top, var(--cream) 0%, rgba(228, 220, 211,0.8) 30%, rgba(228, 220, 211,0) 100%)",
            filter: "blur(8px)",
            WebkitFilter: "blur(8px)",
            transform: "translateY(10px) scaleX(1.05)", // slightly expand to hide hard blurred edges at the bottom/sides
          }}
        />

        {/* Interactive Overlay for Swiping & Arrows */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {/* Scroll indicator */}
          <motion.div
            style={{ opacity: indicatorOpacity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-0"
          >
            <span className="font-sans text-xs uppercase tracking-widest text-forest opacity-80">
              Scroll to Discover
            </span>
            <motion.div
              className="w-px bg-forest opacity-60"
              animate={{ height: [12, 28, 12] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>
    </section>
  );
}

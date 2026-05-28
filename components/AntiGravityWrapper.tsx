"use client";

import { motion } from "framer-motion";
import React from "react";

interface AntiGravityWrapperProps {
  children: React.ReactNode;
  delay?: number;
  mass?: number;
  stiffness?: number;
  damping?: number;
  fallDistance?: number;
  className?: string;
}

export default function AntiGravityWrapper({
  children,
  delay = 0,
  mass = 1,
  stiffness = 60,
  damping = 14,
  fallDistance = 120,
  className,
}: AntiGravityWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={{ y: -fallDistance, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        y: {
          type: "spring",
          stiffness,
          damping,
          mass,
          delay,
        },
        opacity: {
          duration: 0.3,
          ease: "easeOut",
          delay,
        },
      }}
    >
      {children}
    </motion.div>
  );
}

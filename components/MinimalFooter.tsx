"use client";

import { motion } from "framer-motion";

export default function MinimalFooter() {
  return (
    <motion.footer
      className="py-10 px-6 flex flex-col md:flex-row items-center justify-between gap-4"
      style={{ backgroundColor: "var(--forest)" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <span
        className="font-display text-xl tracking-wide"
        style={{ color: "var(--cream)" }}
      >
        Wildflower
      </span>

      <div className="flex items-center gap-6">
        {["Privacy", "Terms", "Contact"].map((link) => (
          <a
            key={link}
            href="#"
            className="font-sans text-xs uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity duration-300"
            style={{ color: "var(--cream)" }}
          >
            {link}
          </a>
        ))}
      </div>

      <p
        className="font-sans text-xs font-light opacity-40"
        style={{ color: "var(--cream)" }}
      >
        © {new Date().getFullYear()} Wildflower Botanical Co.
      </p>
    </motion.footer>
  );
}

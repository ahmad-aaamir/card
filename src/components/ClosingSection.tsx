"use client";

import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { weddingData } from "@/data/invitationData";
import { OrnamentalDivider } from "./OrnamentalDivider";

export function ClosingSection() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#1A050A] text-[#FAF6F0] pt-12 sm:pt-16 pb-16 sm:pb-20 px-3.5 sm:px-4 overflow-hidden border-t border-[#C5A05B]/30 content-auto">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(114,44,59,0.35)_0%,transparent_75%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        {/* Beautiful Floral Stationery Vignette */}
        <motion.div
          initial={shouldReduceMotion ? {} : { scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full max-w-xl mx-auto h-56 sm:h-72 md:h-80 rounded-sm overflow-hidden border border-[#C5A05B]/40 shadow-2xl mb-8 sm:mb-10 group"
        >
          <Image
            src="/images/closing-stationery.jpg"
            alt="The Romantic Bloom fine art stationery and florals"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="object-cover object-center filter brightness-[0.94] contrast-[1.02] group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Subtle warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A050A]/80 via-transparent to-transparent" />

          {/* Subtle gold border frame inside */}
          <div className="absolute inset-2.5 sm:inset-3 border border-[#C5A05B]/40 pointer-events-none" />
        </motion.div>

        {/* Islamic Sunnah Dua */}
        <div className="max-w-xl mx-auto mb-6 sm:mb-8 space-y-3">
          <motion.p
            dir="rtl"
            initial={{ opacity: 0, y: -6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-arabic text-xl sm:text-2xl md:text-3xl text-[#F3DFB5] leading-relaxed drop-shadow-sm px-2 font-medium"
          >
            {weddingData.closingMessage.duaArabic}
          </motion.p>

          <OrnamentalDivider variant="crest" className="my-3 sm:my-4" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="font-serif italic text-sm sm:text-base text-[#FAF7F2] leading-relaxed px-2"
          >
            {weddingData.closingMessage.quote}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-serif text-xs sm:text-sm text-[#D7A3A0] leading-relaxed px-3"
          >
            {weddingData.closingMessage.note}
          </motion.p>
        </div>

        {/* Couple Sign-off */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-10 sm:mb-12"
        >
          <p className="font-serif italic text-xs sm:text-sm text-[#F7F0E7]/70 uppercase tracking-widest mb-1">
            With Prayers, Duas &amp; Gratitude
          </p>
          <h4 className="font-script text-3xl sm:text-5xl text-[#F3DFB5] font-normal drop-shadow-sm">
            {weddingData.couple.groom.firstName} &amp; {weddingData.couple.bride.firstName}
          </h4>
          <p className="font-serif text-[11px] sm:text-xs text-[#E7CF9B]/80 mt-1 font-medium">
            The Mahmood &amp; Ahmed Families
          </p>
        </motion.div>

        {/* Back to Top */}
        <div className="mb-10 sm:mb-12">
          <motion.button
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-[0.2em] text-[#C5A05B] hover:text-[#F3DFB5] transition-colors group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full border border-[#C5A05B]/50 flex items-center justify-center group-hover:border-[#C5A05B] group-hover:bg-[#C5A05B]/10 transition-colors shadow-sm">
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <span>Return to Top</span>
          </motion.button>
        </div>

        {/* Vowelle Brand Signature */}
        <div className="pt-6 sm:pt-8 border-t border-[#C5A05B]/20 flex flex-col items-center">
          <span className="font-display tracking-[0.35em] text-xs sm:text-sm text-[#E7CF9B] uppercase font-semibold">
            {weddingData.brand.name}
          </span>
          <p className="font-serif italic text-[11px] sm:text-xs text-[#D7A3A0] tracking-wider mt-1">
            {weddingData.brand.tagline}
          </p>
          <span className="font-serif text-[9px] sm:text-[10px] tracking-widest text-[#F7F0E7]/40 uppercase mt-3 sm:mt-4">
            {weddingData.brand.collection} · Digital Wedding Experience
          </span>
        </div>
      </motion.div>
    </footer>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronDown, RotateCcw, Sparkles } from "lucide-react";
import { weddingData } from "@/data/invitationData";
import { CornerFiligree, OrnamentalDivider } from "./OrnamentalDivider";

export type AnimationState = "closed" | "opening" | "reveal" | "complete";

interface InvitationCoverProps {
  initialState?: AnimationState;
  isEmerging?: boolean;
  onStateChange?: (state: AnimationState) => void;
  onReplayRequest?: () => void;
}

export function InvitationCover({
  isEmerging = true,
  onReplayRequest,
}: InvitationCoverProps) {
  const shouldReduceMotion = useReducedMotion();

  // Desktop Pointer-Responsive 3D Parallax Tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 25 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const tiltRotateX = useTransform(smoothMouseY, [-0.5, 0.5], ["2deg", "-2deg"]);
  const tiltRotateY = useTransform(smoothMouseX, [-0.5, 0.5], ["-2.5deg", "2.5deg"]);
  const specularOpacity = useTransform(smoothMouseX, [-0.5, 0, 0.5], [0.15, 0.35, 0.15]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    const xPct = e.clientX / window.innerWidth - 0.5;
    const yPct = e.clientY / window.innerHeight - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToNext = () => {
    const el = document.getElementById("inner-invitation");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleReplay = () => {
    mouseX.set(0);
    mouseY.set(0);
    if (onReplayRequest) {
      onReplayRequest();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full min-h-[100dvh] sm:min-h-screen flex items-center justify-center px-2.5 xs:px-3 sm:px-6 md:px-10 py-3 xs:py-4 sm:py-8 overflow-hidden bg-transparent"
    >
      {/* ============================================================= */}
      {/* 1. CINEMATIC LUXURY FLORAL & VELVET ENVIRONMENT               */}
      {/* ============================================================= */}

      {/* Directional studio lighting beam from top-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.2 }}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-1 bg-[radial-gradient(ellipse_75%_55%_at_12%_8%,rgba(243,223,181,0.22),transparent_65%)]"
      />

      {/* Localized warm amber halo behind the invitation card for optical depth */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] max-w-full rounded-full bg-[radial-gradient(circle_at_center,rgba(215,163,160,0.14),rgba(197,160,91,0.08)_40%,transparent_70%)] pointer-events-none z-1 blur-2xl"
      />

      {/* Atmospheric drifting gold & rose micro-petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-2">
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [-12, 18, -12],
                  x: [-6, 12, -6],
                  rotate: [0, 18, -12, 0],
                }
          }
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] left-[7%] w-3 h-3 bg-[#E7CF9B]/25 rounded-full blur-[1px] shadow-sm"
        />
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [16, -18, 16],
                  x: [10, -12, 10],
                  rotate: [12, -24, 12],
                }
          }
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[22%] right-[9%] w-3.5 h-3.5 bg-[#D7A3A0]/30 rounded-full blur-[1px] shadow-sm"
        />
        <motion.div
          animate={
            shouldReduceMotion
              ? {}
              : {
                  y: [-8, 14, -8],
                  x: [8, -8, 8],
                  rotate: [-10, 15, -10],
                }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[68%] left-[12%] w-2.5 h-2.5 bg-[#F3DFB5]/20 rounded-full blur-[1px]"
        />
      </div>

      {/* ============================================================= */}
      {/* 2. MAIN COMPOSITION: HERO EMERGES FROM MIDDLE OF WHITE PAGE   */}
      {/* AND GROWS SMOOTHLY TO FILL THE ENTIRE SECTION                 */}
      {/* ============================================================= */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center my-auto">

        {/* Radiant Golden Light Burst from the middle of the white page upon emergence */}
        {isEmerging && (
          <motion.div
            initial={{ scale: 0.15, opacity: 0 }}
            animate={{
              scale: [0.15, 1.4, 2.0],
              opacity: [0, 0.9, 0],
            }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[radial-gradient(circle_at_center,rgba(243,223,181,0.7),rgba(197,160,91,0.35)_40%,transparent_70%)] pointer-events-none z-30 blur-2xl"
          />
        )}

        {/* Main Hero Container: Emerges from the middle of the white page and grows to fill the section */}
        <motion.div
          initial={{
            scale: 0.22,
            opacity: 0,
            filter: "blur(6px)",
          }}
          animate={
            isEmerging
              ? {
                  scale: 1,
                  opacity: 1,
                  filter: "blur(0px)",
                }
              : {
                  scale: 0.22,
                  opacity: 0,
                  filter: "blur(6px)",
                }
          }
          transition={{
            duration: shouldReduceMotion ? 0.6 : 1.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            perspective: 1400,
            rotateX: shouldReduceMotion ? 0 : tiltRotateX,
            rotateY: shouldReduceMotion ? 0 : tiltRotateY,
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
          }}
          className="relative z-10 w-full max-w-[390px] xs:max-w-[450px] sm:max-w-2xl md:max-w-3.5xl lg:max-w-4.5xl xl:max-w-5xl mx-auto flex items-center justify-center will-change-transform"
        >
          {/* ========================================================= */}
          {/* ASYMMETRIC OPULENT BOTANICAL FLORALS (PICTURES & COLORS)   */}
          {/* Bloom magically outward to the corners as card expands     */}
          {/* ========================================================= */}

          {/* 1. Upper-Right Opulent Peonies & Garden Roses Garland */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, x: 18, y: -18 }}
            animate={{
              opacity: isEmerging ? 1 : 0,
              scale: isEmerging ? 1 : 0.7,
              x: 0,
              y: shouldReduceMotion ? 0 : (isEmerging ? [0, -3, 0] : 0),
              rotate: shouldReduceMotion ? 0 : (isEmerging ? [0, 0.6, -0.3, 0] : 0),
            }}
            transition={{
              opacity: { duration: 0.9, delay: 0.2, ease: "easeOut" },
              scale: { duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
              x: { duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
              rotate: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
            }}
            style={{ transformOrigin: "top right" }}
            className="absolute -top-3 -right-3 xs:-top-5 xs:-right-4 sm:-top-16 sm:-right-10 md:-top-20 md:-right-12 lg:-top-24 lg:-right-16 w-22 h-22 xs:w-28 xs:h-28 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] pointer-events-none z-25 drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] filter contrast-[1.06] transform-gpu"
          >
            <Image
              src="/images/floral-corner-garland.png"
              alt="Opulent blush and ivory peonies with foliage"
              fill
              priority
              sizes="(max-width: 640px) 110px, (max-width: 768px) 300px, 400px"
              className="object-contain"
            />
          </motion.div>

          {/* 2. Lower-Left Deep Wine Velvet Rose & Foliage Bouquet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, x: -18, y: 18 }}
            animate={{
              opacity: isEmerging ? 1 : 0,
              scale: isEmerging ? 1 : 0.7,
              x: 0,
              y: shouldReduceMotion ? 0 : (isEmerging ? [0, 3, 0] : 0),
              rotate: shouldReduceMotion ? 0 : (isEmerging ? [0, -0.6, 0.3, 0] : 0),
            }}
            transition={{
              opacity: { duration: 0.9, delay: 0.25, ease: "easeOut" },
              scale: { duration: 1.1, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
              x: { duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
              rotate: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
            }}
            style={{ transformOrigin: "bottom left" }}
            className="absolute -bottom-3 -left-3 xs:-bottom-5 xs:-left-4 sm:-bottom-16 sm:-left-10 md:-bottom-20 md:-left-12 lg:-bottom-24 lg:-left-16 w-22 h-22 xs:w-28 xs:h-28 sm:w-60 sm:h-60 md:w-76 md:h-76 lg:w-[380px] lg:h-[380px] pointer-events-none z-25 drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] filter contrast-[1.06] transform-gpu"
          >
            <Image
              src="/images/floral-lower-cluster.png"
              alt="Deep wine roses and golden foliage"
              fill
              priority
              sizes="(max-width: 640px) 110px, (max-width: 768px) 290px, 380px"
              className="object-contain"
            />
          </motion.div>

          {/* ========================================================= */}
          {/* 3. THE HANDCRAFTED ROYAL STATIONERY CARD                  */}
          {/* Fills the hero section with lavish gold & ivory presence  */}
          {/* ========================================================= */}
          <div className="relative z-10 w-full h-auto min-h-[540px] xs:min-h-[600px] sm:min-h-[660px] md:min-h-[720px] lg:min-h-[760px] flex flex-col justify-center bg-[#FAF6F0] rounded-sm p-3.5 xs:p-5 sm:p-10 md:p-14 lg:p-16 border border-[#C5A05B]/60 shadow-[0_35px_80px_-15px_rgba(0,0,0,0.88),0_15px_30px_-5px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_0_50px_rgba(197,160,91,0.06)] overflow-hidden">
            
            {/* Fine cotton paper fiber micro-texture overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#45151F_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none"
            />

            {/* Specular lighting sheen moving with desktop tilt */}
            <motion.div
              style={{ opacity: shouldReduceMotion ? 0.25 : specularOpacity }}
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-black/[0.04] pointer-events-none"
            />

            {/* Magical Golden Light Sheen Sweep across the paper upon emergence */}
            <motion.div
              initial={{ x: "-120%", opacity: 0 }}
              animate={isEmerging ? { x: "220%", opacity: [0, 0.55, 0] } : {}}
              transition={{ duration: 1.8, delay: 0.1, ease: "easeInOut" }}
              aria-hidden="true"
              className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-[#FFF7DE]/75 to-transparent pointer-events-none z-20 skew-x-12"
            />

            {/* Double Antique-Gold Foil Ornamental Border that draws onto paper */}
            <motion.div
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{
                opacity: isEmerging ? 1 : 0,
                scale: isEmerging ? 1 : 0.985,
              }}
              transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
              className="absolute inset-1.5 xs:inset-2 sm:inset-4 md:inset-5 border sm:border-2 border-[#C5A05B] pointer-events-none shadow-[inset_0_0_10px_rgba(197,160,91,0.22),0_0_15px_rgba(197,160,91,0.25)]"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isEmerging ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
              className="absolute inset-2.5 xs:inset-3 sm:inset-6 md:inset-7 border border-[#C5A05B]/50 border-dashed pointer-events-none"
            />

            {/* Antique Gold Corner Filigrees blooming into corners */}
            <motion.div
              initial={{ opacity: 0, scale: 0.2, rotate: -15 }}
              animate={{
                opacity: isEmerging ? 1 : 0,
                scale: isEmerging ? 1 : 0.2,
                rotate: isEmerging ? 0 : -15,
              }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <CornerFiligree
                position="top-left"
                className="top-2 left-2 sm:top-5 sm:left-5 md:top-6 md:left-6 text-[#C5A05B] scale-75 sm:scale-100"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.2, rotate: 15 }}
              animate={{
                opacity: isEmerging ? 1 : 0,
                scale: isEmerging ? 1 : 0.2,
                rotate: isEmerging ? 0 : 15,
              }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <CornerFiligree
                position="top-right"
                className="top-2 right-2 sm:top-5 sm:right-5 md:top-6 md:right-6 text-[#C5A05B] scale-75 sm:scale-100"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.2, rotate: 15 }}
              animate={{
                opacity: isEmerging ? 1 : 0,
                scale: isEmerging ? 1 : 0.2,
                rotate: isEmerging ? 0 : 15,
              }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <CornerFiligree
                position="bottom-left"
                className="bottom-2 left-2 sm:bottom-5 sm:left-5 md:bottom-6 md:left-6 text-[#C5A05B] scale-75 sm:scale-100"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.2, rotate: -15 }}
              animate={{
                opacity: isEmerging ? 1 : 0,
                scale: isEmerging ? 1 : 0.2,
                rotate: isEmerging ? 0 : -15,
              }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <CornerFiligree
                position="bottom-right"
                className="bottom-2 right-2 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 text-[#C5A05B] scale-75 sm:scale-100"
              />
            </motion.div>

            {/* ======================================================= */}
            {/* 4. CHOREOGRAPHED EDITORIAL CONTENT ON THE WHITE PAGE     */}
            {/* Prominent, easily readable typography and streamlined text */}
            {/* ======================================================= */}
            <div className="relative z-30 flex flex-col items-center text-center max-w-xl mx-auto my-auto py-3 sm:py-5 px-3 sm:px-6">
              
              {/* 1. Brand Wordmark Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{
                  opacity: isEmerging ? 1 : 0,
                  y: isEmerging ? 0 : -8,
                }}
                transition={{ delay: 0.45, duration: 0.75, ease: "easeOut" }}
                className="flex items-center justify-center gap-2 mb-2"
              >
                <span className="font-display tracking-[0.28em] sm:tracking-[0.38em] text-[11px] sm:text-xs text-[#9D783E] uppercase font-bold">
                  {weddingData.brand.name}
                </span>
                <span className="text-[#C5A05B] text-xs">·</span>
                <span className="font-serif italic text-xs sm:text-sm tracking-wider text-[#722C3B] font-medium">
                  {weddingData.brand.collection}
                </span>
              </motion.div>

              {/* 2. Islamic Bismillah Calligraphy (Large & Clear) */}
              <motion.div
                initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
                animate={{
                  opacity: isEmerging ? 1 : 0,
                  y: isEmerging ? 0 : 12,
                  filter: isEmerging ? "blur(0px)" : "blur(3px)",
                }}
                transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-full my-1 sm:my-2 px-1"
              >
                <p
                  dir="rtl"
                  className="font-arabic text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-[#45151F] leading-relaxed font-bold drop-shadow-sm"
                >
                  {weddingData.islamicHeading.bismillahArabic}
                </p>
              </motion.div>

              {/* 3. Gold-Foiled Royal Monogram Crest Stamp */}
              <motion.div
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{
                  opacity: isEmerging ? 1 : 0,
                  scale: isEmerging ? 1 : 0.75,
                }}
                transition={{ delay: 0.75, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="relative my-2 sm:my-3 flex items-center justify-center"
              >
                <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-[#C5A05B] flex items-center justify-center bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E8] to-[#EFE5D5] shadow-[0_4px_16px_rgba(197,160,91,0.3)] relative">
                  <div className="absolute inset-1 sm:inset-1.5 rounded-full border border-[#C5A05B]/40 border-dashed" />
                  <span className="font-display text-base sm:text-2xl tracking-widest text-[#45151F] font-bold drop-shadow-sm">
                    {weddingData.couple.monogram}
                  </span>
                </div>
              </motion.div>

              {/* 4. Invitation Announcement Text (Clear & Legible) */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: isEmerging ? 1 : 0,
                  y: isEmerging ? 0 : 8,
                }}
                transition={{ delay: 0.95, duration: 0.8, ease: "easeOut" }}
                className="font-serif italic text-xs sm:text-sm md:text-base text-[#722C3B] tracking-wide my-1 px-2 max-w-md leading-relaxed font-medium"
              >
                Cordially invite you to celebrate the marriage of
              </motion.p>

              {/* 5. Couple's Names as the Emotional Focal Point */}
              <motion.div
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{
                  opacity: isEmerging ? 1 : 0,
                  y: isEmerging ? 0 : 16,
                  filter: isEmerging ? "blur(0px)" : "blur(4px)",
                }}
                transition={{ delay: 1.1, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                className="my-1.5 sm:my-3 w-full"
              >
                <h1 className="font-script text-4xl xs:text-5xl sm:text-6xl md:text-7xl text-[#45151F] leading-none font-normal drop-shadow-[0_1px_2px_rgba(197,160,91,0.25)]">
                  {weddingData.couple.groom.firstName}
                </h1>
                <div className="flex items-center justify-center gap-3 my-1">
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: isEmerging ? undefined : 0 }}
                    transition={{ delay: 1.25, duration: 0.8 }}
                    className="h-[1px] w-10 sm:w-20 bg-gradient-to-r from-transparent to-[#C5A05B]"
                  />
                  <span className="font-display text-xs sm:text-sm tracking-[0.3em] text-[#C5A05B] font-bold">
                    &amp;
                  </span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: isEmerging ? undefined : 0 }}
                    transition={{ delay: 1.25, duration: 0.8 }}
                    className="h-[1px] w-10 sm:w-20 bg-gradient-to-l from-transparent to-[#C5A05B]"
                  />
                </div>
                <h2 className="font-script text-4xl xs:text-5xl sm:text-6xl md:text-7xl text-[#45151F] leading-none font-normal drop-shadow-[0_1px_2px_rgba(197,160,91,0.25)]">
                  {weddingData.couple.bride.firstName}
                </h2>
              </motion.div>

              {/* 6. Ornamental Crest Divider */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{
                  opacity: isEmerging ? 1 : 0,
                  scale: isEmerging ? 1 : 0.85,
                }}
                transition={{ delay: 1.25, duration: 0.75, ease: "easeOut" }}
                className="w-full flex justify-center origin-center my-1"
              >
                <OrnamentalDivider variant="crest" />
              </motion.div>

              {/* 7. Formal Date & Venue (Clean, Readable & Uncluttered) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isEmerging ? 1 : 0,
                  y: isEmerging ? 0 : 10,
                }}
                transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
                className="space-y-1 my-1 px-2"
              >
                <p className="font-serif uppercase tracking-[0.16em] sm:tracking-[0.24em] text-xs sm:text-sm md:text-base text-[#45151F] font-bold leading-normal">
                  {weddingData.event.formalDate}
                </p>
                <p className="font-serif italic text-xs sm:text-sm text-[#722C3B] leading-normal font-semibold">
                  {weddingData.venue.hall} · {weddingData.venue.name}
                </p>
              </motion.div>

              {/* 8. Action Controls: Primary Details Button & Replay Link */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{
                  opacity: isEmerging ? 1 : 0,
                  y: isEmerging ? 0 : 14,
                }}
                transition={{ delay: 1.55, duration: 0.8, ease: "easeOut" }}
                className="mt-4 sm:mt-6 flex flex-col items-center justify-center gap-2.5 w-full max-w-sm px-2"
              >
                {/* View Details Button (Generously Sized & Readable) */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={scrollToNext}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full border border-[#C5A05B] bg-gradient-to-r from-[#722C3B] to-[#45151F] hover:from-[#893547] hover:to-[#571b27] text-[#FAF6F0] font-serif text-xs sm:text-sm uppercase tracking-[0.2em] transition-all cursor-pointer shadow-lg hover:shadow-[0_4px_20px_rgba(114,44,59,0.45)]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#E7CF9B] animate-pulse" />
                  <span>View Wedding Details</span>
                  <ChevronDown className="w-3.5 h-3.5 text-[#E7CF9B] group-hover:translate-y-0.5 transition-transform" />
                </motion.button>

                {/* Subtle Replay Link */}
                <button
                  type="button"
                  onClick={handleReplay}
                  className="inline-flex items-center gap-1.5 text-xs font-serif text-[#722C3B] hover:text-[#45151F] transition-colors cursor-pointer pt-0.5 opacity-80 hover:opacity-100"
                >
                  <RotateCcw className="w-3 h-3 text-[#C5A05B]" />
                  <span>Replay Envelope Unveiling</span>
                </button>
              </motion.div>

            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

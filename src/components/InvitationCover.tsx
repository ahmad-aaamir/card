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
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
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
      className="relative w-full min-h-[100dvh] sm:min-h-screen flex items-center justify-center px-2.5 xs:px-3 sm:px-6 md:px-10 py-3 xs:py-4 sm:py-8 overflow-hidden bg-[#180408]"
    >
      {/* ============================================================= */}
      {/* 1. CINEMATIC LUXURY FLORAL & VELVET ENVIRONMENT               */}
      {/* ============================================================= */}

      {/* Synchronized HD Luxury Floral Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <Image
          src="/images/hd-flower-background.jpg"
          alt="Luxury royal floral wedding backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 filter brightness-[0.92] contrast-[1.08]"
        />
        {/* Soft studio ambient light framing the card */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#180408]/35 via-transparent to-[#180408]/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#0f0205_95%)] opacity-55" />
      </motion.div>

      {/* Directional studio lighting beam from top-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.3 }}
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
            initial={{ opacity: 0, scale: 0.6, x: 20, y: -20, filter: "blur(4px)" }}
            animate={{
              opacity: isEmerging ? 1 : 0,
              scale: isEmerging ? 1 : 0.6,
              x: 0,
              filter: isEmerging ? "blur(0px)" : "blur(4px)",
              y: shouldReduceMotion ? 0 : (isEmerging ? [0, -4, 0] : 0),
              rotate: shouldReduceMotion ? 0 : (isEmerging ? [0, 0.7, -0.3, 0] : 0),
            }}
            transition={{
              opacity: { duration: 1.1, delay: 0.25, ease: "easeOut" },
              scale: { duration: 1.3, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
              filter: { duration: 0.9, delay: 0.25 },
              x: { duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
              rotate: { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
            }}
            style={{ transformOrigin: "top right" }}
            className="absolute -top-3 -right-3 xs:-top-5 xs:-right-4 sm:-top-16 sm:-right-10 md:-top-20 md:-right-12 lg:-top-24 lg:-right-16 w-22 h-22 xs:w-28 xs:h-28 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] pointer-events-none z-25 drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] filter contrast-[1.06]"
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
            initial={{ opacity: 0, scale: 0.6, x: -20, y: 20, filter: "blur(4px)" }}
            animate={{
              opacity: isEmerging ? 1 : 0,
              scale: isEmerging ? 1 : 0.6,
              x: 0,
              filter: isEmerging ? "blur(0px)" : "blur(4px)",
              y: shouldReduceMotion ? 0 : (isEmerging ? [0, 4, 0] : 0),
              rotate: shouldReduceMotion ? 0 : (isEmerging ? [0, -0.7, 0.3, 0] : 0),
            }}
            transition={{
              opacity: { duration: 1.1, delay: 0.3, ease: "easeOut" },
              scale: { duration: 1.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
              filter: { duration: 0.9, delay: 0.3 },
              x: { duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.8 },
              rotate: { duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.8 },
            }}
            style={{ transformOrigin: "bottom left" }}
            className="absolute -bottom-3 -left-3 xs:-bottom-5 xs:-left-4 sm:-bottom-16 sm:-left-10 md:-bottom-20 md:-left-12 lg:-bottom-24 lg:-left-16 w-22 h-22 xs:w-28 xs:h-28 sm:w-60 sm:h-60 md:w-76 md:h-76 lg:w-[380px] lg:h-[380px] pointer-events-none z-25 drop-shadow-[0_15px_25px_rgba(0,0,0,0.85)] filter contrast-[1.06]"
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
            {/* Colors, Islamic Calligraphy, Monogram Crest & Text      */}
            {/* ======================================================= */}
            <div className="relative z-30 flex flex-col items-center text-center max-w-2xl mx-auto my-auto py-1 sm:py-3 px-1 sm:px-4">
              
              {/* 1. Small Refined Brand Wordmark Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{
                  opacity: isEmerging ? 1 : 0,
                  y: isEmerging ? 0 : -8,
                }}
                transition={{ delay: 0.45, duration: 0.75, ease: "easeOut" }}
                className="flex items-center justify-center gap-1.5 mb-1 sm:mb-2.5"
              >
                <span className="font-display tracking-[0.25em] sm:tracking-[0.4em] text-[8px] xs:text-[9px] sm:text-xs text-[#9D783E] uppercase font-semibold">
                  {weddingData.brand.name}
                </span>
                <span className="text-[#C5A05B]/60 text-[10px] sm:text-xs">·</span>
                <span className="font-serif italic text-[10px] sm:text-xs tracking-wider text-[#722C3B]">
                  {weddingData.brand.collection}
                </span>
              </motion.div>

              {/* 2. Islamic Bismillah Calligraphy writing onto paper in Deep Burgundy Ink */}
              <motion.div
                initial={{ opacity: 0, y: 12, filter: "blur(3px)" }}
                animate={{
                  opacity: isEmerging ? 1 : 0,
                  y: isEmerging ? 0 : 12,
                  filter: isEmerging ? "blur(0px)" : "blur(3px)",
                }}
                transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-full my-0.5 sm:my-1 px-1"
              >
                <p
                  dir="rtl"
                  className="font-arabic text-xl xs:text-2xl sm:text-3xl md:text-4xl text-[#45151F] leading-tight font-semibold drop-shadow-[0_1px_1px_rgba(197,160,91,0.2)]"
                >
                  {weddingData.islamicHeading.bismillahArabic}
                </p>
                <span className="font-serif italic text-[9px] xs:text-[10px] sm:text-xs text-[#722C3B] tracking-wide block mt-0.5 font-medium">
                  {weddingData.islamicHeading.bismillahTranslation}
                </span>
              </motion.div>

              {/* 3. Gold-Foiled Royal Monogram Crest Stamp with pulsating aura */}
              <motion.div
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{
                  opacity: isEmerging ? 1 : 0,
                  scale: isEmerging ? 1 : 0.75,
                }}
                transition={{ delay: 0.75, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="relative my-1.5 xs:my-2 sm:my-3 flex items-center justify-center"
              >
                {/* Golden pulsing ring that radiates when monogram appears */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isEmerging
                      ? {
                          opacity: [0, 0.7, 0],
                          scale: [0.85, 1.4, 1.6],
                        }
                      : {}
                  }
                  transition={{ delay: 0.8, duration: 1.4, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full border border-[#C5A05B] pointer-events-none"
                />

                <div className="w-12 h-12 xs:w-14 xs:h-14 sm:w-18 sm:h-18 rounded-full border border-sm:border-2 border-[#C5A05B] flex items-center justify-center bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E8] to-[#EFE5D5] shadow-[0_4px_16px_rgba(197,160,91,0.3)] relative group">
                  <div className="absolute inset-1 sm:inset-1.5 rounded-full border border-[#C5A05B]/40 border-dashed" />
                  <span className="font-display text-sm xs:text-base sm:text-xl tracking-widest text-[#45151F] font-semibold drop-shadow-sm">
                    {weddingData.couple.monogram}
                  </span>
                </div>
              </motion.div>

              {/* 4. Elegant Invitation Announcement Text */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{
                  opacity: isEmerging ? 1 : 0,
                  y: isEmerging ? 0 : 8,
                }}
                transition={{ delay: 0.95, duration: 0.8, ease: "easeOut" }}
                className="font-serif italic text-[10px] xs:text-xs sm:text-sm md:text-base text-[#722C3B] tracking-normal sm:tracking-wide mt-0.5 px-2 max-w-lg leading-tight font-medium"
              >
                Together with their families, cordially invite you to celebrate the Nikkah &amp; Wedding reception of
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
                className="my-1 sm:my-2 w-full"
              >
                <h1 className="font-script text-3.5xl xs:text-4.5xl sm:text-6xl md:text-7xl lg:text-7.5xl text-[#45151F] leading-none font-normal drop-shadow-[0_1px_2px_rgba(197,160,91,0.25)]">
                  {weddingData.couple.groom.firstName}
                </h1>
                <div className="flex items-center justify-center gap-2 my-0.5 sm:my-1">
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: isEmerging ? undefined : 0 }}
                    transition={{ delay: 1.25, duration: 0.8 }}
                    className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#C5A05B]"
                  />
                  <span className="font-display text-[10px] sm:text-sm tracking-[0.25em] sm:tracking-[0.35em] text-[#C5A05B] font-semibold">
                    &amp;
                  </span>
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: isEmerging ? undefined : 0 }}
                    transition={{ delay: 1.25, duration: 0.8 }}
                    className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#C5A05B]"
                  />
                </div>
                <h2 className="font-script text-3.5xl xs:text-4.5xl sm:text-6xl md:text-7xl lg:text-7.5xl text-[#45151F] leading-none font-normal drop-shadow-[0_1px_2px_rgba(197,160,91,0.25)]">
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
                className="w-full flex justify-center scale-80 sm:scale-100 origin-center"
              >
                <OrnamentalDivider variant="crest" className="my-0.5 sm:my-1.5" />
              </motion.div>

              {/* 7. Formal Date, Hijri & Venue Details */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isEmerging ? 1 : 0,
                  y: isEmerging ? 0 : 10,
                }}
                transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
                className="space-y-0.5 sm:space-y-1 px-1.5"
              >
                <p className="font-serif uppercase tracking-[0.14em] sm:tracking-[0.22em] text-[10px] xs:text-xs sm:text-sm text-[#45151F] font-semibold max-w-md leading-tight">
                  {weddingData.event.formalDate}
                </p>
                <p className="font-serif italic text-[9px] xs:text-[11px] sm:text-xs text-[#9D783E] font-medium leading-tight">
                  {weddingData.event.hijriDate}
                </p>
                <p className="font-serif italic text-[9px] xs:text-[11px] sm:text-xs text-[#722C3B] leading-tight font-medium">
                  {weddingData.venue.hall} · {weddingData.venue.name} · {weddingData.venue.cityStateZip}
                </p>
              </motion.div>

              {/* 8. Action Controls: Details & Replay Opening */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{
                  opacity: isEmerging ? 1 : 0,
                  y: isEmerging ? 0 : 14,
                }}
                transition={{ delay: 1.55, duration: 0.8, ease: "easeOut" }}
                className="mt-2.5 xs:mt-3 sm:mt-5 flex flex-row items-center justify-center gap-2 sm:gap-3.5 w-full max-w-md px-1"
              >
                {/* View Details / Scroll Button */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={scrollToNext}
                  className="flex-1 sm:flex-initial group flex items-center justify-center gap-1 sm:gap-2 px-3 xs:px-4 sm:px-6 py-1.5 xs:py-2 sm:py-2.5 rounded-full border border-[#C5A05B] bg-gradient-to-r from-[#722C3B] to-[#45151F] hover:from-[#893547] hover:to-[#571b27] text-[#FAF6F0] font-serif text-[9px] xs:text-[11px] sm:text-xs uppercase tracking-wider sm:tracking-widest transition-all cursor-pointer shadow-lg hover:shadow-[0_4px_20px_rgba(114,44,59,0.45)] whitespace-nowrap"
                >
                  <Sparkles className="w-3 h-3 text-[#E7CF9B] animate-pulse" />
                  <span>View Wedding Details</span>
                  <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E7CF9B] group-hover:translate-y-0.5 transition-transform" />
                </motion.button>

                {/* Replay Cinematic Opening Button */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleReplay}
                  title="Replay cinematic video intro"
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1 sm:gap-1.5 px-2.5 xs:px-3.5 sm:px-5 py-1.5 xs:py-2 sm:py-2.5 rounded-full border border-[#C5A05B]/60 hover:border-[#C5A05B] bg-[#FFFDF9]/90 text-[#722C3B] hover:text-[#45151F] font-serif text-[9px] xs:text-[11px] sm:text-xs tracking-normal sm:tracking-wider uppercase transition-all cursor-pointer shadow-sm hover:shadow-md whitespace-nowrap"
                >
                  <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C5A05B]" />
                  <span>Replay Opening</span>
                </motion.button>
              </motion.div>

            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

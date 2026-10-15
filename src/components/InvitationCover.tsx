"use client";

import React, { useState, useCallback, useRef } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ChevronDown, RotateCcw } from "lucide-react";
import { weddingData } from "@/data/invitationData";
import { CornerFiligree, OrnamentalDivider } from "./OrnamentalDivider";
import { romanticAudio } from "@/utils/romanticAudio";

export type AnimationState = "closed" | "opening" | "reveal" | "complete";

interface InvitationCoverProps {
  initialState?: AnimationState;
  isEmerging?: boolean;
  onStateChange?: (state: AnimationState) => void;
  onReplayRequest?: () => void;
}

export function InvitationCover({
  initialState = "complete",
  isEmerging = false,
  onStateChange,
  onReplayRequest,
}: InvitationCoverProps) {
  const [animState, setAnimState] = useState<AnimationState>(initialState);
  const [isGlowMoving, setIsGlowMoving] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
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

  const updateState = useCallback(
    (newState: AnimationState) => {
      setAnimState(newState);
      if (onStateChange) {
        onStateChange(newState);
      }
    },
    [onStateChange]
  );

  // Trigger opening sequence for the physical envelope with state locking
  const handleOpenInvitation = () => {
    if (animState !== "closed" || isTransitioning) return;
    setIsTransitioning(true);
    setIsGlowMoving(true);

    if (romanticAudio) {
      romanticAudio.play();
    }

    if (shouldReduceMotion) {
      updateState("complete");
      setIsGlowMoving(false);
      setIsTransitioning(false);
      return;
    }

    const timerOpen = setTimeout(() => {
      updateState("opening");
    }, 800);

    const timerReveal = setTimeout(() => {
      updateState("reveal");
    }, 2000);

    const timerComplete = setTimeout(() => {
      updateState("complete");
      setIsGlowMoving(false);
      setIsTransitioning(false);
    }, 4400);

    return () => {
      clearTimeout(timerOpen);
      clearTimeout(timerReveal);
      clearTimeout(timerComplete);
    };
  };

  // Replay sequence
  const handleReplay = () => {
    if (isTransitioning) return;
    updateState("closed");
    setIsGlowMoving(false);
    mouseX.set(0);
    mouseY.set(0);
    if (onReplayRequest) {
      onReplayRequest();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToNext = () => {
    const el = document.getElementById("inner-invitation");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isCoveringWholeSection =
    animState === "reveal" || animState === "complete";

  return (
    <section
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full min-h-screen flex items-center justify-center px-2 xs:px-4 sm:px-6 md:px-10 py-6 sm:py-12 overflow-hidden bg-[#180408]"
    >
      {/* ============================================================= */}
      {/* 1. CINEMATIC LUXURY VELVET ENVIRONMENT & DIRECTIONAL LIGHTING  */}
      {/* ============================================================= */}

      {/* Real editorial crushed burgundy velvet textile backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <Image
          src="/images/editorial-velvet-backdrop.jpg"
          alt="Crushed burgundy velvet editorial backdrop"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 filter brightness-[0.82] contrast-[1.12]"
        />
        {/* Soft studio vignette darkening edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#160307]/80 via-[#26070e]/40 to-[#140205]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0f0205_95%)] opacity-85" />
      </motion.div>

      {/* Directional studio lighting beam from top-left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.3 }}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-1 bg-[radial-gradient(ellipse_75%_55%_at_12%_8%,rgba(243,223,181,0.22),transparent_65%)]"
      />

      {/* Localized warm amber halo behind the invitation card for optical separation */}
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
      {/* 2. MAIN COMPOSITION: INVITATION SUITE + FLORAL EDITORIAL FLATLAY */}
      {/* ============================================================= */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center my-auto">
        <AnimatePresence mode="wait">
          {!isCoveringWholeSection ? (
            /* ======================================================= */
            /* STATE 1 & 2: THE PHYSICAL VELVET & GOLD WAX ENVELOPE    */
            /* ======================================================= */
            <motion.div
              key="envelope-stage"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.5 } }}
              className="relative w-full max-w-[340px] xs:max-w-[390px] sm:max-w-[480px] md:max-w-[530px] [perspective:1400px] mx-auto py-4"
            >
              {/* Asymmetric Opulent Florals framing the physical envelope */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : { y: [0, -6, 0], rotate: [0, 0.6, 0] }
                }
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-8 xs:-top-12 xs:-right-10 sm:-top-16 sm:-right-14 w-40 h-40 xs:w-48 xs:h-48 sm:w-64 sm:h-64 pointer-events-none z-30 drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)]"
              >
                <Image
                  src="/images/floral-corner-garland.png"
                  alt="Lush peonies and roses"
                  fill
                  sizes="260px"
                  className="object-contain"
                />
              </motion.div>

              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : { y: [0, 6, 0], rotate: [0, -0.6, 0] }
                }
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -left-8 xs:-bottom-12 xs:-left-10 sm:-bottom-16 sm:-left-14 w-40 h-40 xs:w-48 xs:h-48 sm:w-60 sm:h-60 pointer-events-none z-30 drop-shadow-[0_20px_25px_rgba(0,0,0,0.8)]"
              >
                <Image
                  src="/images/floral-lower-cluster.png"
                  alt="Deep wine roses and gold foliage"
                  fill
                  sizes="240px"
                  className="object-contain"
                />
              </motion.div>

              {/* Physical Burgundy Envelope Body */}
              <div className="relative w-full aspect-[4/3] rounded-sm shadow-[0_30px_70px_rgba(0,0,0,0.9),0_15px_30px_rgba(0,0,0,0.7)] overflow-visible bg-gradient-to-br from-[#45151F] via-[#330c14] to-[#24080e] border border-[#C5A05B]/50">
                {/* Envelope Interior Damask Lining */}
                <div className="absolute inset-0 bg-[#290a12] overflow-hidden rounded-sm">
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C5A05B_1px,transparent_1px)] [background-size:12px_12px]" />
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-[#C5A05B]/15 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute inset-4 border border-[#C5A05B]/20 pointer-events-none" />
                </div>

                {/* IVORY CARD (sits inside envelope, slides out during opening) */}
                <motion.div
                  initial={false}
                  animate={
                    animState === "closed"
                      ? { y: 0, scale: 0.94, opacity: 0.95 }
                      : { y: -90, scale: 0.98, opacity: 1, zIndex: 15 }
                  }
                  transition={{
                    duration: 1.4,
                    ease: [0.16, 1, 0.3, 1],
                    delay: animState === "opening" ? 0.3 : 0,
                  }}
                  className="absolute inset-x-3 sm:inset-x-5 top-3 sm:top-5 h-[92%] bg-[#FAF6F0] rounded-sm border border-[#C5A05B]/50 shadow-2xl p-4 sm:p-6 flex flex-col items-center justify-center text-center overflow-hidden pointer-events-none"
                >
                  <div className="absolute inset-2 sm:inset-3 border border-[#C5A05B]/40 pointer-events-none" />
                  <p dir="rtl" className="font-arabic text-xs sm:text-sm text-[#45151F] font-semibold mb-1">
                    {weddingData.islamicHeading.bismillahArabic}
                  </p>
                  <span className="font-display tracking-[0.25em] text-[8px] sm:text-[9px] text-[#9D783E] uppercase font-semibold">
                    The Wedding Celebration of
                  </span>
                  <div className="my-1.5 sm:my-2">
                    <h3 className="font-script text-2xl sm:text-4xl text-[#45151F] leading-tight">
                      {weddingData.couple.groom.firstName} &amp; {weddingData.couple.bride.firstName}
                    </h3>
                  </div>
                  <p className="font-serif uppercase tracking-widest text-[9px] sm:text-[10px] text-[#722C3B] font-medium">
                    {weddingData.event.formalDate}
                  </p>
                  <p className="font-serif italic text-[8px] sm:text-[9px] text-[#9D783E] mt-0.5">
                    {weddingData.venue.hall} · Lahore
                  </p>
                </motion.div>

                {/* ENVELOPE FRONT POCKET (Triangular folds) */}
                <div className="absolute inset-0 pointer-events-none z-20">
                  <svg
                    viewBox="0 0 520 390"
                    className="w-full h-full filter drop-shadow-md"
                    preserveAspectRatio="none"
                  >
                    <polygon
                      points="0,0 260,200 0,390"
                      fill="#3a111a"
                      stroke="#C5A05B"
                      strokeWidth="0.8"
                      strokeOpacity="0.4"
                    />
                    <polygon
                      points="520,0 260,200 520,390"
                      fill="#330d15"
                      stroke="#C5A05B"
                      strokeWidth="0.8"
                      strokeOpacity="0.4"
                    />
                    <polygon
                      points="0,390 260,185 520,390"
                      fill="#481520"
                      stroke="#C5A05B"
                      strokeWidth="1.2"
                      strokeOpacity="0.6"
                    />
                    <line
                      x1="0"
                      y1="390"
                      x2="260"
                      y2="185"
                      stroke="#1a0408"
                      strokeWidth="2"
                      opacity="0.35"
                    />
                    <line
                      x1="520"
                      y1="390"
                      x2="260"
                      y2="185"
                      stroke="#1a0408"
                      strokeWidth="2"
                      opacity="0.35"
                    />
                  </svg>
                </div>

                {/* 3D TOP FOLDING FLAP */}
                <motion.div
                  initial={false}
                  animate={
                    animState === "closed"
                      ? { rotateX: 0, zIndex: 25 }
                      : { rotateX: -180, zIndex: 5 }
                  }
                  transition={{
                    duration: 1.2,
                    ease: [0.45, 0.05, 0.55, 0.95],
                  }}
                  style={{ transformOrigin: "top center" }}
                  className="absolute top-0 inset-x-0 h-1/2 [transform-style:preserve-3d] pointer-events-none"
                >
                  <svg
                    viewBox="0 0 520 200"
                    className="w-full h-full filter drop-shadow-lg"
                    preserveAspectRatio="none"
                  >
                    <polygon
                      points="0,0 520,0 260,185"
                      fill="#501724"
                      stroke="#C5A05B"
                      strokeWidth="1.2"
                      strokeOpacity="0.6"
                    />
                  </svg>
                </motion.div>

                {/* CENTRAL WAX SEAL INTERACTIVE BUTTON */}
                <div className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto flex flex-col items-center">
                  <button
                    onClick={handleOpenInvitation}
                    aria-label="Open wedding invitation"
                    className="group relative cursor-pointer focus:outline-none"
                  >
                    {isGlowMoving && (
                      <div className="absolute -inset-4 rounded-full pointer-events-none flex items-center justify-center">
                        <motion.svg
                          className="w-28 h-28 sm:w-32 sm:h-32 text-[#E7CF9B]"
                          viewBox="0 0 100 100"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        >
                          <circle
                            cx="50"
                            cy="50"
                            r="44"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeDasharray="60 216"
                            strokeLinecap="round"
                            className="filter drop-shadow-[0_0_8px_rgba(243,223,181,0.9)]"
                          />
                        </motion.svg>
                      </div>
                    )}

                    <div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-gradient-to-br from-[#722C3B] via-[#521926] to-[#360f18] border-2 border-[#C5A05B] shadow-2xl flex items-center justify-center transition-transform group-hover:scale-105 active:scale-95">
                      <div className="absolute inset-1 rounded-full border border-[#C5A05B]/40 border-dashed" />
                      <span className="font-display text-xl sm:text-2xl tracking-widest text-[#F3DFB5] font-normal drop-shadow">
                        {weddingData.couple.monogram}
                      </span>
                      <div className="absolute -bottom-2 bg-[#722C3B] border border-[#C5A05B] text-[8px] sm:text-[9px] font-display uppercase tracking-widest text-[#F3DFB5] px-2.5 py-0.5 rounded-full shadow-lg flex items-center justify-center group-hover:bg-[#893547] transition-colors">
                        <span>Open</span>
                      </div>
                    </div>
                  </button>

                  <p className="mt-7 font-serif italic text-xs sm:text-sm text-[#D7A3A0] tracking-wider text-center drop-shadow">
                    Tap the royal seal to open invitation
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ======================================================= */
            /* STATE 3 & 4: THE ROYAL HANDCRAFTED IVORY INVITATION     */
            /* EMERGING FROM WITHIN THE OPENING & COVERING WHOLE SCREEN*/
            /* ======================================================= */
            <motion.div
              key="royal-ivory-stage"
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : {
                      scale: 0.28,
                      opacity: 0,
                      y: 35,
                      filter: "blur(6px)",
                    }
              }
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 1.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                perspective: 1400,
                rotateX: shouldReduceMotion ? 0 : tiltRotateX,
                rotateY: shouldReduceMotion ? 0 : tiltRotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl mx-auto flex items-center justify-center will-change-transform"
            >
              {/* ASYMMETRIC OPULENT FLORALS OVERLAPPING THE CARD */}

              {/* 1. Upper-Right Opulent Peonies & Garden Roses Garland */}
              <motion.div
                initial={
                  shouldReduceMotion
                    ? {}
                    : { scale: 0.5, opacity: 0, x: -30, y: 30 }
                }
                animate={{
                  scale: 1,
                  opacity: 1,
                  x: 0,
                  y: shouldReduceMotion ? 0 : [0, -7, 0],
                  rotate: shouldReduceMotion ? 0 : [0, 0.7, 0],
                }}
                transition={{
                  scale: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 1.2 },
                  y: { duration: 13, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 13, repeat: Infinity, ease: "easeInOut" },
                }}
                className="absolute -top-10 -right-4 xs:-top-14 xs:-right-6 sm:-top-20 sm:-right-10 md:-top-24 md:-right-12 lg:-top-28 lg:-right-16 w-44 h-44 xs:w-56 xs:h-56 sm:w-76 sm:h-76 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] pointer-events-none z-25 drop-shadow-[0_25px_30px_rgba(0,0,0,0.85)] filter contrast-[1.05]"
              >
                <Image
                  src="/images/floral-corner-garland.png"
                  alt="Opulent blush and ivory peonies with foliage"
                  fill
                  priority
                  sizes="(max-width: 640px) 220px, (max-width: 768px) 300px, 420px"
                  className="object-contain"
                />
              </motion.div>

              {/* 2. Lower-Left Deep Wine Velvet Rose & Foliage Bouquet */}
              <motion.div
                initial={
                  shouldReduceMotion
                    ? {}
                    : { scale: 0.5, opacity: 0, x: 30, y: -30 }
                }
                animate={{
                  scale: 1,
                  opacity: 1,
                  x: 0,
                  y: shouldReduceMotion ? 0 : [0, 7, 0],
                  rotate: shouldReduceMotion ? 0 : [0, -0.7, 0],
                }}
                transition={{
                  scale: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 1.2 },
                  y: {
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8,
                  },
                  rotate: {
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8,
                  },
                }}
                className="absolute -bottom-10 -left-4 xs:-bottom-14 xs:-left-6 sm:-bottom-20 sm:-left-10 md:-bottom-24 md:-left-12 lg:-bottom-28 lg:-left-16 w-44 h-44 xs:w-56 xs:h-56 sm:w-72 sm:h-72 md:w-92 md:h-92 lg:w-[400px] lg:h-[400px] pointer-events-none z-25 drop-shadow-[0_25px_30px_rgba(0,0,0,0.85)] filter contrast-[1.05]"
              >
                <Image
                  src="/images/floral-lower-cluster.png"
                  alt="Deep wine roses and golden foliage"
                  fill
                  priority
                  sizes="(max-width: 640px) 220px, (max-width: 768px) 290px, 400px"
                  className="object-contain"
                />
              </motion.div>

              {/* 3. The Physical Handcrafted Warm Ivory Stationery Card Covering Whole Screen */}
              <div className="relative z-10 w-full min-h-[88vh] sm:min-h-[92vh] flex flex-col justify-center bg-[#FAF6F0] rounded-sm p-5 xs:p-7 sm:p-12 md:p-16 lg:p-20 border border-[#C5A05B]/60 shadow-[0_35px_80px_-15px_rgba(0,0,0,0.88),0_15px_30px_-5px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_0_50px_rgba(197,160,91,0.06)] overflow-hidden">
                {/* Fine cotton paper fiber micro-texture overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#45151F_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none"
                />

                {/* Subtle studio directional specular lighting sheen moving with desktop tilt */}
                <motion.div
                  style={{ opacity: shouldReduceMotion ? 0.25 : specularOpacity }}
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-black/[0.04] pointer-events-none"
                />

                {/* Double Antique-Gold Foil Ornamental Border with Shimmer Accent */}
                <div className="absolute inset-2.5 sm:inset-4 md:inset-5 border-2 border-[#C5A05B] pointer-events-none shadow-[inset_0_0_8px_rgba(197,160,91,0.15)]" />
                <div className="absolute inset-4 sm:inset-6 md:inset-7 border border-[#C5A05B]/50 border-dashed pointer-events-none" />

                {/* Antique Gold Corner Filigrees */}
                <CornerFiligree
                  position="top-left"
                  className="top-3 left-3 sm:top-5 sm:left-5 md:top-6 md:left-6 text-[#C5A05B]"
                />
                <CornerFiligree
                  position="top-right"
                  className="top-3 right-3 sm:top-5 sm:right-5 md:top-6 md:right-6 text-[#C5A05B]"
                />
                <CornerFiligree
                  position="bottom-left"
                  className="bottom-3 left-3 sm:bottom-5 sm:left-5 md:bottom-6 md:left-6 text-[#C5A05B]"
                />
                <CornerFiligree
                  position="bottom-right"
                  className="bottom-3 right-3 sm:bottom-5 sm:right-5 md:bottom-6 md:right-6 text-[#C5A05B]"
                />

                {/* Card Interior Editorial Content with Timed Staggered Sequence */}
                <div className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto my-auto py-2 sm:py-4">
                  
                  {/* 1. Small Refined Brand Wordmark Eyebrow */}
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.7 }}
                    className="flex items-center justify-center gap-2 mb-2 sm:mb-3"
                  >
                    <span className="font-display tracking-[0.32em] sm:tracking-[0.4em] text-[9px] sm:text-xs text-[#9D783E] uppercase font-semibold">
                      {weddingData.brand.name}
                    </span>
                    <span className="text-[#C5A05B]/60 text-xs">·</span>
                    <span className="font-serif italic text-xs tracking-wider text-[#722C3B]">
                      {weddingData.brand.collection}
                    </span>
                  </motion.div>

                  {/* 2. Islamic Bismillah Calligraphy in Deep Burgundy Ink */}
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="w-full my-1 sm:my-2"
                  >
                    <p
                      dir="rtl"
                      className="font-arabic text-2xl sm:text-3xl md:text-4xl text-[#45151F] leading-relaxed font-semibold drop-shadow-[0_1px_1px_rgba(197,160,91,0.2)]"
                    >
                      {weddingData.islamicHeading.bismillahArabic}
                    </p>
                    <span className="font-serif italic text-xs sm:text-sm text-[#722C3B] tracking-wider block mt-0.5">
                      {weddingData.islamicHeading.bismillahTranslation}
                    </span>
                  </motion.div>

                  {/* 3. Gold-Foiled Royal Monogram Crest */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.45, duration: 0.8, ease: "easeOut" }}
                    className="relative my-2 sm:my-3.5 flex items-center justify-center"
                  >
                    <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full border-2 border-[#C5A05B] flex items-center justify-center bg-gradient-to-br from-[#FFFDF9] via-[#FAF3E8] to-[#EFE5D5] shadow-[0_4px_18px_rgba(197,160,91,0.3)] relative group">
                      <div className="absolute inset-1 sm:inset-1.5 rounded-full border border-[#C5A05B]/40 border-dashed" />
                      <span className="font-display text-xl sm:text-2xl tracking-widest text-[#45151F] font-semibold drop-shadow-sm">
                        {weddingData.couple.monogram}
                      </span>
                    </div>
                  </motion.div>

                  {/* 4. Elegant Invitation Announcement */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="font-serif italic text-xs sm:text-sm md:text-base text-[#722C3B] tracking-wide mt-1 px-4 max-w-lg leading-relaxed font-medium"
                  >
                    Together with their families, cordially invite you to celebrate the Nikkah &amp; Wedding reception of
                  </motion.p>

                  {/* 5. Couple's Names as the Emotional Focal Point */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.72, duration: 0.9 }}
                    className="my-2 sm:my-3.5 w-full"
                  >
                    <h1 className="font-script text-5xl sm:text-7xl md:text-8xl text-[#45151F] leading-[1.05] font-normal drop-shadow-[0_1px_1px_rgba(197,160,91,0.25)]">
                      {weddingData.couple.groom.firstName}
                    </h1>
                    <div className="flex items-center justify-center gap-3 my-0.5 sm:my-1">
                      <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-[#C5A05B]" />
                      <span className="font-display text-xs sm:text-sm tracking-[0.35em] text-[#C5A05B] font-semibold">
                        &amp;
                      </span>
                      <span className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-[#C5A05B]" />
                    </div>
                    <h2 className="font-script text-5xl sm:text-7xl md:text-8xl text-[#45151F] leading-[1.05] font-normal drop-shadow-[0_1px_1px_rgba(197,160,91,0.25)]">
                      {weddingData.couple.bride.firstName}
                    </h2>
                  </motion.div>

                  {/* Ornamental Crest Divider */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.85, duration: 0.7 }}
                    className="w-full flex justify-center"
                  >
                    <OrnamentalDivider variant="crest" className="my-2 sm:my-3" />
                  </motion.div>

                  {/* 6. Wedding Formal Date, Hijri & Venue Details */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.95, duration: 0.8 }}
                    className="space-y-1 sm:space-y-1.5 px-3"
                  >
                    <p className="font-serif uppercase tracking-[0.18em] sm:tracking-[0.24em] text-xs sm:text-sm text-[#45151F] font-semibold max-w-md leading-relaxed">
                      {weddingData.event.formalDate}
                    </p>
                    <p className="font-serif italic text-xs sm:text-sm text-[#9D783E] font-medium">
                      {weddingData.event.hijriDate}
                    </p>
                    <p className="font-serif italic text-xs sm:text-sm text-[#722C3B] mt-1 font-medium">
                      {weddingData.venue.hall} · {weddingData.venue.name} · {weddingData.venue.cityStateZip}
                    </p>
                  </motion.div>

                  {/* 7. Action Controls: Details & Replay */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.08, duration: 0.8 }}
                    className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 w-full max-w-md px-2"
                  >
                    {/* View Details / Scroll Button with spring micro-interaction */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={scrollToNext}
                      className="w-full sm:w-auto group flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[#C5A05B] bg-gradient-to-r from-[#722C3B] to-[#45151F] hover:from-[#893547] hover:to-[#571b27] text-[#FAF6F0] font-serif text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg hover:shadow-[0_4px_20px_rgba(114,44,59,0.45)]"
                    >
                      <span>View Wedding Details</span>
                      <ChevronDown className="w-3.5 h-3.5 text-[#E7CF9B] group-hover:translate-y-0.5 transition-transform" />
                    </motion.button>

                    {/* Replay Cinematic Opening Button */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleReplay}
                      title="Replay cinematic video intro"
                      className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full border border-[#C5A05B]/60 hover:border-[#C5A05B] bg-[#FFFDF9]/85 text-[#722C3B] hover:text-[#45151F] font-serif text-xs tracking-wider uppercase transition-all cursor-pointer shadow-sm hover:shadow-md"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-[#C5A05B]" />
                      <span>Replay Opening</span>
                    </motion.button>
                  </motion.div>

                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

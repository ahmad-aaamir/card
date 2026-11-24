"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useSyncExternalStore,
} from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Sparkles, Calendar, RotateCcw, Hand, Scissors } from "lucide-react";
import { weddingData } from "@/data/invitationData";
import { OrnamentalDivider } from "./OrnamentalDivider";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const emptySubscribe = () => () => {};

function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

function calculateDifference(): TimeLeft {
  if (typeof window === "undefined") {
    return { days: 227, hours: 18, minutes: 45, seconds: 22 };
  }
  const target = new Date(weddingData.event.isoDate).getTime();
  const now = new Date().getTime();
  const difference = target - now;

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }
  return { days: 0, hours: 0, minutes: 0, seconds: 0 };
}

// Jagged deckled torn paper edge SVG for realistic rip seam
function TornEdge({ side = "right" }: { side: "right" | "left" }) {
  const isRight = side === "right";
  return (
    <svg
      viewBox="0 0 24 600"
      preserveAspectRatio="none"
      className={`absolute top-0 bottom-0 h-full w-4 sm:w-6 pointer-events-none z-30 drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] ${
        isRight ? "-right-2 sm:-right-3" : "-left-2 sm:-left-3"
      }`}
    >
      {/* White cotton paper fiber tear core */}
      <path
        d={
          isRight
            ? "M 0 0 L 14 30 L 4 60 L 18 95 L 6 130 L 20 170 L 5 210 L 18 250 L 4 290 L 19 330 L 6 370 L 22 410 L 5 450 L 18 490 L 4 530 L 16 570 L 0 600 Z"
            : "M 24 0 L 10 30 L 20 60 L 6 95 L 18 130 L 4 170 L 19 210 L 6 250 L 20 290 L 5 330 L 18 370 L 2 410 L 19 450 L 6 490 L 20 530 L 8 570 L 24 600 Z"
        }
        fill="#FAF6F0"
      />
      {/* Antique gold foil fringe on torn edge */}
      <path
        d={
          isRight
            ? "M 0 0 L 12 30 L 2 60 L 16 95 L 4 130 L 17 170 L 3 210 L 15 250 L 2 290 L 16 330 L 4 370 L 19 410 L 3 450 L 15 490 L 2 530 L 13 570 L 0 600 Z"
            : "M 24 0 L 12 30 L 22 60 L 8 95 L 20 130 L 7 170 L 21 210 L 9 250 L 22 290 L 8 330 L 20 370 L 5 410 L 21 450 L 9 490 L 22 530 L 11 570 L 24 600 Z"
        }
        fill="#3a0e18"
      />
    </svg>
  );
}

export function CountdownSection() {
  const isClient = useIsClient();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateDifference);
  const shouldReduceMotion = useReducedMotion();

  // Scratch & Paper Tear State
  const [isRevealed, setIsRevealed] = useState(false);
  const [isTearing, setIsTearing] = useState(false);
  const [swipeCount, setSwipeCount] = useState(0);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [scratchKey, setScratchKey] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const swipeDistanceRef = useRef(0);
  const swipeRegisteredRef = useRef(false);

  // Live countdown clock
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateDifference());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize and paint the luxury scratch canvas surface
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    const w = rect.width;
    const h = rect.height;

    // Rich luxury velvet & antique gold metallic gradient
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#2c0911");
    grad.addColorStop(0.25, "#4a121e");
    grad.addColorStop(0.5, "#22060d");
    grad.addColorStop(0.75, "#3d0e19");
    grad.addColorStop(1, "#1e040a");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Subtle golden brocade pattern
    ctx.fillStyle = "rgba(197, 160, 91, 0.08)";
    const dotSpacing = 24;
    for (let x = 12; x < w; x += dotSpacing) {
      for (let y = 12; y < h; y += dotSpacing) {
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Diagonal gold shimmer light beam
    const shimmer = ctx.createLinearGradient(0, 0, w, h);
    shimmer.addColorStop(0, "rgba(255, 242, 214, 0)");
    shimmer.addColorStop(0.48, "rgba(255, 242, 214, 0.08)");
    shimmer.addColorStop(0.5, "rgba(255, 242, 214, 0.22)");
    shimmer.addColorStop(0.52, "rgba(255, 242, 214, 0.08)");
    shimmer.addColorStop(1, "rgba(255, 242, 214, 0)");
    ctx.fillStyle = shimmer;
    ctx.fillRect(0, 0, w, h);

    // Ornate antique gold foil double border
    ctx.strokeStyle = "rgba(197, 160, 91, 0.85)";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(10, 10, w - 20, h - 20);

    ctx.strokeStyle = "rgba(231, 207, 155, 0.45)";
    ctx.lineWidth = 1;
    ctx.setLineDash([8, 6]);
    ctx.strokeRect(18, 18, w - 36, h - 36);
    ctx.setLineDash([]);

    // Corner filigree flourishes
    const cornerSize = 16;
    const corners = [
      { x: 10, y: 10 },
      { x: w - 10, y: 10 },
      { x: 10, y: h - 10 },
      { x: w - 10, y: h - 10 },
    ];
    ctx.fillStyle = "#C5A05B";
    corners.forEach((c) => {
      ctx.beginPath();
      ctx.arc(c.x, c.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.rect(c.x - cornerSize / 2, c.y - 1, cornerSize, 2);
      ctx.rect(c.x - 1, c.y - cornerSize / 2, 2, cornerSize);
      ctx.fill();
    });
  }, []);

  useEffect(() => {
    if (isClient && !isRevealed && !isTearing) {
      initCanvas();
      const handleResize = () => {
        if (!isRevealed && !isTearing) {
          initCanvas();
        }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isClient, isRevealed, isTearing, initCanvas, scratchKey]);

  // Trigger the dramatic paper tear animation
  const triggerPaperTear = useCallback(() => {
    if (isTearing || isRevealed) return;
    setIsTearing(true);

    // Once paper halves rip and fly away, finalize reveal
    setTimeout(() => {
      setIsRevealed(true);
      setIsTearing(false);
    }, 700);
  }, [isTearing, isRevealed]);

  // Check how much surface has been scratched off
  const checkScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    try {
      const w = canvas.width;
      const h = canvas.height;
      const sampleStep = Math.max(1, Math.floor(Math.min(w, h) / 40));
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      let transparentCount = 0;
      let totalSamples = 0;

      for (let y = 0; y < h; y += sampleStep) {
        for (let x = 0; x < w; x += sampleStep) {
          const index = (y * w + x) * 4 + 3;
          if (data[index] < 128) {
            transparentCount++;
          }
          totalSamples++;
        }
      }

      const percent = totalSamples > 0 ? (transparentCount / totalSamples) * 100 : 0;
      setScratchPercent(Math.round(percent));

      // Quick trigger once ~18% is scratched
      if (percent >= 18) {
        triggerPaperTear();
      }
    } catch {
      // Fallback
    }
  }, [triggerPaperTear]);

  // Scratch action handler with generous brush radius
  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Generous torn brush radius (55px desktop, 45px mobile) so 3-4 swipes easily unveil
    const brushRadius = window.innerWidth < 640 ? 46 : 58;

    if (lastPointRef.current) {
      const dx = x - lastPointRef.current.x;
      const dy = y - lastPointRef.current.y;
      swipeDistanceRef.current += Math.hypot(dx, dy);

      // Register a swipe once the pointer has traveled 70px
      if (swipeDistanceRef.current > 70 && !swipeRegisteredRef.current) {
        swipeRegisteredRef.current = true;
        setSwipeCount((prev) => {
          const next = prev + 1;
          // Trigger paper tear immediately upon 3-4 swipes!
          if (next >= 3) {
            triggerPaperTear();
          }
          return next;
        });
      }

      ctx.beginPath();
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
      ctx.lineWidth = brushRadius * 2;
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    lastPointRef.current = { x, y };

    checkScratchPercentage();
  };

  // Pointer event listeners (unified mouse and touch with touch-action: none)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    lastPointRef.current = null;
    swipeDistanceRef.current = 0;
    swipeRegisteredRef.current = false;
    try {
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
    swipeDistanceRef.current = 0;
    swipeRegisteredRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  // Reset to scratch again
  const handleReset = () => {
    setIsRevealed(false);
    setIsTearing(false);
    setSwipeCount(0);
    setScratchPercent(0);
    setScratchKey((prev) => prev + 1);
  };

  const timeUnits = [
    { label: "Days", value: isClient ? timeLeft.days : 227 },
    { label: "Hours", value: isClient ? timeLeft.hours : 18 },
    { label: "Minutes", value: isClient ? timeLeft.minutes : 45 },
    { label: "Seconds", value: isClient ? timeLeft.seconds : 22 },
  ];

  return (
    <section className="relative py-12 sm:py-20 px-3.5 sm:px-4 bg-[#1b050a]/85 text-[#FAF6F0] overflow-hidden select-none">
      {/* Background soft ambient burgundy glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(114,44,59,0.3)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        {/* Section title */}
        <p className="font-display tracking-[0.28em] text-xs sm:text-sm text-[#E7CF9B] uppercase font-bold mb-1.5">
          Save The Sacred Union
        </p>
        <h3 className="font-serif italic text-2xl sm:text-4xl text-[#FAF7F2] font-normal mb-3 sm:mb-4">
          Counting Down to the Nikkah
        </h3>

        <OrnamentalDivider variant="diamond" className="mb-6 sm:mb-8" />

        {/* ============================================================ */}
        {/* MAIN INTERACTIVE CARD: SCRATCH SURFACE + PROMINENT REVEAL    */}
        {/* ============================================================ */}
        <div
          ref={containerRef}
          className="relative max-w-2xl mx-auto rounded-sm overflow-hidden border-2 border-[#C5A05B]/60 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_0_30px_rgba(197,160,91,0.12)] bg-[#1e050b]"
        >
          {/* UNDERLYING CONTENT: PROMINENT DATE & COUNTDOWN */}
          <div className="relative p-5 sm:p-8 md:p-10 flex flex-col items-center justify-center space-y-6 sm:space-y-8">
            
            {/* 1. PROMINENT MAJESTIC WEDDING DATE */}
            <div className="w-full relative py-4 sm:py-6 px-3 sm:px-6 rounded-sm bg-gradient-to-b from-[#2e0b14] via-[#22070e] to-[#1a040a] border border-[#C5A05B]/50 shadow-inner">
              {/* Delicate gold corner filigrees */}
              <div className="absolute top-1.5 left-1.5 w-2 h-2 border-t-2 border-l-2 border-[#C5A05B]" />
              <div className="absolute top-1.5 right-1.5 w-2 h-2 border-t-2 border-r-2 border-[#C5A05B]" />
              <div className="absolute bottom-1.5 left-1.5 w-2 h-2 border-b-2 border-l-2 border-[#C5A05B]" />
              <div className="absolute bottom-1.5 right-1.5 w-2 h-2 border-b-2 border-r-2 border-[#C5A05B]" />

              <span className="font-display tracking-[0.32em] text-[10px] sm:text-xs text-[#E7CF9B] uppercase font-bold block mb-1">
                The Auspicious Wedding Day
              </span>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-7 my-2">
                {/* Huge Golden Day Numeral */}
                <div className="flex flex-col items-center">
                  <span className="font-display text-6xl sm:text-7xl md:text-8xl font-bold leading-none text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5DE] via-[#E7CF9B] to-[#C5A05B] drop-shadow-[0_4px_16px_rgba(197,160,91,0.35)]">
                    28
                  </span>
                  <span className="font-display tracking-[0.3em] text-xs sm:text-sm text-[#E7CF9B] uppercase font-semibold mt-0.5">
                    Saturday
                  </span>
                </div>

                {/* Vertical Divider */}
                <div className="hidden sm:block w-[1px] h-20 bg-gradient-to-b from-transparent via-[#C5A05B]/60 to-transparent" />

                {/* Month, Year, Hijri & Venue */}
                <div className="text-center sm:text-left space-y-1">
                  <h4 className="font-display tracking-[0.22em] text-2xl sm:text-3xl md:text-4xl font-bold text-[#FAF6F0] uppercase">
                    November 2026
                  </h4>
                  <p className="font-serif italic text-xs sm:text-sm md:text-base text-[#D7A3A0] font-medium">
                    18 Jumada al-Awwal 1448 AH
                  </p>
                  <p className="font-serif text-[11px] sm:text-xs text-[#E7CF9B]/90 tracking-wide pt-0.5">
                    {weddingData.venue.hall} · {weddingData.venue.name}
                  </p>
                </div>
              </div>

              {/* Ceremony announcement */}
              <p className="font-serif italic text-xs sm:text-sm text-[#F3DFB5]/90 pt-1 border-t border-[#C5A05B]/20 mt-2">
                Six-Thirty in the Evening · Lahore, Pakistan
              </p>
            </div>

            {/* 2. GILDED LIVE COUNTDOWN GRID */}
            <div className="w-full">
              <span className="font-display tracking-[0.25em] text-[10px] sm:text-xs text-[#D7A3A0] uppercase font-semibold block mb-3">
                Live Countdown to Celebration
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 max-w-xl mx-auto">
                {timeUnits.map((unit) => (
                  <div
                    key={unit.label}
                    className="relative p-3 sm:p-5 rounded-sm bg-gradient-to-b from-[#3a121b] to-[#20080e] border border-[#C5A05B]/40 shadow-lg group"
                  >
                    {/* Inner delicate frame */}
                    <div className="absolute inset-1 border border-[#C5A05B]/15 pointer-events-none" />

                    {/* Number display */}
                    <div className="relative h-9 sm:h-12 overflow-hidden flex items-center justify-center mb-0.5">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={unit.value}
                          initial={shouldReduceMotion ? { opacity: 0 } : { y: -14, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={shouldReduceMotion ? { opacity: 0 } : { y: 14, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F3DFB5] font-light tracking-tight drop-shadow-sm inline-block will-change-transform"
                        >
                          {String(unit.value).padStart(2, "0")}
                        </motion.span>
                      </AnimatePresence>
                    </div>

                    {/* Unit label */}
                    <div className="font-display uppercase tracking-[0.2em] text-[11px] sm:text-xs text-[#D7A3A0] font-bold">
                      {unit.label}
                    </div>

                    {/* Corner gold accents */}
                    <div className="absolute top-1 left-1 w-1 h-1 bg-[#C5A05B]/60" />
                    <div className="absolute top-1 right-1 w-1 h-1 bg-[#C5A05B]/60" />
                    <div className="absolute bottom-1 left-1 w-1 h-1 bg-[#C5A05B]/60" />
                    <div className="absolute bottom-1 right-1 w-1 h-1 bg-[#C5A05B]/60" />
                  </div>
                ))}
              </div>
            </div>

            {/* Replay / Re-scratch prompt */}
            {isRevealed && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs font-serif tracking-wider text-[#E7CF9B] hover:text-[#FAF6F0] underline underline-offset-4 cursor-pointer transition-colors pt-1"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#C5A05B]" />
                <span>Scratch Card Again</span>
              </motion.button>
            )}

          </div>

          {/* ============================================================ */}
          {/* REALISTIC PAPER TEAR & SCRATCH CARD OVERLAY                  */}
          {/* ============================================================ */}
          <AnimatePresence>
            {!isRevealed && (
              <div className="absolute inset-0 z-20 overflow-hidden pointer-events-auto">
                
                {/* 1. INTERACTIVE SCRATCH CANVAS (Active during Swipes 1 & 2) */}
                {!isTearing && (
                  <motion.div
                    key="scratch-canvas-wrap"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing touch-none select-none z-10"
                  >
                    <canvas
                      ref={canvasRef}
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      style={{ touchAction: "none" }}
                      className="absolute inset-0 w-full h-full block touch-none z-10"
                    />

                    {/* Interactive Swipe Guidance Badge */}
                    <div
                      className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-4 text-center pointer-events-none transition-opacity duration-300 ${
                        swipeCount >= 2 ? "opacity-20" : "opacity-100"
                      }`}
                    >
                      <div className="py-3 px-5 sm:px-7 rounded-full bg-[#180408]/90 backdrop-blur-md border border-[#C5A05B] shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(197,160,91,0.3)] flex flex-col items-center max-w-sm">
                        <div className="w-9 h-9 rounded-full border border-[#C5A05B] flex items-center justify-center bg-gradient-to-br from-[#722C3B] to-[#45151F] shadow-inner mb-1.5 animate-bounce">
                          <Hand className="w-4 h-4 text-[#E7CF9B]" />
                        </div>

                        <span className="font-display tracking-[0.24em] text-xs sm:text-sm text-[#F3DFB5] uppercase font-bold drop-shadow">
                          Scratch &amp; Tear to Unveil
                        </span>
                        <p className="font-serif italic text-[11px] sm:text-xs text-[#D7A3A0] mt-0.5 tracking-wide">
                          {swipeCount === 0 && "Swipe 3–4 times to tear open the card"}
                          {swipeCount === 1 && "Swipe 1/3 complete — keep swiping!"}
                          {swipeCount === 2 && "Swipe 2/3 complete — one more to tear!"}
                          {swipeCount >= 3 && "Tearing open..."}
                        </p>

                        {/* Swipe dots indicator */}
                        <div className="flex items-center gap-2 mt-2">
                          {[1, 2, 3].map((step) => (
                            <div
                              key={step}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                swipeCount >= step
                                  ? "w-6 bg-gradient-to-r from-[#C5A05B] to-[#FFF2D6]"
                                  : "w-2 bg-[#FAF6F0]/25"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Quick Tear Button */}
                    <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-30 pointer-events-auto">
                      <button
                        type="button"
                        onClick={triggerPaperTear}
                        title="Tear & Reveal"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#240B10]/95 backdrop-blur-md border border-[#C5A05B] text-[#E7CF9B] hover:text-[#FAF6F0] text-xs font-serif tracking-wider uppercase transition-all shadow-lg hover:shadow-[0_0_15px_rgba(197,160,91,0.4)] active:scale-95 cursor-pointer"
                      >
                        <Scissors className="w-3.5 h-3.5 text-[#E7CF9B]" />
                        <span className="text-[10px] font-medium tracking-widest">
                          Tear &amp; Reveal
                        </span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* 2. REALISTIC TORN PAPER ANIMATION (Plays on 3rd-4th Swipe) */}
                {isTearing && (
                  <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
                    
                    {/* Left Torn Half: Rips, curls, and flies left */}
                    <motion.div
                      initial={{ x: 0, rotateZ: 0, opacity: 1 }}
                      animate={{
                        x: "-120%",
                        rotateZ: -14,
                        opacity: 0,
                      }}
                      transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
                      style={{ transformOrigin: "top left" }}
                      className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-br from-[#3a0e18] via-[#4a121e] to-[#22060d] border-t-2 border-b-2 border-l-2 border-[#C5A05B] shadow-[15px_0_30px_rgba(0,0,0,0.9)]"
                    >
                      {/* Jagged Deckled Paper Tear Right Seam */}
                      <TornEdge side="right" />
                      {/* Inner gold frame remnant */}
                      <div className="absolute inset-2 border-t border-b border-l border-[#C5A05B]/30 border-dashed" />
                    </motion.div>

                    {/* Right Torn Half: Rips, curls, and flies right */}
                    <motion.div
                      initial={{ x: 0, rotateZ: 0, opacity: 1 }}
                      animate={{
                        x: "120%",
                        rotateZ: 14,
                        opacity: 0,
                      }}
                      transition={{ duration: 0.65, ease: [0.65, 0, 0.35, 1] }}
                      style={{ transformOrigin: "top right" }}
                      className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-bl from-[#3a0e18] via-[#4a121e] to-[#22060d] border-t-2 border-b-2 border-r-2 border-[#C5A05B] shadow-[-15px_0_30px_rgba(0,0,0,0.9)]"
                    >
                      {/* Jagged Deckled Paper Tear Left Seam */}
                      <TornEdge side="left" />
                      {/* Inner gold frame remnant */}
                      <div className="absolute inset-2 border-t border-b border-r border-[#C5A05B]/30 border-dashed" />
                    </motion.div>

                    {/* Bursting Gold Paper Confetti & Particles along the tear seam */}
                    {[
                      { x: -70, y: -40, rot: 180, delay: 0 },
                      { x: 80, y: -60, rot: -220, delay: 0.05 },
                      { x: -90, y: 30, rot: 340, delay: 0.08 },
                      { x: 95, y: 50, rot: -300, delay: 0.02 },
                      { x: -30, y: -80, rot: 210, delay: 0.04 },
                      { x: 40, y: 80, rot: -190, delay: 0.06 },
                      { x: 0, y: -95, rot: 360, delay: 0.03 },
                      { x: -60, y: 70, rot: -270, delay: 0.07 },
                    ].map((p, idx) => (
                      <motion.div
                        key={idx}
                        initial={{
                          x: "50%",
                          y: "50%",
                          scale: 0.2,
                          opacity: 1,
                        }}
                        animate={{
                          x: `calc(50% + ${p.x}px)`,
                          y: `calc(50% + ${p.y}px)`,
                          scale: [0.2, 1.2, 0.8],
                          rotate: p.rot,
                          opacity: [1, 1, 0],
                        }}
                        transition={{ duration: 0.65, delay: p.delay, ease: "easeOut" }}
                        className="absolute w-3.5 h-3.5 bg-gradient-to-br from-[#FFF5DE] via-[#E7CF9B] to-[#C5A05B] rounded-xs shadow-md border border-[#FAF6F0]"
                      />
                    ))}

                  </div>
                )}

              </div>
            )}
          </AnimatePresence>

        </div>

        {/* Footnote */}
        <div className="mt-6 sm:mt-8 flex items-center justify-center gap-2 text-xs font-serif text-[#D7A3A0]/80">
          <Calendar className="w-3.5 h-3.5 text-[#C5A05B]" />
          <span>Formal Invitations &amp; Reception Schedule Follow Below</span>
        </div>

      </motion.div>
    </section>
  );
}

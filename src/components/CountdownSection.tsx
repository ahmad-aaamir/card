"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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

export function CountdownSection() {
  const isClient = useIsClient();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateDifference);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateDifference());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: "Days", value: isClient ? timeLeft.days : 227 },
    { label: "Hours", value: isClient ? timeLeft.hours : 18 },
    { label: "Minutes", value: isClient ? timeLeft.minutes : 45 },
    { label: "Seconds", value: isClient ? timeLeft.seconds : 22 },
  ];

  return (
    <section className="relative py-12 sm:py-20 px-3.5 sm:px-4 bg-[#240B10]/55 backdrop-blur-[1px] text-[#FAF6F0] overflow-hidden">
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
          Counting Down to the Nikkah
        </p>
        <h3 className="font-serif italic text-2xl sm:text-4xl text-[#FAF7F2] font-normal mb-3 sm:mb-4">
          Counting Every Cherished Moment
        </h3>

        <OrnamentalDivider variant="diamond" className="mb-6 sm:mb-10" />

        {/* Gilded Countdown Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-2xl mx-auto">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.7 }}
              whileHover={{
                y: -4,
                scale: 1.02,
                borderColor: "rgba(197, 160, 91, 0.8)",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(197, 160, 91, 0.2)",
              }}
              className="relative p-4 sm:p-6 rounded-sm bg-gradient-to-b from-[#3a121b] to-[#20080e] border border-[#C5A05B]/35 shadow-xl group transition-all duration-300"
            >
              {/* Inner delicate frame */}
              <div className="absolute inset-1 sm:inset-1.5 border border-[#C5A05B]/15 pointer-events-none group-hover:border-[#C5A05B]/30 transition-colors" />

              {/* Number display with smooth slide animation on value changes */}
              <div className="relative h-10 sm:h-14 overflow-hidden flex items-center justify-center mb-0.5 sm:mb-1">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={unit.value}
                    initial={shouldReduceMotion ? { opacity: 0 } : { y: -18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={shouldReduceMotion ? { opacity: 0 } : { y: 18, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="font-serif text-3xl sm:text-5xl text-[#F3DFB5] font-light tracking-tight drop-shadow-sm inline-block will-change-transform"
                  >
                    {String(unit.value).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Unit label (Large & Clear) */}
              <div className="font-display uppercase tracking-[0.2em] text-xs sm:text-sm text-[#D7A3A0] font-bold">
                {unit.label}
              </div>

              {/* Tiny gold corner accents */}
              <div className="absolute top-1 left-1 w-1 h-1 bg-[#C5A05B]/50" />
              <div className="absolute top-1 right-1 w-1 h-1 bg-[#C5A05B]/50" />
              <div className="absolute bottom-1 left-1 w-1 h-1 bg-[#C5A05B]/50" />
              <div className="absolute bottom-1 right-1 w-1 h-1 bg-[#C5A05B]/50" />
            </motion.div>
          ))}
        </div>

        {/* Date confirmation footnote */}
        <div className="mt-8 sm:mt-10 space-y-1">
          <p className="font-serif italic text-sm sm:text-base text-[#D7A3A0] tracking-wide font-medium">
            Saturday, November 28, 2026 · Lahore, Pakistan
          </p>
          <p className="font-serif text-xs sm:text-sm text-[#E7CF9B] font-medium">
            {weddingData.event.hijriDate}
          </p>
        </div>
      </motion.div>
    </section>
  );
}

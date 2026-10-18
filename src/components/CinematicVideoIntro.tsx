"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, SkipForward } from "lucide-react";
import { romanticAudio } from "@/utils/romanticAudio";
import { weddingData } from "@/data/invitationData";

interface CinematicVideoIntroProps {
  onComplete: () => void;
  onStartEmerging?: () => void;
  replayTrigger?: number;
}

export function CinematicVideoIntro({
  onComplete,
  onStartEmerging,
  replayTrigger = 0,
}: CinematicVideoIntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  // Exact timestamp where the card gatefold doors swing open wide (8.15s)
  const CROP_TIMESTAMP = 8.15;

  const triggerTransition = useCallback(() => {
    if (isFadingOut || hasCompleted) return;
    setIsFadingOut(true);

    if (videoRef.current) {
      videoRef.current.pause();
    }

    // Immediately signal that the hero section should emerge from the middle
    if (onStartEmerging) {
      onStartEmerging();
    }

    // Smooth seamless fade out as the hero section expands to fill the section
    setTimeout(() => {
      setHasCompleted(true);
      onComplete();
    }, 600);
  }, [isFadingOut, hasCompleted, onComplete, onStartEmerging]);

  // High-efficiency native timeupdate handler (replaces 60fps requestAnimationFrame polling)
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= CROP_TIMESTAMP) {
      triggerTransition();
    }
  };

  // Attempt autoPlay reliably across mobile & desktop
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [replayTrigger]);

  // Audio atmosphere toggle
  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (romanticAudio) {
      const playing = romanticAudio.toggle();
      setIsAudioActive(playing);
    }
  };

  const [prevReplayTrigger, setPrevReplayTrigger] = useState(replayTrigger);
  if (replayTrigger !== prevReplayTrigger) {
    setPrevReplayTrigger(replayTrigger);
    setIsFadingOut(false);
    setHasCompleted(false);
  }

  // Handle replay request
  useEffect(() => {
    if (replayTrigger > 0) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }
  }, [replayTrigger]);

  if (hasCompleted) {
    return null;
  }

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          key="cinematic-video-intro-overlay"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[100] bg-[#180408] flex items-center justify-center overflow-hidden select-none pointer-events-auto"
        >
          {/* Ambient Warm Velvet Glow Backdrop for Wide Screens (Zero decode overhead) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block bg-[radial-gradient(ellipse_at_center,rgba(114,44,59,0.45)_0%,rgba(36,11,16,0.85)_55%,#140407_100%)] opacity-80"
          />

          {/* Deep Wine & Vignette Gradient Backdrop (positioned behind the video) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#140407] via-transparent to-[#140407]/70 pointer-events-none z-5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,#0d0205_100%)] opacity-60 pointer-events-none z-5" />

          {/* Main Focused Cinematic Video - Native crisp resolution */}
          <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4 z-15">
            <video
              ref={videoRef}
              src="/gemini_generated_video_115e7efe.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              onTimeUpdate={handleTimeUpdate}
              onEnded={triggerTransition}
              className="w-auto h-auto max-w-[94vw] max-h-[84vh] sm:max-w-xl md:max-w-2xl lg:max-w-3xl object-contain mx-auto rounded shadow-2xl"
            />

            {/* Top Brand & Controls Header */}
            <header className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-30 pointer-events-auto">
              <div className="flex items-center gap-2">
                <span className="font-display tracking-[0.3em] text-xs sm:text-sm text-[#F3DFB5] uppercase font-semibold drop-shadow-lg">
                  {weddingData.brand.name}
                </span>
                <span className="text-[#C5A05B]/60 text-xs hidden xs:inline">|</span>
                <span className="font-serif italic text-xs tracking-wider text-[#D7A3A0] hidden xs:inline drop-shadow">
                  {weddingData.brand.collection}
                </span>
              </div>

              {/* Sound & Skip Buttons */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={toggleSound}
                  title={isAudioActive ? "Mute romantic atmosphere" : "Play romantic atmosphere"}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#240B10]/85 backdrop-blur-md border border-[#C5A05B]/50 text-xs text-[#E7CF9B] hover:text-[#FFF4D4] hover:border-[#C5A05B] transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  {isAudioActive ? (
                    <Volume2 className="w-3.5 h-3.5 text-[#E7CF9B] animate-pulse" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5 text-[#D7A3A0]" />
                  )}
                  <span className="font-serif text-[10px] tracking-wider uppercase hidden sm:inline">
                    {isAudioActive ? "Sound On" : "Sound"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={triggerTransition}
                  title="Skip to invitation"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#722C3B]/95 to-[#45151F]/95 hover:from-[#893547] hover:to-[#571b27] border border-[#C5A05B] text-xs text-[#FAF6F0] font-serif tracking-widest uppercase transition-all cursor-pointer shadow-lg active:scale-95 hover:shadow-[0_0_15px_rgba(197,160,91,0.3)]"
                >
                  <SkipForward className="w-3 h-3 text-[#E7CF9B]" />
                  <span className="text-[10px] font-medium tracking-widest">Skip</span>
                </button>
              </div>
            </header>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Sparkles, SkipForward } from "lucide-react";
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
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(false);

  // Exact timestamp where the wax seal splits and doors begin to crack open (8.08s)
  // Stops BEFORE the video's internal white paper appears, allowing the website's
  // royal ivory stationery to emerge directly from within the opening.
  const CROP_TIMESTAMP = 8.08;

  const triggerTransition = useCallback(() => {
    if (isFadingOut || hasCompleted) return;
    setIsFadingOut(true);

    if (videoRef.current) {
      videoRef.current.pause();
    }
    if (bgVideoRef.current) {
      bgVideoRef.current.pause();
    }

    // Immediately signal that the website hero should start emerging from within the opening
    if (onStartEmerging) {
      onStartEmerging();
    }

    // Smooth fade out of the video overlay
    setTimeout(() => {
      setHasCompleted(true);
      onComplete();
    }, 950);
  }, [isFadingOut, hasCompleted, onComplete, onStartEmerging]);

  // High-precision frame check (60fps) to catch the split second before the white page appears
  useEffect(() => {
    if (hasCompleted || isFadingOut) return;

    let animId: number;
    const checkPlaybackTime = () => {
      if (videoRef.current) {
        if (videoRef.current.currentTime >= CROP_TIMESTAMP) {
          triggerTransition();
          return;
        }
      }
      animId = requestAnimationFrame(checkPlaybackTime);
    };

    animId = requestAnimationFrame(checkPlaybackTime);
    return () => cancelAnimationFrame(animId);
  }, [hasCompleted, isFadingOut, triggerTransition]);

  // Attempt autoPlay reliably across mobile & desktop
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    if (bgVideoRef.current) {
      bgVideoRef.current.play().catch(() => {});
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
      if (bgVideoRef.current) {
        bgVideoRef.current.currentTime = 0;
        bgVideoRef.current.play().catch(() => {});
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
          initial={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(8px)",
            transition: { duration: 0.9, ease: [0.25, 1, 0.5, 1] },
          }}
          className="fixed inset-0 z-[100] bg-[#1a060b] flex items-center justify-center overflow-hidden select-none"
        >
          {/* Ambient Blurred Video Background for Wide/Desktop Screens */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
            <video
              ref={bgVideoRef}
              src="/gemini_generated_video_3b2602ea.mp4"
              autoPlay
              muted
              playsInline
              loop
              className="w-full h-full object-cover filter blur-3xl opacity-30 scale-125"
            />
          </div>

          {/* Deep Wine & Vignette Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#140407] via-transparent to-[#140407]/90 pointer-events-none z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#0d0205_100%)] opacity-80 pointer-events-none z-10" />

          {/* Main Focused Cinematic Video */}
          <div className="relative w-full h-full flex items-center justify-center z-15">
            <video
              ref={videoRef}
              src="/gemini_generated_video_3b2602ea.mp4"
              autoPlay
              muted
              playsInline
              onEnded={triggerTransition}
              className="w-full h-full object-cover sm:object-contain sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto shadow-[0_0_80px_rgba(0,0,0,0.8)] filter contrast-[1.05] brightness-[0.98]"
            />

            {/* Top Brand & Controls Header */}
            <header className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-between z-30 pointer-events-auto">
              <div className="flex items-center gap-2">
                <span className="font-display tracking-[0.3em] text-xs sm:text-sm text-[#F3DFB5] uppercase font-semibold drop-shadow-lg">
                  Vowelle
                </span>
                <span className="text-[#C5A05B]/60 text-xs hidden xs:inline">|</span>
                <span className="font-serif italic text-xs tracking-wider text-[#D7A3A0] hidden xs:inline drop-shadow">
                  The Romantic Bloom
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

            {/* Bottom Gentle Opening Cue */}
            <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 text-center pointer-events-none z-30 px-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e070d]/70 backdrop-blur-sm border border-[#C5A05B]/30 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#E7CF9B] animate-pulse" />
                <span className="font-serif italic text-xs sm:text-sm text-[#F3DFB5] tracking-widest drop-shadow-md">
                  Unveiling {weddingData.couple.groom.firstName} &amp; {weddingData.couple.bride.firstName}&apos;s Invitation...
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

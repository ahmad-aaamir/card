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

  // Hand off once the names have finished their final gold shimmer (video is 6.0s).
  // The last frame is the finished card, so we hold it and zoom softly through it.
  const CROP_TIMESTAMP = 5.9;
  // Must match the overlay exit duration below so the hero settles as the video clears.
  const EXIT_MS = 850;

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
    }, EXIT_MS);
  }, [isFadingOut, hasCompleted, onComplete, onStartEmerging]);

  // Frame-accurate hardware-accelerated time check (rVFC) with zero jank
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let callbackId: number | null = null;
    let isActive = true;

    // Use modern requestVideoFrameCallback for exact frame presentation timing
    const checkFrame = (_now: DOMHighResTimeStamp, metadata: { mediaTime: number }) => {
      if (!isActive) return;
      if (metadata.mediaTime >= CROP_TIMESTAMP) {
        triggerTransition();
        return;
      }
      if ("requestVideoFrameCallback" in video) {
        callbackId = (video as unknown as { requestVideoFrameCallback: (cb: typeof checkFrame) => number })
          .requestVideoFrameCallback(checkFrame);
      }
    };

    if ("requestVideoFrameCallback" in video) {
      callbackId = (video as unknown as { requestVideoFrameCallback: (cb: typeof checkFrame) => number })
        .requestVideoFrameCallback(checkFrame);
    }

    return () => {
      isActive = false;
      if (callbackId !== null && "cancelVideoFrameCallback" in video) {
        (video as unknown as { cancelVideoFrameCallback: (id: number) => void }).cancelVideoFrameCallback(callbackId);
      }
    };
  }, [triggerTransition, replayTrigger]);

  // Fallback coarse timeupdate handler for legacy browsers
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= CROP_TIMESTAMP) {
      triggerTransition();
    }
  };

  // Attempt autoPlay reliably across mobile & desktop
  useEffect(() => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
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
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
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
            scale: 1.035,
            transition: { duration: EXIT_MS / 1000, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] bg-[#180408] flex items-center justify-center overflow-hidden select-none pointer-events-auto transform-gpu will-change-[opacity,transform]"
        >
          {/* Ambient Warm Velvet Glow Backdrop for Wide Screens (Zero decode overhead) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block bg-[radial-gradient(ellipse_at_center,rgba(114,44,59,0.45)_0%,rgba(36,11,16,0.85)_55%,#140407_100%)] opacity-80"
          />

          {/* Deep Wine & Vignette Gradient Backdrop (positioned behind the video) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#140407] via-transparent to-[#140407]/70 pointer-events-none z-5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,#0d0205_100%)] opacity-60 pointer-events-none z-5" />

          {/* Main Focused Cinematic Video - Hardware-accelerated lightweight dual-source */}
          <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4 z-15">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              disableRemotePlayback
              onTimeUpdate={handleTimeUpdate}
              onEnded={triggerTransition}
              className="w-auto h-auto max-w-[94vw] max-h-[84vh] sm:max-w-xl md:max-w-2xl lg:max-w-3xl object-contain mx-auto rounded shadow-2xl transform-gpu will-change-transform pointer-events-none"
            >
              <source src="/intro-zonaib-yashal.webm" type="video/webm" />
              <source src="/intro-zonaib-yashal.mp4" type="video/mp4" />
            </video>

            {/* Top Controls Header */}
            <header className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex items-center justify-end z-30 pointer-events-auto">
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

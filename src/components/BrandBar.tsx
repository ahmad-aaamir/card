"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, BookmarkCheck, RotateCcw } from "lucide-react";
import { weddingData } from "@/data/invitationData";
import { romanticAudio } from "@/utils/romanticAudio";

interface BrandBarProps {
  onReplay?: () => void;
  isOpened?: boolean;
}

export function BrandBar({ onReplay, isOpened = false }: BrandBarProps) {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const toggleAudio = () => {
    if (romanticAudio) {
      const playing = romanticAudio.toggle();
      setIsAudioPlaying(playing);
    }
  };

  const scrollToRsvp = () => {
    const el = document.getElementById("rsvp-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1e070d]/90 backdrop-blur-md border-b border-[#C5A05B]/25 text-[#F7F0E7] transition-all">
      <div className="max-w-5xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-2">
          <span className="font-display tracking-[0.28em] text-xs sm:text-sm text-[#E7CF9B] uppercase font-semibold">
            {weddingData.brand.name}
          </span>
          <span className="text-[#C5A05B]/40 text-xs hidden sm:inline">|</span>
          <span className="font-serif italic text-xs tracking-wider text-[#D7A3A0] hidden sm:inline">
            {weddingData.brand.collection}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Replay button when opened */}
          {isOpened && onReplay && (
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReplay}
              title="Replay cinematic envelope opening"
              className="flex items-center gap-1.5 text-[11px] text-[#E7CF9B]/90 hover:text-[#F3DFB5] border border-[#C5A05B]/40 hover:border-[#C5A05B] rounded-full px-3 py-1 transition-all cursor-pointer shadow-sm hover:shadow"
            >
              <RotateCcw className="w-3 h-3 text-[#C5A05B]" />
              <span className="font-serif text-[10px] tracking-wider uppercase hidden xs:inline font-medium">
                Replay
              </span>
            </motion.button>
          )}

          {/* Atmosphere Audio Toggle */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={toggleAudio}
            title={isAudioPlaying ? "Mute romantic atmosphere" : "Play romantic atmosphere"}
            className={`flex items-center gap-1.5 text-xs border rounded-full px-3 py-1 transition-all cursor-pointer ${
              isAudioPlaying
                ? "text-[#F3DFB5] border-[#C5A05B] bg-[#C5A05B]/20 shadow-sm"
                : "text-[#E7CF9B]/85 hover:text-[#E7CF9B] border-[#C5A05B]/35 hover:border-[#C5A05B]"
            }`}
          >
            {isAudioPlaying ? (
              <Volume2 className="w-3.5 h-3.5 text-[#E7CF9B] animate-pulse" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#D7A3A0]" />
            )}
            <span className="text-[10px] tracking-widest uppercase hidden md:inline font-medium">
              {isAudioPlaying ? "Atmosphere On" : "Atmosphere"}
            </span>
          </motion.button>

          {/* RSVP Direct Anchor */}
          <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToRsvp}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#722C3B] to-[#45151F] hover:from-[#893547] hover:to-[#571b27] text-[#FAF6F0] border border-[#C5A05B] text-xs font-serif tracking-widest px-3.5 py-1 rounded-full shadow-md hover:shadow-[0_2px_12px_rgba(114,44,59,0.4)] transition-all cursor-pointer"
          >
            <BookmarkCheck className="w-3.5 h-3.5 text-[#E7CF9B]" />
            <span className="text-[11px] uppercase tracking-wider font-medium">RSVP</span>
          </motion.button>
        </div>
      </div>
    </header>
  );
}

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BrandBar } from "@/components/BrandBar";
import { InvitationCover, AnimationState } from "@/components/InvitationCover";
import { InnerInvitation } from "@/components/InnerInvitation";
import { CountdownSection } from "@/components/CountdownSection";
import { EventSchedule } from "@/components/EventSchedule";
import { VenueSection } from "@/components/VenueSection";
import { RsvpSection } from "@/components/RsvpSection";
import { ClosingSection } from "@/components/ClosingSection";
import { CinematicVideoIntro } from "@/components/CinematicVideoIntro";

export default function Home() {
  const [animState, setAnimState] = useState<AnimationState>("complete");
  const [isIntroActive, setIsIntroActive] = useState(true);
  const [isEmerging, setIsEmerging] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  const handleStartEmerging = () => {
    setIsEmerging(true);
  };

  const handleVideoIntroComplete = () => {
    setIsIntroActive(false);
    setIsEmerging(true);
    setAnimState("complete");
  };

  const handleReplayIntro = () => {
    setIsIntroActive(true);
    setIsEmerging(false);
    setAnimState("complete");
    setReplayKey((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen bg-[#180408] text-[#45151F] overflow-x-hidden">
      {/* 
        Intro Animation: Fullscreen Cinematic Video
        Autoplays and crops at 8.08s before the white page appears.
        As the wax seal splits, onStartEmerging triggers the website hero 
        to rise directly from within the opening, expanding to cover the whole screen.
      */}
      <CinematicVideoIntro
        key={replayKey}
        replayTrigger={replayKey}
        onStartEmerging={handleStartEmerging}
        onComplete={handleVideoIntroComplete}
      />

      {/* Top Luxury Header with Atmosphere Toggle & Replay Control */}
      <BrandBar
        isOpened={!isIntroActive}
        onReplay={handleReplayIntro}
      />

      {/* 
        Hero Section + Entire Invitation Suite
        Emerges smoothly from within the video's envelope opening and expands to cover the screen
      */}
      <div className="relative w-full">
        <InvitationCover
          key={`cover-${replayKey}`}
          initialState="complete"
          isEmerging={isEmerging}
          onStateChange={setAnimState}
          onReplayRequest={handleReplayIntro}
        />

        {/* Complete Vertically Scrolling Invitation Sections */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isEmerging || !isIntroActive ? 1 : 0 }}
          transition={{ duration: 1.0, delay: 0.4 }}
        >
          <InnerInvitation />
          <CountdownSection />
          <EventSchedule />
          <VenueSection />
          <RsvpSection />
          <ClosingSection />
        </motion.div>
      </div>
    </main>
  );
}

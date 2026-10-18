"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";
import { weddingData } from "@/data/invitationData";
import { CornerFiligree, OrnamentalDivider } from "./OrnamentalDivider";

export function InnerInvitation() {

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `${weddingData.couple.groom.firstName} & ${weddingData.couple.bride.firstName}'s Nikkah & Wedding`
  )}&dates=20261128T133000Z/20261128T190000Z&details=${encodeURIComponent(
    weddingData.event.invitationMessage
  )}&location=${encodeURIComponent(
    `${weddingData.venue.name}, ${weddingData.venue.hall}, ${weddingData.venue.address}, ${weddingData.venue.cityStateZip}`
  )}`;

  return (
    <section
      id="inner-invitation"
      className="relative pt-3 sm:pt-6 pb-12 sm:pb-20 px-3.5 sm:px-4 bg-[#1e060c]/85 flex justify-center overflow-hidden"
    >
      {/* Decorative background light warmth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(114,44,59,0.3)_0%,transparent_70%)] pointer-events-none" />

      {/* Luxury Warm Ivory Paper Card */}
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="paper-card paper-deckled rounded-sm p-6 sm:p-12 md:p-14 text-[#45151F] border border-[#C5A05B]/40 relative overflow-hidden shadow-2xl"
        >
          {/* Thin gold hairline inner borders */}
          <div className="absolute inset-2.5 sm:inset-5 border border-[#C5A05B]/40 pointer-events-none" />
          <div className="absolute inset-3.5 sm:inset-6 border border-[#C5A05B]/20 border-dashed pointer-events-none" />

          {/* Delicate corner filigrees in warm antique gold */}
          <CornerFiligree position="top-left" className="top-3 left-3 sm:top-5 sm:left-5 text-[#C5A05B]" />
          <CornerFiligree position="top-right" className="top-3 right-3 sm:top-5 sm:right-5 text-[#C5A05B]" />
          <CornerFiligree position="bottom-left" className="bottom-3 left-3 sm:bottom-5 sm:left-5 text-[#C5A05B]" />
          <CornerFiligree position="bottom-right" className="bottom-3 right-3 sm:bottom-5 sm:right-5 text-[#C5A05B]" />

          {/* Inner Content */}
          <div className="relative z-10 flex flex-col items-center text-center">
            
            {/* Bismillah Calligraphy (Large & Legible) */}
            <motion.p
              dir="rtl"
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="font-arabic text-2xl sm:text-3xl md:text-4xl text-[#722C3B] font-bold leading-relaxed mb-2"
            >
              {weddingData.islamicHeading.bismillahArabic}
            </motion.p>

            {/* Quranic Verse */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-lg mx-auto my-3 px-4 py-4 rounded bg-[#FAF7F2]/90 border border-[#C5A05B]/35 shadow-sm"
            >
              <p
                dir="rtl"
                className="font-arabic text-lg sm:text-xl md:text-2xl text-[#722C3B] leading-relaxed mb-2 font-medium"
              >
                {weddingData.islamicHeading.quranicVerseArabic}
              </p>
              <p className="font-serif italic text-sm sm:text-base text-[#45151F] leading-relaxed font-medium">
                {weddingData.islamicHeading.quranicVerseTranslation}
              </p>
              <span className="font-display tracking-widest text-[11px] sm:text-xs text-[#C5A05B] uppercase block mt-1.5 font-bold">
                {weddingData.islamicHeading.quranicReference}
              </span>
            </motion.div>

            <OrnamentalDivider variant="botanical" className="my-3 sm:my-4" />

            {/* Parents blurb */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="font-serif uppercase tracking-[0.16em] sm:tracking-[0.2em] text-xs sm:text-sm md:text-base text-[#722C3B] font-bold max-w-md leading-relaxed mb-4"
            >
              {weddingData.event.parentsBlurb}
            </motion.p>

            {/* Couple Full Names & Parentage in Luxury Calligraphy & Serif */}
            <div className="my-2 space-y-4 w-full">
              {/* Groom */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <h2 className="font-script text-5xl sm:text-6xl md:text-7xl text-[#45151F] tracking-wide leading-none font-normal drop-shadow-sm">
                  {weddingData.couple.groom.fullName}
                </h2>
                <p className="font-serif italic text-sm sm:text-base text-[#722C3B] mt-1.5 font-medium">
                  ({weddingData.couple.groom.parents})
                </p>
              </motion.div>

              {/* Connecting Ampersand / "Weds" */}
              <div className="flex items-center justify-center gap-3 my-1">
                <div className="h-[1px] w-8 sm:w-14 bg-[#C5A05B]/50" />
                <span className="font-display uppercase tracking-widest text-xs sm:text-sm text-[#C5A05B] font-bold">
                  Weds
                </span>
                <div className="h-[1px] w-8 sm:w-14 bg-[#C5A05B]/50" />
              </div>

              {/* Bride */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <h2 className="font-script text-5xl sm:text-6xl md:text-7xl text-[#45151F] tracking-wide leading-none font-normal drop-shadow-sm">
                  {weddingData.couple.bride.fullName}
                </h2>
                <p className="font-serif italic text-sm sm:text-base text-[#722C3B] mt-1.5 font-medium">
                  ({weddingData.couple.bride.parents})
                </p>
              </motion.div>
            </div>

            {/* Romantic divider */}
            <OrnamentalDivider variant="crest" className="my-4 sm:my-5" />

            {/* Formal Invitation Message */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="font-serif text-sm sm:text-base md:text-lg text-[#45151F] max-w-lg leading-relaxed mb-6 font-medium"
            >
              {weddingData.event.invitationMessage}
            </motion.p>

            {/* Formal Date & Time Block */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="w-full max-w-lg py-4 sm:py-5 px-4 sm:px-6 border border-[#C5A05B]/40 bg-[#FAF7F2]/80 rounded-sm mb-6 space-y-3 shadow-sm"
            >
              <div className="flex items-center justify-center gap-2 text-[#722C3B]">
                <Calendar className="w-4 h-4 text-[#C5A05B] shrink-0" />
                <div className="text-center">
                  <p className="font-serif text-base sm:text-lg font-bold tracking-wide">
                    {weddingData.event.formalDate}
                  </p>
                  <p className="font-serif italic text-xs sm:text-sm text-[#C5A05B] font-medium">
                    {weddingData.event.hijriDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-[#45151F]">
                <Clock className="w-4 h-4 text-[#C5A05B] shrink-0" />
                <p className="font-serif text-sm sm:text-base font-medium">
                  Reception at {weddingData.event.time}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-[#45151F] pt-2 border-t border-[#C5A05B]/20">
                <MapPin className="w-4 h-4 text-[#C5A05B] shrink-0" />
                <p className="font-serif text-xs sm:text-sm tracking-wide uppercase text-center font-semibold">
                  {weddingData.venue.hall} · {weddingData.venue.name}
                </p>
              </div>
            </motion.div>

            {/* Attire note */}
            <div className="mb-6">
              <span className="font-display tracking-[0.2em] text-xs sm:text-sm text-[#722C3B] uppercase font-bold block mb-1">
                Dress Code
              </span>
              <p className="font-serif italic text-sm sm:text-base text-[#45151F] font-medium">
                {weddingData.event.attire}
              </p>
            </div>

            {/* Add to Calendar Action */}
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full border border-[#C5A05B] bg-[#FFFDF9] text-[#45151F] hover:bg-[#FAF3E8] hover:border-[#8C6B2B] transition-all font-serif text-xs sm:text-sm tracking-widest uppercase cursor-pointer shadow-sm hover:shadow font-semibold"
            >
              <Calendar className="w-4 h-4 text-[#C5A05B]" />
              <span>Add to Calendar</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

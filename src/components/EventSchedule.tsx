"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Coffee, HeartHandshake, Utensils, Heart, Sparkles, MapPin } from "lucide-react";
import { weddingData } from "@/data/invitationData";
import { CornerFiligree, OrnamentalDivider } from "./OrnamentalDivider";

export function EventSchedule() {
  const shouldReduceMotion = useReducedMotion();

  const getScheduleIcon = (iconName: string) => {
    switch (iconName) {
      case "nikkah":
        return <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A05B]" />;
      case "welcome":
        return <Coffee className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A05B]" />;
      case "feast":
        return <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A05B]" />;
      case "rukhsati":
        return <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A05B]" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C5A05B]" />;
    }
  };

  return (
    <section className="relative py-12 sm:py-20 px-3.5 sm:px-4 bg-[#20080E]/50 backdrop-blur-[1px] flex justify-center overflow-hidden content-auto">
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="paper-card paper-deckled rounded-sm p-6 sm:p-12 md:p-14 text-[#45151F] border border-[#C5A05B]/35 relative overflow-hidden shadow-2xl"
        >
          {/* Inner hairline border */}
          <div className="absolute inset-2.5 sm:inset-5 border border-[#C5A05B]/35 pointer-events-none" />
          <div className="absolute inset-3.5 sm:inset-6 border border-[#C5A05B]/20 border-dashed pointer-events-none" />

          {/* Antique gold corner filigrees */}
          <CornerFiligree position="top-left" className="top-3 left-3 sm:top-5 sm:left-5 text-[#C5A05B]" />
          <CornerFiligree position="top-right" className="top-3 right-3 sm:top-5 sm:right-5 text-[#C5A05B]" />
          <CornerFiligree position="bottom-left" className="bottom-3 left-3 sm:bottom-5 sm:left-5 text-[#C5A05B]" />
          <CornerFiligree position="bottom-right" className="bottom-3 right-3 sm:bottom-5 sm:right-5 text-[#C5A05B]" />

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-10">
              <span className="font-display tracking-[0.28em] text-xs sm:text-sm text-[#722C3B] uppercase font-bold block mb-1">
                Order of Celebrations
              </span>
              <h3 className="font-serif italic text-2xl sm:text-4xl text-[#45151F]">
                The Wedding Program
              </h3>
              <OrnamentalDivider variant="botanical" className="mt-3 sm:mt-4" />
            </div>

            {/* Timeline Container */}
            <div className="relative ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8 sm:space-y-10 my-6 sm:my-8">
              {/* Animated Vertical Line */}
              <motion.div
                initial={shouldReduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "top" }}
                className="absolute left-0 top-2 bottom-2 w-[1px] bg-gradient-to-b from-[#C5A05B] via-[#C5A05B]/60 to-[#C5A05B]/20 will-change-transform"
              />

              {weddingData.schedule.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: idx * 0.14, duration: 0.75, ease: "easeOut" }}
                  className="relative group"
                >
                  {/* Timeline node icon */}
                  <div className="absolute -left-[37px] sm:-left-[49px] top-0.5 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#FAF7F2] border border-[#C5A05B] flex items-center justify-center shadow-md group-hover:scale-110 group-hover:border-[#8C6B2B] group-hover:shadow-[0_0_12px_rgba(197,160,91,0.4)] transition-all duration-300">
                    {getScheduleIcon(item.icon)}
                  </div>

                  {/* Timeline content */}
                  <div>
                    <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
                      <span className="font-display text-sm sm:text-base font-bold tracking-wider text-[#722C3B]">
                        {item.time}
                      </span>
                      <span className="text-[#C5A05B] text-xs">·</span>
                      <h4 className="font-serif text-lg sm:text-2xl text-[#45151F] font-bold tracking-wide">
                        {item.title}
                      </h4>
                    </div>

                    <p className="font-serif text-sm sm:text-base text-[#45151F]/90 leading-relaxed mb-2 font-medium">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#722C3B] font-serif font-medium italic">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A05B] shrink-0" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Halal & Attire Note Box */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-8 p-4 sm:p-5 rounded-sm bg-[#FAF7F2]/90 border border-[#C5A05B]/35 text-center space-y-1.5 shadow-sm"
            >
              <span className="font-display uppercase tracking-[0.2em] text-xs sm:text-sm text-[#722C3B] font-bold block">
                Hospitality &amp; Traditional Etiquette
              </span>
              <p className="font-serif italic text-sm sm:text-base text-[#45151F] leading-relaxed">
                All food served is 100% certified Halal gourmet cuisine. Separate dining &amp; seating arrangements are also accommodated upon request.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

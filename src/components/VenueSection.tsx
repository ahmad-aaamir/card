"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Car, Compass, Map as MapIcon, Image as ImageIcon, ExternalLink } from "lucide-react";
import { weddingData } from "@/data/invitationData";
import { OrnamentalDivider } from "./OrnamentalDivider";

export function VenueSection() {
  const [activeTab, setActiveTab] = useState<"photo" | "map">("map");

  return (
    <section className="relative py-14 sm:py-24 px-3.5 sm:px-4 bg-[#240B10] text-[#FAF6F0] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(114,44,59,0.3)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="font-display tracking-[0.28em] text-[10px] sm:text-xs text-[#E7CF9B] uppercase font-medium block mb-1">
            The Grand Destination
          </span>
          <h3 className="font-serif italic text-2xl sm:text-4xl text-[#FAF7F2]">
            The Venue &amp; Marquee Location
          </h3>
          <OrnamentalDivider variant="diamond" className="mt-3 sm:mt-4" />
        </div>

        {/* Tab Selector: Switch Between Venue Photography & Interactive Google Map with sliding pill */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            type="button"
            onClick={() => setActiveTab("map")}
            className="relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-serif tracking-wider uppercase transition-all cursor-pointer border border-[#C5A05B]/30 hover:border-[#C5A05B]"
          >
            {activeTab === "map" && (
              <motion.div
                layoutId="venueActiveTab"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="absolute inset-0 bg-[#722C3B] rounded-full border border-[#C5A05B] shadow-sm -z-1"
              />
            )}
            <MapIcon className="w-3.5 h-3.5 text-[#E7CF9B]" />
            <span className={activeTab === "map" ? "text-[#F3DFB5]" : "text-[#FAF6F0]/70"}>
              Interactive Map
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("photo")}
            className="relative flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-serif tracking-wider uppercase transition-all cursor-pointer border border-[#C5A05B]/30 hover:border-[#C5A05B]"
          >
            {activeTab === "photo" && (
              <motion.div
                layoutId="venueActiveTab"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="absolute inset-0 bg-[#722C3B] rounded-full border border-[#C5A05B] shadow-sm -z-1"
              />
            )}
            <ImageIcon className="w-3.5 h-3.5 text-[#E7CF9B]" />
            <span className={activeTab === "photo" ? "text-[#F3DFB5]" : "text-[#FAF6F0]/70"}>
              Banquet Photography
            </span>
          </button>
        </div>

        {/* Venue Frame: Interactive Google Map or Photographic Display */}
        <div className="relative rounded-sm overflow-hidden border border-[#C5A05B]/40 shadow-2xl bg-[#360f18] group">
          
          {/* Main Visual Display (Photo or Google Map Embed) */}
          <div className="relative w-full h-72 sm:h-96 md:h-[440px] overflow-hidden bg-[#1c080d]">
            <AnimatePresence mode="wait">
              {activeTab === "photo" ? (
                /* Photo View */
                <motion.div
                  key="photo-view"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={weddingData.venue.image}
                    alt={weddingData.venue.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-cover object-center filter brightness-[0.92] contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#240B10] via-transparent to-black/30 pointer-events-none" />
                </motion.div>
              ) : (
                /* Embedded Interactive Google Maps View */
                <motion.div
                  key="map-view"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <iframe
                    title="Marquee Location - The Nishat Hotel, Gulberg Lahore"
                    src={weddingData.venue.embedMapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full filter contrast-[1.05] opacity-95"
                  />
                  <div className="absolute inset-0 border border-[#C5A05B]/30 pointer-events-none" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Corner ornamental accents */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 border-t-2 border-l-2 border-[#C5A05B]/70 w-6 h-6 sm:w-8 sm:h-8 pointer-events-none" />
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 border-t-2 border-r-2 border-[#C5A05B]/70 w-6 h-6 sm:w-8 sm:h-8 pointer-events-none" />
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 border-b-2 border-l-2 border-[#C5A05B]/70 w-6 h-6 sm:w-8 sm:h-8 pointer-events-none" />
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 border-b-2 border-r-2 border-[#C5A05B]/70 w-6 h-6 sm:w-8 sm:h-8 pointer-events-none" />

            {/* In-view Location Badge */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-[#240B10]/90 backdrop-blur-sm border border-[#C5A05B]/50 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full flex items-center gap-1.5 sm:gap-2 shadow-md">
              <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E7CF9B]" />
              <span className="font-display text-[10px] sm:text-[11px] uppercase tracking-widest text-[#F3DFB5]">
                Gulberg III · Lahore
              </span>
            </div>
          </div>

          {/* Details Bar Below Visual */}
          <div className="p-5 sm:p-8 md:p-10 bg-gradient-to-b from-[#2e0e15] to-[#240B10] border-t border-[#C5A05B]/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
              
              {/* Estate Names & Address */}
              <div>
                <span className="font-serif italic text-xs sm:text-sm text-[#D7A3A0] block mb-1">
                  {weddingData.venue.hall}
                </span>
                <h4 className="font-serif text-xl sm:text-3xl text-[#F3DFB5] font-normal mb-2.5">
                  {weddingData.venue.name}
                </h4>
                <div className="flex items-start gap-2 text-xs sm:text-sm text-[#F7F0E7]/85 font-serif leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#C5A05B] mt-0.5 shrink-0" />
                  <div>
                    <p>{weddingData.venue.address}</p>
                    <p>{weddingData.venue.cityStateZip}, {weddingData.venue.country}</p>
                  </div>
                </div>
              </div>

              {/* Valet Note & Action Buttons */}
              <div className="space-y-4 md:border-l md:border-[#C5A05B]/20 md:pl-8">
                <div className="flex items-start gap-2 text-xs sm:text-sm text-[#D7A3A0]/90 font-serif italic">
                  <Car className="w-4 h-4 text-[#C5A05B] mt-0.5 shrink-0" />
                  <p>{weddingData.venue.valetNote}</p>
                </div>

                <div className="flex flex-wrap gap-2.5 pt-1">
                  {/* Open in Google Maps */}
                  <motion.a
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    href={weddingData.venue.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#722C3B] to-[#45151F] hover:from-[#893547] hover:to-[#571b27] border border-[#C5A05B] text-[#FAF6F0] font-serif text-[11px] sm:text-xs uppercase tracking-[0.18em] transition-all shadow-md group cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#E7CF9B] group-hover:rotate-12 transition-transform" />
                    <span>Get Directions</span>
                  </motion.a>

                  {/* Open Direct Map in New Tab */}
                  <motion.a
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    href="https://maps.google.com/?q=The+Nishat+Hotel+Gulberg+Lahore"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-[#C5A05B]/40 hover:border-[#C5A05B] text-[#E7CF9B]/90 hover:text-[#F3DFB5] font-serif text-[11px] tracking-wider uppercase transition-all"
                  >
                    <ExternalLink className="w-3 h-3 text-[#C5A05B]" />
                    <span>Open in Maps App</span>
                  </motion.a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

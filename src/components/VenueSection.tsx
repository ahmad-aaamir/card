"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation, Car, Compass, Map as MapIcon, Image as ImageIcon, ExternalLink } from "lucide-react";
import { weddingData } from "@/data/invitationData";
import { CornerFiligree, OrnamentalDivider } from "./OrnamentalDivider";

export function VenueSection() {
  const [activeTab, setActiveTab] = useState<"photo" | "map">("map");
  const [isMapInteractive, setIsMapInteractive] = useState(false);

  return (
    <section className="relative py-12 sm:py-20 px-3.5 sm:px-4 bg-[#1b050a]/85 text-[#FAF6F0] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(114,44,59,0.3)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl mx-auto"
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

        {/* 
          FLORAL BOUNDARY CONTAINER:
          Custom luxury boundary frame housing the map/photo with blush & wine flowers in sync with website 
        */}
        <div className="relative my-4 sm:my-6">
          
          {/* 1. Top-Right Opulent Blush Peony & Foliage Garland (in sync with invitation cover) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute -top-7 -right-5 xs:-top-9 xs:-right-7 sm:-top-12 sm:-right-10 md:-top-14 md:-right-12 w-28 h-28 xs:w-32 xs:h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 pointer-events-none z-30 drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] filter contrast-[1.08]"
          >
            <Image
              src="/images/floral-corner-garland.png"
              alt="Blush peonies and golden foliage garland"
              fill
              loading="lazy"
              sizes="(max-width: 640px) 128px, (max-width: 768px) 176px, 208px"
              className="object-contain"
            />
          </motion.div>

          {/* 2. Bottom-Left Velvet Wine Rose & Gold Foliage Cluster (in sync with website footer and cover) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.15, ease: "easeOut" }}
            className="absolute -bottom-7 -left-5 xs:-bottom-9 xs:-left-7 sm:-bottom-12 sm:-left-10 md:-bottom-14 md:-left-12 w-28 h-28 xs:w-32 xs:h-32 sm:w-44 sm:h-44 md:w-52 md:h-52 pointer-events-none z-30 drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)] filter contrast-[1.08]"
          >
            <Image
              src="/images/floral-lower-cluster.png"
              alt="Velvet wine roses and golden foliage cluster"
              fill
              loading="lazy"
              sizes="(max-width: 640px) 128px, (max-width: 768px) 176px, 208px"
              className="object-contain"
            />
          </motion.div>

          {/* 3. The Grand Boundary Box / Matting Frame */}
          <div className="relative rounded-2xl sm:rounded-3xl p-2.5 xs:p-3 sm:p-5 md:p-6 bg-gradient-to-b from-[#2d0a13] via-[#1e050b] to-[#150307] border border-[#C5A05B]/50 shadow-[0_20px_50px_rgba(0,0,0,0.75)] overflow-hidden">
            
            {/* Inner Dual Gold Hairline Borders */}
            <div className="absolute inset-1.5 xs:inset-2 sm:inset-3 border border-[#C5A05B]/35 rounded-xl sm:rounded-2xl pointer-events-none" />
            <div className="absolute inset-2.5 xs:inset-3 sm:inset-4.5 border border-[#C5A05B]/20 border-dashed rounded-lg sm:rounded-xl pointer-events-none" />

            {/* Top Center Botanical Crest Plaque */}
            <div className="relative flex items-center justify-center gap-2 mb-2.5 sm:mb-3 pt-1">
              <div className="h-[1px] w-8 xs:w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#C5A05B]/60" />
              <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#360d17]/80 border border-[#C5A05B]/40 shadow-sm">
                <span className="text-[#E7CF9B] text-[11px] sm:text-xs">❦</span>
                <span className="font-display tracking-[0.2em] uppercase text-[9px] sm:text-[10px] text-[#F3DFB5] font-semibold">
                  Imperial Marquee · Location
                </span>
                <span className="text-[#E7CF9B] text-[11px] sm:text-xs">❦</span>
              </div>
              <div className="h-[1px] w-8 xs:w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#C5A05B]/60" />
            </div>

            {/* 
              THE MAP & PHOTO DISPLAY WINDOW:
              Significantly reduced on mobile (h-[185px] vs previous h-72 / 288px) to prevent screen takeover,
              with responsive heights h-[185px] xs:h-[210px] sm:h-[280px] md:h-[350px]
            */}
            <div className="relative w-full h-[185px] xs:h-[210px] sm:h-[280px] md:h-[350px] rounded-lg sm:rounded-xl overflow-hidden border border-[#C5A05B]/40 bg-[#140306] shadow-inner">
              
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
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 768px"
                      className="object-cover object-center filter brightness-[0.92] contrast-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#240B10]/80 via-transparent to-black/30 pointer-events-none" />
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
                    onClick={() => setIsMapInteractive(true)}
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
                      className={`w-full h-full filter contrast-[1.05] opacity-95 transition-all ${
                        isMapInteractive ? "pointer-events-auto" : "pointer-events-none sm:pointer-events-auto"
                      }`}
                    />

                    {/* Mobile Tap-To-Interact Protection Overlay (Prevents scroll lock while swiping) */}
                    {!isMapInteractive && (
                      <div className="sm:hidden absolute inset-0 bg-black/15 flex items-center justify-center cursor-pointer transition-opacity">
                        <span className="bg-[#240B10]/90 backdrop-blur-md border border-[#C5A05B]/70 text-[#F3DFB5] px-3.5 py-1.5 rounded-full text-[10px] font-serif uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                          <Compass className="w-3 h-3 text-[#E7CF9B]" />
                          Tap to explore map
                        </span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Corner Filigrees framing the map viewport */}
              <CornerFiligree position="top-left" className="top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 text-[#C5A05B]/80" />
              <CornerFiligree position="top-right" className="top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 text-[#C5A05B]/80" />
              <CornerFiligree position="bottom-left" className="bottom-1.5 left-1.5 sm:bottom-2.5 sm:left-2.5 text-[#C5A05B]/80" />
              <CornerFiligree position="bottom-right" className="bottom-1.5 right-1.5 sm:bottom-2.5 sm:right-2.5 text-[#C5A05B]/80" />

              {/* In-view Location Badge */}
              <div className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 bg-[#240B10]/90 backdrop-blur-sm border border-[#C5A05B]/50 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full flex items-center gap-1.5 shadow-md z-10 pointer-events-none">
                <Compass className="w-3 h-3 text-[#E7CF9B]" />
                <span className="font-display text-[9px] sm:text-[10px] uppercase tracking-widest text-[#F3DFB5]">
                  Gulberg III · Lahore
                </span>
              </div>
            </div>

            {/* Bottom Floral & Filigree Accent */}
            <div className="mt-2.5 sm:mt-3 flex items-center justify-center gap-2">
              <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-[#C5A05B]/40" />
              <div className="w-1.5 h-1.5 rotate-45 border border-[#C5A05B] bg-[#C5A05B]/40" />
              <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-[#C5A05B]/40" />
            </div>

          </div>
        </div>

        {/* Details Card Below the Floral Boundary Container */}
        <div className="relative mt-4 sm:mt-6 rounded-xl sm:rounded-2xl p-4 sm:p-7 md:p-8 bg-gradient-to-b from-[#2d0d15] to-[#20070e] border border-[#C5A05B]/40 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 items-center">
            
            {/* Estate Names & Address */}
            <div>
              <span className="font-serif italic text-xs sm:text-sm text-[#D7A3A0] block mb-1">
                {weddingData.venue.hall}
              </span>
              <h4 className="font-serif text-lg sm:text-2xl text-[#F3DFB5] font-normal mb-2">
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
            <div className="space-y-3.5 md:border-l md:border-[#C5A05B]/20 md:pl-7">
              <div className="flex items-start gap-2 text-xs sm:text-sm text-[#D7A3A0]/90 font-serif italic">
                <Car className="w-4 h-4 text-[#C5A05B] mt-0.5 shrink-0" />
                <p>{weddingData.venue.valetNote}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                {/* Open in Google Maps */}
                <motion.a
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
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
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
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
      </motion.div>
    </section>
  );
}


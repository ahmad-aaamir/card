"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Heart, Send, Phone, User, Users, MessageSquare } from "lucide-react";
import { weddingData } from "@/data/invitationData";
import { CornerFiligree, OrnamentalDivider } from "./OrnamentalDivider";

export function RsvpSection() {
  const [attendance, setAttendance] = useState<"attending" | "declining">("attending");
  const [guestName, setGuestName] = useState("");
  const [phone, setPhone] = useState("");
  const [guestCount, setGuestCount] = useState("2");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;
    setSubmitted(true);
  };

  return (
    <section
      id="rsvp-section"
      className="relative py-12 sm:py-20 px-3.5 sm:px-4 bg-[#260B12]/50 backdrop-blur-[1px] flex justify-center overflow-hidden"
    >
      {/* Background soft glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(114,44,59,0.3)_0%,transparent_70%)] pointer-events-none" />

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

          {/* Corner filigrees */}
          <CornerFiligree position="top-left" className="top-3 left-3 sm:top-5 sm:left-5 text-[#C5A05B]" />
          <CornerFiligree position="top-right" className="top-3 right-3 sm:top-5 sm:right-5 text-[#C5A05B]" />
          <CornerFiligree position="bottom-left" className="bottom-3 left-3 sm:bottom-5 sm:left-5 text-[#C5A05B]" />
          <CornerFiligree position="bottom-right" className="bottom-3 right-3 sm:bottom-5 sm:right-5 text-[#C5A05B]" />

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <span className="font-display tracking-[0.28em] text-[10px] sm:text-xs text-[#722C3B] uppercase font-semibold block mb-1">
                R. S. V. P.
              </span>
              <h3 className="font-serif italic text-2xl sm:text-4xl text-[#45151F]">
                Kindly Grace Us With Your Reply
              </h3>
              <p className="font-serif italic text-xs sm:text-sm text-[#722C3B]/90 mt-1.5">
                Please confirm your attendance by {weddingData.rsvpDeadline}
              </p>
              <OrnamentalDivider variant="botanical" className="mt-3 sm:mt-4" />
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                /* Success / Thank You State with celebratory bloom */
                <motion.div
                  key="success"
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="py-8 sm:py-12 text-center space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14, delay: 0.1 }}
                    className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#FAF7F2] to-[#F0E6D8] border-2 border-[#C5A05B] flex items-center justify-center text-[#722C3B] shadow-md"
                  >
                    <Heart className="w-7 h-7 text-[#C5A05B] fill-[#C5A05B]/30 animate-pulse" />
                  </motion.div>
                  <h4 className="font-serif text-2xl sm:text-3xl text-[#45151F]">
                    JazakAllah Khair, {guestName.split(" ")[0]}!
                  </h4>
                  <p className="font-serif italic text-xs sm:text-base text-[#45151F]/85 max-w-md mx-auto leading-relaxed">
                    {attendance === "attending"
                      ? "Your RSVP has been warmly recorded. The Mahmood & Ahmed families look forward to welcoming you with great joy and affection in Lahore."
                      : "We deeply appreciate your kind message and warm wishes. You will remain in our heartfelt Duas."}
                  </p>
                  <div className="pt-3">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="font-serif text-xs text-[#722C3B] hover:text-[#45151F] underline underline-offset-4 tracking-wider uppercase cursor-pointer"
                    >
                      Update Response
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* RSVP Form */
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5"
                >
                  {/* Attendance Choice with Sliding Animated Pill */}
                  <div className="grid grid-cols-2 gap-2 p-1.5 rounded-full bg-[#FAF7F2] border border-[#C5A05B]/30 max-w-md mx-auto shadow-inner">
                    <button
                      type="button"
                      onClick={() => setAttendance("attending")}
                      className="relative py-2 px-3 rounded-full text-xs font-serif tracking-wider uppercase transition-all cursor-pointer font-medium"
                    >
                      {attendance === "attending" && (
                        <motion.div
                          layoutId="rsvpChoice"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          className="absolute inset-0 bg-gradient-to-r from-[#722C3B] to-[#45151F] rounded-full shadow-md -z-1"
                        />
                      )}
                      <span className={attendance === "attending" ? "text-[#FAF6F0]" : "text-[#722C3B]"}>
                        Joyfully Accepts
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttendance("declining")}
                      className="relative py-2 px-3 rounded-full text-xs font-serif tracking-wider uppercase transition-all cursor-pointer font-medium"
                    >
                      {attendance === "declining" && (
                        <motion.div
                          layoutId="rsvpChoice"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          className="absolute inset-0 bg-gradient-to-r from-[#722C3B] to-[#45151F] rounded-full shadow-md -z-1"
                        />
                      )}
                      <span className={attendance === "declining" ? "text-[#FAF6F0]" : "text-[#722C3B]"}>
                        Regretfully Declines
                      </span>
                    </button>
                  </div>

                  {/* Guest Name */}
                  <div className="space-y-1">
                    <label className="flex items-center gap-1.5 font-display text-[11px] sm:text-xs text-[#722C3B] uppercase tracking-wider font-semibold">
                      <User className="w-3.5 h-3.5 text-[#C5A05B]" />
                      <span>Full Name</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mr. & Mrs. Tariq Mahmood"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-sm bg-[#FAF7F2] border border-[#C5A05B]/40 text-[#45151F] placeholder-[#45151F]/40 font-serif text-sm focus:outline-none focus:border-[#C5A05B] focus:ring-1 focus:ring-[#C5A05B]/50 transition-all shadow-inner"
                    />
                  </div>

                  {/* Phone & Guest Count */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="flex items-center gap-1.5 font-display text-[11px] sm:text-xs text-[#722C3B] uppercase tracking-wider font-semibold">
                        <Phone className="w-3.5 h-3.5 text-[#C5A05B]" />
                        <span>Contact Number</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+92 300 1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-sm bg-[#FAF7F2] border border-[#C5A05B]/40 text-[#45151F] placeholder-[#45151F]/40 font-serif text-sm focus:outline-none focus:border-[#C5A05B] focus:ring-1 focus:ring-[#C5A05B]/50 transition-all shadow-inner"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="flex items-center gap-1.5 font-display text-[11px] sm:text-xs text-[#722C3B] uppercase tracking-wider font-semibold">
                        <Users className="w-3.5 h-3.5 text-[#C5A05B]" />
                        <span>Number of Guests</span>
                      </label>
                      <select
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        disabled={attendance === "declining"}
                        className="w-full px-4 py-2.5 rounded-sm bg-[#FAF7F2] border border-[#C5A05B]/40 text-[#45151F] font-serif text-sm focus:outline-none focus:border-[#C5A05B] focus:ring-1 focus:ring-[#C5A05B]/50 transition-all shadow-inner disabled:opacity-50"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5+ (Family Suite)</option>
                      </select>
                    </div>
                  </div>

                  {/* Warm Wishes & Duas Message */}
                  <div className="space-y-1">
                    <label className="flex items-center gap-1.5 font-display text-[11px] sm:text-xs text-[#722C3B] uppercase tracking-wider font-semibold">
                      <MessageSquare className="w-3.5 h-3.5 text-[#C5A05B]" />
                      <span>Prayers &amp; Wishes for the Couple</span>
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share your prayers, Duas, or congratulations for Zayan & Ayla..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-sm bg-[#FAF7F2] border border-[#C5A05B]/40 text-[#45151F] placeholder-[#45151F]/40 font-serif text-sm focus:outline-none focus:border-[#C5A05B] focus:ring-1 focus:ring-[#C5A05B]/50 transition-all resize-none shadow-inner"
                    />
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2 text-center">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#722C3B] to-[#45151F] hover:from-[#893547] hover:to-[#571b27] border border-[#C5A05B] text-[#FAF6F0] font-serif text-xs uppercase tracking-[0.2em] transition-all cursor-pointer shadow-lg hover:shadow-[0_4px_20px_rgba(114,44,59,0.35)]"
                    >
                      <Send className="w-3.5 h-3.5 text-[#E7CF9B]" />
                      <span>Confirm RSVP</span>
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Direct RSVP Contacts */}
            <div className="mt-8 pt-6 border-t border-[#C5A05B]/25 text-center">
              <span className="font-display uppercase tracking-[0.2em] text-xs sm:text-sm text-[#722C3B] font-bold block mb-2">
                For Inquiries &amp; Coordination
              </span>
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm font-serif text-[#45151F]">
                {weddingData.rsvpContacts.map((contact, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 font-medium">
                    <Phone className="w-3.5 h-3.5 text-[#C5A05B]" />
                    <span className="font-bold">{contact.name}</span>
                    <span className="text-[#C5A05B]">({contact.relation}):</span>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-[#722C3B] hover:text-[#45151F] hover:underline font-semibold"
                    >
                      {contact.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

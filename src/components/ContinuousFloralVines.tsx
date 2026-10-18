"use client";

import React, { useMemo, useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

const subscribeNoop = () => () => {};
const useIsMounted = () => useSyncExternalStore(subscribeNoop, () => true, () => false);

/**
 * Shared SVG Gradient Definitions
 * Defined once for the entire page to avoid duplicate DOM nodes and ID collisions.
 */
function SharedFloralDefs() {
  return (
    <svg aria-hidden="true" className="absolute w-0 h-0 overflow-hidden pointer-events-none">
      <defs>
        <radialGradient id="sharedBudGrad" cx="38%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="30%" stopColor="#F5D6D4" />
          <stop offset="70%" stopColor="#C46D78" />
          <stop offset="100%" stopColor="#551522" />
        </radialGradient>
        <radialGradient id="sharedPeonyGrad" cx="45%" cy="38%" r="62%">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="28%" stopColor="#FCEAE9" />
          <stop offset="60%" stopColor="#E29E9D" />
          <stop offset="85%" stopColor="#9E3547" />
          <stop offset="100%" stopColor="#4F111E" />
        </radialGradient>
        <radialGradient id="sharedPeonyCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="45%" stopColor="#C5A05B" />
          <stop offset="100%" stopColor="#551522" />
        </radialGradient>
        <linearGradient id="vineGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="25%" stopColor="#E7CF9B" />
          <stop offset="60%" stopColor="#C5A05B" />
          <stop offset="85%" stopColor="#8C682D" />
          <stop offset="100%" stopColor="#4A3414" />
        </linearGradient>
        <linearGradient id="vineShimmerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF7E6" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#E7CF9B" stopOpacity="0.75" />
          <stop offset="80%" stopColor="#FFFDF9" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#C5A05B" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="emeraldLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#638057" />
          <stop offset="50%" stopColor="#3A4F32" />
          <stop offset="100%" stopColor="#1E2B19" />
        </linearGradient>
        <linearGradient id="wineLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9C3A50" />
          <stop offset="55%" stopColor="#5D1C2A" />
          <stop offset="100%" stopColor="#2E0B13" />
        </linearGradient>
        <linearGradient id="goldLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="45%" stopColor="#C5A05B" />
          <stop offset="100%" stopColor="#7A5D25" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/**
 * Botanical Flower Blossom SVG Component
 * Luxury multi-layered peony and garden rose with golden stamen core.
 * Uses shared gradients and composite-only static shadows.
 */
function BotanicalBlossom({
  size = 36,
  rotation = 0,
  variant = "peony",
}: {
  size?: number;
  rotation?: number;
  variant?: "peony" | "rose" | "bud" | "jasmine";
}) {
  if (variant === "bud") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        style={{ transform: `rotate(${rotation}deg)` }}
        className="overflow-visible drop-shadow-[0_3px_6px_rgba(36,8,14,0.55)]"
      >
        {/* Calyx leaves */}
        <path d="M16 28 C11 23, 9 17, 13 13 C15 17, 17 23, 17 28 Z" fill="#2E3B26" stroke="#C5A05B" strokeWidth="0.5" />
        <path d="M24 28 C29 23, 31 17, 27 13 C25 17, 23 23, 23 28 Z" fill="#3D4F33" stroke="#C5A05B" strokeWidth="0.5" />
        {/* Bud Petals */}
        <ellipse cx="20" cy="18" rx="8.5" ry="12.5" fill="url(#sharedBudGrad)" stroke="#E7CF9B" strokeWidth="0.6" />
        <path d="M16 11 C18 7, 22 7, 24 11 C21 15, 19 15, 16 11 Z" fill="#FFFDF9" opacity="0.9" />
        {/* Delicate gold stem tip */}
        <path d="M20 28 Q20 37, 18 39" stroke="#E7CF9B" strokeWidth="1.6" fill="none" />
      </svg>
    );
  }

  if (variant === "jasmine") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        style={{ transform: `rotate(${rotation}deg)` }}
        className="overflow-visible drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
      >
        <g transform="translate(18,18)">
          {[0, 72, 144, 216, 288].map((angle, idx) => (
            <ellipse
              key={idx}
              cx="0"
              cy="-9.5"
              rx="3.8"
              ry="7.5"
              transform={`rotate(${angle})`}
              fill={idx % 2 === 0 ? "#FFFDF9" : "#F7EDE2"}
              stroke="#E7CF9B"
              strokeWidth="0.6"
            />
          ))}
          <circle cx="0" cy="0" r="3" fill="#C5A05B" />
          <circle cx="0" cy="0" r="1.4" fill="#FFFDF9" />
        </g>
      </svg>
    );
  }

  // Opulent Multi-Petal Royal Peony / Rose
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      style={{ transform: `rotate(${rotation}deg)` }}
      className="overflow-visible drop-shadow-[0_4px_10px_rgba(40,10,16,0.6)]"
    >
      <g transform="translate(30,30)">
        {/* Outer Deep Velvet Guard Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <path
            key={`outer-${i}`}
            d="M -11 -23 C -20 -17, -18 -4, 0 0 C 18 -4, 20 -17, 11 -23 C 5 -27, -5 -27, -11 -23 Z"
            transform={`rotate(${angle})`}
            fill="url(#sharedPeonyGrad)"
            stroke="#C5A05B"
            strokeWidth="0.4"
            opacity="0.96"
          />
        ))}

        {/* Middle Soft Blush Petals */}
        {[22, 67, 112, 157, 202, 247, 292, 337].map((angle, i) => (
          <path
            key={`mid-${i}`}
            d="M -8 -17 C -14 -13, -11 -3, 0 0 C 11 -3, 14 -13, 8 -17 C 4 -20, -4 -20, -8 -17 Z"
            transform={`rotate(${angle})`}
            fill="url(#sharedPeonyGrad)"
            stroke="#E7CF9B"
            strokeWidth="0.4"
            opacity="0.98"
          />
        ))}

        {/* Inner Curved Petal Layers */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <ellipse
            key={`inner-${i}`}
            cx="0"
            cy="-6.5"
            rx="4.8"
            ry="7.5"
            transform={`rotate(${angle})`}
            fill="#FFFDF9"
            stroke="#D7A3A0"
            strokeWidth="0.5"
          />
        ))}

        {/* Golden Stamens Core */}
        <circle cx="0" cy="0" r="5.5" fill="url(#sharedPeonyCore)" />
        {[
          { x: 3.2, y: 0 },
          { x: 2.4, y: 2.1 },
          { x: 0.55, y: 3.1 },
          { x: -1.6, y: 2.8 },
          { x: -3.0, y: 1.1 },
          { x: -3.0, y: -1.1 },
          { x: -1.6, y: -2.8 },
          { x: 0.55, y: -3.1 },
          { x: 2.4, y: -2.1 },
        ].map((pt, idx) => (
          <circle
            key={`dot-${idx}`}
            cx={pt.x}
            cy={pt.y}
            r="0.9"
            fill="#FFF2D6"
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * Botanical Leaf Pair SVG with Fine Gold Veining
 */
function BotanicalLeaf({
  x,
  y,
  rotation,
  scale = 1,
  color = "emerald",
}: {
  x: number;
  y: number;
  rotation: number;
  scale?: number;
  color?: "emerald" | "wine" | "gold";
}) {
  const fill =
    color === "emerald"
      ? "url(#emeraldLeafGrad)"
      : color === "wine"
      ? "url(#wineLeafGrad)"
      : "url(#goldLeafGrad)";

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rotation}) scale(${scale})`}>
      <path
        d="M 0 0 C 9 -13, 20 -17, 28 -2 C 22 13, 9 11, 0 0 Z"
        fill={fill}
        stroke="#C5A05B"
        strokeWidth="0.6"
        strokeOpacity="0.75"
      />
      <path d="M 0 0 Q 14 -4, 27 -2" stroke="#FFF2D6" strokeWidth="0.7" fill="none" opacity="0.85" />
      <path d="M 8 -2 Q 11 -8, 14 -10" stroke="#E7CF9B" strokeWidth="0.45" fill="none" opacity="0.7" />
      <path d="M 16 -3 Q 19 3, 22 5" stroke="#E7CF9B" strokeWidth="0.45" fill="none" opacity="0.7" />
    </g>
  );
}

/**
 * Single Continuous Segment of Hanging Vine Stem with Leaves & Blossoms
 * GPU accelerated and optimized for all devices.
 */
function VineSegment({
  side = "left",
  segmentIndex = 0,
}: {
  side: "left" | "right";
  segmentIndex: number;
}) {
  const isLeft = side === "left";
  const isEven = segmentIndex % 2 === 0;

  return (
    <div
      className={`relative w-full h-[640px] pointer-events-none ${
        isLeft ? "origin-top-left" : "origin-top-right"
      }`}
    >
      <svg
        viewBox="0 0 160 640"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)]"
        preserveAspectRatio="none"
      >
        {/* Main undulating continuous stem */}
        {isLeft ? (
          <>
            <path
              d={
                isEven
                  ? "M 32 0 C 68 120, 94 240, 56 360 C 32 460, 78 560, 40 640"
                  : "M 40 0 C 24 130, 86 260, 52 380 C 32 480, 88 560, 36 640"
              }
              stroke="url(#vineGoldGrad)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d={
                isEven
                  ? "M 32 0 C 68 120, 94 240, 56 360 C 32 460, 78 560, 40 640"
                  : "M 40 0 C 24 130, 86 260, 52 380 C 32 480, 88 560, 36 640"
              }
              stroke="url(#vineShimmerGrad)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Fine curling tendrils */}
            <path
              d="M 54 140 C 90 145, 116 170, 104 198 C 92 216, 70 204, 78 188"
              stroke="#C5A05B"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M 48 410 C 88 415, 112 442, 98 470 C 86 486, 68 474, 75 458"
              stroke="#E7CF9B"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              opacity="0.9"
            />
            {/* Foliage leaves */}
            <BotanicalLeaf x={42} y={60} rotation={-22} scale={0.95} color="emerald" />
            <BotanicalLeaf x={58} y={110} rotation={38} scale={1.15} color="wine" />
            <BotanicalLeaf x={78} y={190} rotation={-12} scale={1.05} color="emerald" />
            <BotanicalLeaf x={68} y={260} rotation={48} scale={0.9} color="gold" />
            <BotanicalLeaf x={50} y={330} rotation={-38} scale={1.1} color="emerald" />
            <BotanicalLeaf x={38} y={420} rotation={32} scale={1.05} color="wine" />
            <BotanicalLeaf x={60} y={490} rotation={-18} scale={1.15} color="emerald" />
            <BotanicalLeaf x={52} y={570} rotation={42} scale={0.95} color="gold" />
          </>
        ) : (
          <>
            <path
              d={
                isEven
                  ? "M 128 0 C 92 120, 66 240, 104 360 C 128 460, 82 560, 120 640"
                  : "M 120 0 C 136 130, 74 260, 108 380 C 128 480, 72 560, 124 640"
              }
              stroke="url(#vineGoldGrad)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d={
                isEven
                  ? "M 128 0 C 92 120, 66 240, 104 360 C 128 460, 82 560, 120 640"
                  : "M 120 0 C 136 130, 74 260, 108 380 C 128 480, 72 560, 124 640"
              }
              stroke="url(#vineShimmerGrad)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            {/* Fine curling tendrils */}
            <path
              d="M 106 140 C 70 145, 44 170, 56 198 C 68 216, 90 204, 82 188"
              stroke="#C5A05B"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M 112 410 C 72 415, 48 442, 62 470 C 74 486, 92 474, 85 458"
              stroke="#E7CF9B"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              opacity="0.9"
            />
            {/* Foliage leaves */}
            <BotanicalLeaf x={118} y={60} rotation={202} scale={0.95} color="emerald" />
            <BotanicalLeaf x={102} y={110} rotation={142} scale={1.15} color="wine" />
            <BotanicalLeaf x={82} y={190} rotation={192} scale={1.05} color="emerald" />
            <BotanicalLeaf x={92} y={260} rotation={132} scale={0.9} color="gold" />
            <BotanicalLeaf x={110} y={330} rotation={218} scale={1.1} color="emerald" />
            <BotanicalLeaf x={122} y={420} rotation={148} scale={1.05} color="wine" />
            <BotanicalLeaf x={100} y={490} rotation={198} scale={1.15} color="emerald" />
            <BotanicalLeaf x={108} y={570} rotation={138} scale={0.95} color="gold" />
          </>
        )}
      </svg>

      {/* Curated Luxury Blossoms per segment */}
      {isLeft ? (
        <>
          {/* Peony / Rose Blossom */}
          <div className="absolute top-[90px] left-[34px] xs:left-[44px] sm:left-[48px]">
            <BotanicalBlossom size={isEven ? 36 : 42} rotation={isEven ? 18 : -24} variant="peony" />
          </div>

          {/* Alternating Jasmine or Bud */}
          <div className="absolute top-[380px] left-[36px] xs:left-[46px] sm:left-[48px]">
            {isEven ? (
              <BotanicalBlossom size={26} rotation={45} variant="jasmine" />
            ) : (
              <BotanicalBlossom size={28} rotation={-15} variant="bud" />
            )}
          </div>
        </>
      ) : (
        <>
          {/* Peony / Rose Blossom */}
          <div className="absolute top-[90px] right-[34px] xs:right-[44px] sm:right-[48px]">
            <BotanicalBlossom size={isEven ? 40 : 34} rotation={isEven ? -18 : 24} variant="peony" />
          </div>

          {/* Alternating Jasmine or Bud */}
          <div className="absolute top-[380px] right-[36px] xs:right-[46px] sm:right-[48px]">
            {isEven ? (
              <BotanicalBlossom size={28} rotation={15} variant="bud" />
            ) : (
              <BotanicalBlossom size={26} rotation={-45} variant="jasmine" />
            )}
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Top Canopy Hanging Garland
 * Drapes from the top corners and sways gracefully in the breeze
 */
function TopHangingCanopy() {
  return (
    <div className="absolute top-0 inset-x-0 h-48 sm:h-64 pointer-events-none z-20 overflow-hidden hidden sm:block">
      {/* Left Top Hanging Garland */}
      <div
        className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-44 sm:w-72 md:w-88 origin-top-left transform-gpu"
        style={{
          animation: "vineWindSwayLeft 7.2s ease-in-out infinite alternate",
        }}
      >
        <svg viewBox="0 0 320 220" fill="none" className="w-full h-full drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)]">
          <path
            d="M 0 30 C 80 40, 180 80, 240 160 C 270 200, 290 220, 310 210"
            stroke="url(#vineGoldGrad)"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <path
            d="M 0 30 C 80 40, 180 80, 240 160 C 270 200, 290 220, 310 210"
            stroke="url(#vineShimmerGrad)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path d="M 90 48 Q 110 110, 100 165" stroke="#C5A05B" strokeWidth="1.5" fill="none" />
          <path d="M 160 75 Q 185 140, 175 195" stroke="#E7CF9B" strokeWidth="1.4" fill="none" />
          <path d="M 215 125 Q 235 180, 225 215" stroke="#C5A05B" strokeWidth="1.2" fill="none" />

          <BotanicalLeaf x={50} y={35} rotation={35} scale={1.2} color="emerald" />
          <BotanicalLeaf x={100} y={55} rotation={65} scale={1.1} color="wine" />
          <BotanicalLeaf x={150} y={80} rotation={45} scale={1.3} color="emerald" />
          <BotanicalLeaf x={200} y={120} rotation={75} scale={1.0} color="gold" />
          <BotanicalLeaf x={250} y={170} rotation={50} scale={1.1} color="wine" />
        </svg>

        <div className="absolute top-[85px] left-[70px] sm:left-[95px]">
          <BotanicalBlossom size={34} rotation={12} variant="peony" />
        </div>
        <div className="absolute top-[135px] left-[130px] sm:left-[165px]">
          <BotanicalBlossom size={40} rotation={-18} variant="peony" />
        </div>
        <div className="absolute top-[175px] left-[180px] sm:left-[225px]">
          <BotanicalBlossom size={26} rotation={30} variant="jasmine" />
        </div>
      </div>

      {/* Right Top Hanging Garland */}
      <div
        className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-44 sm:w-72 md:w-88 origin-top-right transform-gpu"
        style={{
          animation: "vineWindSwayRight 7.6s ease-in-out infinite alternate",
        }}
      >
        <svg viewBox="0 0 320 220" fill="none" className="w-full h-full drop-shadow-[0_6px_12px_rgba(0,0,0,0.6)]">
          <path
            d="M 320 30 C 240 40, 140 80, 80 160 C 50 200, 30 220, 10 210"
            stroke="url(#vineGoldGrad)"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <path
            d="M 320 30 C 240 40, 140 80, 80 160 C 50 200, 30 220, 10 210"
            stroke="url(#vineShimmerGrad)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path d="M 230 48 Q 210 110, 220 165" stroke="#C5A05B" strokeWidth="1.5" fill="none" />
          <path d="M 160 75 Q 135 140, 145 195" stroke="#E7CF9B" strokeWidth="1.4" fill="none" />
          <path d="M 105 125 Q 85 180, 95 215" stroke="#C5A05B" strokeWidth="1.2" fill="none" />

          <BotanicalLeaf x={270} y={35} rotation={145} scale={1.2} color="emerald" />
          <BotanicalLeaf x={220} y={55} rotation={115} scale={1.1} color="wine" />
          <BotanicalLeaf x={170} y={80} rotation={135} scale={1.3} color="emerald" />
          <BotanicalLeaf x={120} y={120} rotation={105} scale={1.0} color="gold" />
          <BotanicalLeaf x={70} y={170} rotation={130} scale={1.1} color="wine" />
        </svg>

        <div className="absolute top-[85px] right-[70px] sm:right-[95px]">
          <BotanicalBlossom size={34} rotation={-12} variant="peony" />
        </div>
        <div className="absolute top-[135px] right-[130px] sm:right-[165px]">
          <BotanicalBlossom size={40} rotation={22} variant="peony" />
        </div>
        <div className="absolute top-[175px] right-[180px] sm:right-[225px]">
          <BotanicalBlossom size={26} rotation={-30} variant="jasmine" />
        </div>
      </div>
    </div>
  );
}

/**
 * Floating Wind Petals Component
 * Renders delicate blush and gold petals floating softly downwards across the screen
 */
function FloatingWindPetals({ count = 8 }: { count?: number }) {
  const shouldReduceMotion = useReducedMotion();

  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 12 + 7) % 94}%`,
      delay: i * 2.2,
      duration: 16 + (i % 4) * 3,
      size: 13 + (i % 3) * 5,
      isGold: i % 3 === 0,
    }));
  }, [count]);

  const isMounted = useIsMounted();
  if (!isMounted || shouldReduceMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute -top-10 opacity-0 transform-gpu"
          style={{
            left: p.left,
            animation: `floatingPetalFlutter ${p.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <svg
            width={p.size}
            height={p.size * 1.5}
            viewBox="0 0 20 30"
            className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
          >
            <path
              d="M 10 0 C 2 8, 0 20, 10 30 C 20 20, 18 8, 10 0 Z"
              fill={p.isGold ? "#E7CF9B" : "#F5D6D4"}
              opacity={p.isGold ? 0.8 : 0.88}
              stroke={p.isGold ? "#C5A05B" : "#D7A3A0"}
              strokeWidth="0.5"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

/**
 * ContinuousFloralVines:
 * Full-height hanging botanical vine system that runs continuously down both sides
 * of the website all the way to the footer with organic multi-harmonic wind dynamics.
 */
export function ContinuousFloralVines() {
  // 6 segments on mobile screens, expanding to 8 on desktop to avoid invisible DOM bloat
  const totalSegments = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      {/* Shared Gradient Defs */}
      <SharedFloralDefs />

      {/* Dynamic Keyframes strictly constrained to transform (100% GPU compositor friendly) */}
      <style jsx global>{`
        @keyframes vineWindSwayLeft {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(0.8deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes vineWindSwayRight {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(-0.8deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes floatingPetalFlutter {
          0% {
            transform: translate3d(0, -20px, 0) rotate(0deg);
            opacity: 0;
          }
          12% {
            opacity: 0.9;
          }
          50% {
            transform: translate3d(45px, 50vh, 0) rotate(180deg);
            opacity: 0.95;
          }
          85% {
            opacity: 0.85;
          }
          100% {
            transform: translate3d(85px, 105vh, 0) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Floating Breeze Petals */}
      <FloatingWindPetals count={8} />

      {/* Top Canopy Archway hanging down */}
      <TopHangingCanopy />

      {/* Full-Height Continuous Side Vines */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 inset-x-0 pointer-events-none z-25 overflow-hidden"
      >
        {/* Left Side Continuous Trailing Vine */}
        <div
          className="absolute top-0 left-1.5 xs:left-3 sm:left-2 md:left-4 lg:left-6 bottom-0 w-16 xs:w-20 sm:w-28 md:w-34 lg:w-40 flex flex-col items-start opacity-90 sm:opacity-95 origin-top-left transform-gpu"
          style={{ animation: "vineWindSwayLeft 14s ease-in-out infinite alternate" }}
        >
          {totalSegments.map((i) => (
            <div
              key={`vine-left-${i}`}
              className={i >= 6 ? "hidden md:block w-full" : "w-full"}
            >
              <VineSegment side="left" segmentIndex={i} />
            </div>
          ))}
        </div>

        {/* Right Side Continuous Trailing Vine */}
        <div
          className="absolute top-0 right-1.5 xs:right-3 sm:right-2 md:right-4 lg:right-6 bottom-0 w-16 xs:w-20 sm:w-28 md:w-34 lg:w-40 flex flex-col items-end opacity-90 sm:opacity-95 origin-top-right transform-gpu"
          style={{ animation: "vineWindSwayRight 15s ease-in-out infinite alternate" }}
        >
          {totalSegments.map((i) => (
            <div
              key={`vine-right-${i}`}
              className={i >= 6 ? "hidden md:block w-full" : "w-full"}
            >
              <VineSegment side="right" segmentIndex={i} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

"use client";

import React, { useMemo, useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";

const subscribeNoop = () => () => {};
const useIsMounted = () => useSyncExternalStore(subscribeNoop, () => true, () => false);

/**
 * Botanical Flower Blossom SVG Component
 * Detailed luxury peony/rose with layered petals and golden core
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
        className="overflow-visible filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
      >
        <defs>
          <radialGradient id="budGrad" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FAF0E6" />
            <stop offset="50%" stopColor="#D7A3A0" />
            <stop offset="100%" stopColor="#722C3B" />
          </radialGradient>
        </defs>
        {/* Calyx leaves */}
        <path d="M16 28 C12 24, 10 18, 14 14 C16 18, 18 24, 18 28 Z" fill="#3D4D33" />
        <path d="M24 28 C28 24, 30 18, 26 14 C24 18, 22 24, 22 28 Z" fill="#4E6142" />
        {/* Bud Petals */}
        <ellipse cx="20" cy="18" rx="8" ry="12" fill="url(#budGrad)" />
        <path d="M16 12 C18 8, 22 8, 24 12 C21 16, 19 16, 16 12 Z" fill="#FAF0E6" opacity="0.9" />
        {/* Gold stem tip */}
        <path d="M20 28 Q20 36, 18 38" stroke="#C5A05B" strokeWidth="1.5" fill="none" />
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
        className="overflow-visible filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
      >
        {/* 5-petal star jasmine in ivory and gold */}
        <g transform="translate(18,18)">
          {[0, 72, 144, 216, 288].map((angle, idx) => (
            <ellipse
              key={idx}
              cx="0"
              cy="-9"
              rx="3.5"
              ry="7"
              transform={`rotate(${angle})`}
              fill={idx % 2 === 0 ? "#FAF6F0" : "#F7EDE2"}
              stroke="#E7CF9B"
              strokeWidth="0.5"
            />
          ))}
          <circle cx="0" cy="0" r="2.5" fill="#C5A05B" />
        </g>
      </svg>
    );
  }

  // Opulent Multi-Petal Peony / Rose
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      style={{ transform: `rotate(${rotation}deg)` }}
      className="overflow-visible filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
    >
      <defs>
        <radialGradient id={`peonyGrad-${size}-${rotation}`} cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFFDF9" />
          <stop offset="35%" stopColor="#F5D6D4" />
          <stop offset="75%" stopColor="#D7A3A0" />
          <stop offset="100%" stopColor="#722C3B" />
        </radialGradient>
        <radialGradient id={`peonyCore-${size}-${rotation}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F3DFB5" />
          <stop offset="50%" stopColor="#C5A05B" />
          <stop offset="100%" stopColor="#45151F" />
        </radialGradient>
      </defs>

      <g transform="translate(30,30)">
        {/* Outer Guard Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <path
            key={`outer-${i}`}
            d="M -10 -22 C -18 -16, -16 -4, 0 0 C 16 -4, 18 -16, 10 -22 C 4 -26, -4 -26, -10 -22 Z"
            transform={`rotate(${angle})`}
            fill={`url(#peonyGrad-${size}-${rotation})`}
            opacity="0.94"
          />
        ))}

        {/* Middle Soft Petals */}
        {[22, 67, 112, 157, 202, 247, 292, 337].map((angle, i) => (
          <path
            key={`mid-${i}`}
            d="M -7 -16 C -12 -12, -10 -3, 0 0 C 10 -3, 12 -12, 7 -16 C 3 -19, -3 -19, -7 -16 Z"
            transform={`rotate(${angle})`}
            fill={`url(#peonyGrad-${size}-${rotation})`}
            opacity="0.98"
          />
        ))}

        {/* Inner Curved Petal Layers */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <ellipse
            key={`inner-${i}`}
            cx="0"
            cy="-6"
            rx="4.5"
            ry="7"
            transform={`rotate(${angle})`}
            fill="#FAF0E6"
            stroke="#D7A3A0"
            strokeWidth="0.5"
          />
        ))}

        {/* Golden Stamens Core */}
        <circle cx="0" cy="0" r="5" fill={`url(#peonyCore-${size}-${rotation})`} />
        {[
          { x: 3, y: 0 },
          { x: 2.3, y: 1.93 },
          { x: 0.52, y: 2.95 },
          { x: -1.5, y: 2.6 },
          { x: -2.82, y: 1.03 },
          { x: -2.82, y: -1.03 },
          { x: -1.5, y: -2.6 },
          { x: 0.52, y: -2.95 },
          { x: 2.3, y: -1.93 },
        ].map((pt, idx) => (
          <circle
            key={`dot-${idx}`}
            cx={pt.x}
            cy={pt.y}
            r="0.8"
            fill="#FAF6F0"
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * Botanical Leaf Pair SVG
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
      {/* Leaf blade */}
      <path
        d="M 0 0 C 8 -12, 18 -16, 26 -2 C 20 12, 8 10, 0 0 Z"
        fill={fill}
        stroke="#C5A05B"
        strokeWidth="0.5"
        strokeOpacity="0.6"
        className="filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.4)]"
      />
      {/* Central delicate gold leaf vein */}
      <path d="M 0 0 Q 12 -4, 25 -2" stroke="#E7CF9B" strokeWidth="0.6" fill="none" opacity="0.8" />
      <path d="M 7 -2 Q 10 -7, 13 -9" stroke="#E7CF9B" strokeWidth="0.4" fill="none" opacity="0.6" />
      <path d="M 14 -3 Q 17 3, 20 4" stroke="#E7CF9B" strokeWidth="0.4" fill="none" opacity="0.6" />
    </g>
  );
}

/**
 * Single Continuous Segment of Hanging Vine Stem with Leaves & Blossoms
 * Used to tile smoothly down the margins of the website
 */
function VineSegment({
  side = "left",
  segmentIndex = 0,
}: {
  side: "left" | "right";
  segmentIndex: number;
}) {
  const isLeft = side === "left";
  // Alternating curves for natural undulating vine trajectory
  const isEven = segmentIndex % 2 === 0;

  return (
    <div
      className={`relative w-full h-[640px] pointer-events-none ${
        isLeft ? "origin-top-left" : "origin-top-right"
      }`}
      style={{
        animation: `${isLeft ? "vineWindSwayLeft" : "vineWindSwayRight"} ${
          7 + (segmentIndex % 3) * 1.5
        }s ease-in-out infinite alternate`,
        animationDelay: `${segmentIndex * 0.4}s`,
      }}
    >
      <svg
        viewBox="0 0 140 640"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="vineGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E7CF9B" />
            <stop offset="40%" stopColor="#C5A05B" />
            <stop offset="80%" stopColor="#977636" />
            <stop offset="100%" stopColor="#5E4319" />
          </linearGradient>

          <linearGradient id="emeraldLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#556E4A" />
            <stop offset="50%" stopColor="#35472E" />
            <stop offset="100%" stopColor="#1E2B19" />
          </linearGradient>

          <linearGradient id="wineLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8C3649" />
            <stop offset="60%" stopColor="#551B27" />
            <stop offset="100%" stopColor="#2A0B12" />
          </linearGradient>

          <linearGradient id="goldLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5E3BD" />
            <stop offset="50%" stopColor="#C5A05B" />
            <stop offset="100%" stopColor="#7A5D25" />
          </linearGradient>
        </defs>

        {/* Main undulating continuous stem */}
        {isLeft ? (
          <path
            d={
              isEven
                ? "M 28 0 C 58 120, 80 240, 48 360 C 26 460, 68 560, 35 640"
                : "M 35 0 C 20 130, 72 260, 45 380 C 28 480, 75 560, 30 640"
            }
            stroke="url(#vineGoldGrad)"
            strokeWidth="2.8"
            strokeLinecap="round"
            className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          />
        ) : (
          <path
            d={
              isEven
                ? "M 112 0 C 82 120, 60 240, 92 360 C 114 460, 72 560, 105 640"
                : "M 105 0 C 120 130, 68 260, 95 380 C 112 480, 65 560, 110 640"
            }
            stroke="url(#vineGoldGrad)"
            strokeWidth="2.8"
            strokeLinecap="round"
            className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
          />
        )}

        {/* Fine curling tendrils reaching inward */}
        {isLeft ? (
          <>
            <path
              d="M 48 140 C 78 145, 98 170, 88 195 C 78 210, 60 200, 66 186"
              stroke="#C5A05B"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M 42 410 C 75 415, 95 440, 84 465 C 74 480, 58 470, 64 456"
              stroke="#E7CF9B"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              opacity="0.85"
            />
          </>
        ) : (
          <>
            <path
              d="M 92 140 C 62 145, 42 170, 52 195 C 62 210, 80 200, 74 186"
              stroke="#C5A05B"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              opacity="0.85"
            />
            <path
              d="M 98 410 C 65 415, 45 440, 56 465 C 66 480, 82 470, 76 456"
              stroke="#E7CF9B"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              opacity="0.85"
            />
          </>
        )}

        {/* Botanical Foliage Leaves spaced rhythmically along stem */}
        {isLeft ? (
          <>
            <BotanicalLeaf x={36} y={60} rotation={-25} scale={0.9} color="emerald" />
            <BotanicalLeaf x={48} y={110} rotation={35} scale={1.1} color="wine" />
            <BotanicalLeaf x={65} y={190} rotation={-15} scale={1.0} color="emerald" />
            <BotanicalLeaf x={56} y={260} rotation={45} scale={0.85} color="gold" />
            <BotanicalLeaf x={42} y={330} rotation={-40} scale={1.05} color="emerald" />
            <BotanicalLeaf x={32} y={420} rotation={30} scale={1.0} color="wine" />
            <BotanicalLeaf x={50} y={490} rotation={-20} scale={1.1} color="emerald" />
            <BotanicalLeaf x={44} y={570} rotation={40} scale={0.9} color="gold" />
          </>
        ) : (
          <>
            <BotanicalLeaf x={104} y={60} rotation={205} scale={0.9} color="emerald" />
            <BotanicalLeaf x={92} y={110} rotation={145} scale={1.1} color="wine" />
            <BotanicalLeaf x={75} y={190} rotation={195} scale={1.0} color="emerald" />
            <BotanicalLeaf x={84} y={260} rotation={135} scale={0.85} color="gold" />
            <BotanicalLeaf x={98} y={330} rotation={220} scale={1.05} color="emerald" />
            <BotanicalLeaf x={108} y={420} rotation={150} scale={1.0} color="wine" />
            <BotanicalLeaf x={90} y={490} rotation={200} scale={1.1} color="emerald" />
            <BotanicalLeaf x={96} y={570} rotation={140} scale={0.9} color="gold" />
          </>
        )}
      </svg>

      {/* Luxury Blossoms placed along the vine - moved inward for mobile visibility */}
      {isLeft ? (
        <>
          {/* Peony / Rose Blossom 1 */}
          <div
            className="absolute top-[90px] left-[26px] xs:left-[30px] sm:left-[36px] transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-700"
            style={{
              animation: "vineFlowerFlutter 4.5s ease-in-out infinite alternate",
              animationDelay: `${segmentIndex * 0.3}s`,
            }}
          >
            <BotanicalBlossom size={isEven ? 36 : 42} rotation={isEven ? 18 : -24} variant="peony" />
          </div>

          {/* Jasmine Blossom */}
          <div
            className="absolute top-[230px] left-[54px] xs:left-[60px] sm:left-[66px] transform -translate-x-1/2 -translate-y-1/2"
            style={{
              animation: "vineFlowerFlutter 5.2s ease-in-out infinite alternate",
              animationDelay: `${segmentIndex * 0.5 + 0.8}s`,
            }}
          >
            <BotanicalBlossom size={24} rotation={45} variant="jasmine" />
          </div>

          {/* Bud */}
          <div
            className="absolute top-[380px] left-[28px] xs:left-[32px] sm:left-[36px] transform -translate-x-1/2 -translate-y-1/2"
            style={{
              animation: "vineFlowerFlutter 4.8s ease-in-out infinite alternate",
              animationDelay: `${segmentIndex * 0.4 + 1.2}s`,
            }}
          >
            <BotanicalBlossom size={26} rotation={-15} variant="bud" />
          </div>

          {/* Peony Blossom 2 */}
          <div
            className="absolute top-[510px] left-[42px] xs:left-[48px] sm:left-[54px] transform -translate-x-1/2 -translate-y-1/2"
            style={{
              animation: "vineFlowerFlutter 5.6s ease-in-out infinite alternate",
              animationDelay: `${segmentIndex * 0.6 + 0.3}s`,
            }}
          >
            <BotanicalBlossom size={isEven ? 32 : 38} rotation={isEven ? -30 : 25} variant="peony" />
          </div>
        </>
      ) : (
        <>
          {/* Right Peony / Rose Blossom 1 */}
          <div
            className="absolute top-[90px] right-[26px] xs:right-[30px] sm:right-[36px] transform translate-x-1/2 -translate-y-1/2"
            style={{
              animation: "vineFlowerFlutter 4.5s ease-in-out infinite alternate",
              animationDelay: `${segmentIndex * 0.3 + 0.5}s`,
            }}
          >
            <BotanicalBlossom size={isEven ? 40 : 34} rotation={isEven ? -20 : 30} variant="peony" />
          </div>

          {/* Right Jasmine */}
          <div
            className="absolute top-[230px] right-[54px] xs:right-[60px] sm:right-[66px] transform translate-x-1/2 -translate-y-1/2"
            style={{
              animation: "vineFlowerFlutter 5.2s ease-in-out infinite alternate",
              animationDelay: `${segmentIndex * 0.5 + 1.1}s`,
            }}
          >
            <BotanicalBlossom size={24} rotation={-45} variant="jasmine" />
          </div>

          {/* Right Bud */}
          <div
            className="absolute top-[380px] right-[28px] xs:right-[32px] sm:right-[36px] transform translate-x-1/2 -translate-y-1/2"
            style={{
              animation: "vineFlowerFlutter 4.8s ease-in-out infinite alternate",
              animationDelay: `${segmentIndex * 0.4 + 0.7}s`,
            }}
          >
            <BotanicalBlossom size={26} rotation={15} variant="bud" />
          </div>

          {/* Right Peony Blossom 2 */}
          <div
            className="absolute top-[510px] right-[42px] xs:right-[48px] sm:right-[54px] transform translate-x-1/2 -translate-y-1/2"
            style={{
              animation: "vineFlowerFlutter 5.6s ease-in-out infinite alternate",
              animationDelay: `${segmentIndex * 0.6 + 1.4}s`,
            }}
          >
            <BotanicalBlossom size={isEven ? 36 : 30} rotation={isEven ? 25 : -15} variant="peony" />
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
        className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-44 sm:w-72 md:w-88 origin-top-left"
        style={{
          animation: "vineWindSwayLeft 6.5s ease-in-out infinite alternate",
        }}
      >
        <svg viewBox="0 0 320 220" fill="none" className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)]">
          {/* Main arching branch */}
          <path
            d="M 0 30 C 80 40, 180 80, 240 160 C 270 200, 290 220, 310 210"
            stroke="url(#vineGoldGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Secondary hanging drooping tendrils */}
          <path d="M 90 48 Q 110 110, 100 165" stroke="#C5A05B" strokeWidth="1.5" fill="none" />
          <path d="M 160 75 Q 185 140, 175 195" stroke="#E7CF9B" strokeWidth="1.4" fill="none" />
          <path d="M 215 125 Q 235 180, 225 215" stroke="#C5A05B" strokeWidth="1.2" fill="none" />

          {/* Draping leaves */}
          <BotanicalLeaf x={50} y={35} rotation={35} scale={1.2} color="emerald" />
          <BotanicalLeaf x={100} y={55} rotation={65} scale={1.1} color="wine" />
          <BotanicalLeaf x={150} y={80} rotation={45} scale={1.3} color="emerald" />
          <BotanicalLeaf x={200} y={120} rotation={75} scale={1.0} color="gold" />
          <BotanicalLeaf x={250} y={170} rotation={50} scale={1.1} color="wine" />
        </svg>

        {/* Hanging Floral Clusters */}
        <div className="absolute top-[85px] left-[70px] sm:left-[95px]">
          <BotanicalBlossom size={34} rotation={12} variant="peony" />
        </div>
        <div className="absolute top-[135px] left-[130px] sm:left-[165px]">
          <BotanicalBlossom size={42} rotation={-18} variant="peony" />
        </div>
        <div className="absolute top-[175px] left-[180px] sm:left-[225px]">
          <BotanicalBlossom size={26} rotation={30} variant="jasmine" />
        </div>
      </div>

      {/* Right Top Hanging Garland */}
      <div
        className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-44 sm:w-72 md:w-88 origin-top-right"
        style={{
          animation: "vineWindSwayRight 7.2s ease-in-out infinite alternate",
        }}
      >
        <svg viewBox="0 0 320 220" fill="none" className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.7)]">
          {/* Main arching branch */}
          <path
            d="M 320 30 C 240 40, 140 80, 80 160 C 50 200, 30 220, 10 210"
            stroke="url(#vineGoldGrad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Secondary hanging drooping tendrils */}
          <path d="M 230 48 Q 210 110, 220 165" stroke="#C5A05B" strokeWidth="1.5" fill="none" />
          <path d="M 160 75 Q 135 140, 145 195" stroke="#E7CF9B" strokeWidth="1.4" fill="none" />
          <path d="M 105 125 Q 85 180, 95 215" stroke="#C5A05B" strokeWidth="1.2" fill="none" />

          {/* Draping leaves */}
          <BotanicalLeaf x={270} y={35} rotation={145} scale={1.2} color="emerald" />
          <BotanicalLeaf x={220} y={55} rotation={115} scale={1.1} color="wine" />
          <BotanicalLeaf x={170} y={80} rotation={135} scale={1.3} color="emerald" />
          <BotanicalLeaf x={120} y={120} rotation={105} scale={1.0} color="gold" />
          <BotanicalLeaf x={70} y={170} rotation={130} scale={1.1} color="wine" />
        </svg>

        {/* Hanging Floral Clusters */}
        <div className="absolute top-[85px] right-[70px] sm:right-[95px]">
          <BotanicalBlossom size={34} rotation={-12} variant="peony" />
        </div>
        <div className="absolute top-[135px] right-[130px] sm:right-[165px]">
          <BotanicalBlossom size={42} rotation={22} variant="peony" />
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
function FloatingWindPetals({ count = 9 }: { count?: number }) {
  const shouldReduceMotion = useReducedMotion();

  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 11 + 6) % 94}%`,
      delay: i * 2.3,
      duration: 16 + (i % 5) * 3,
      size: 14 + (i % 3) * 6,
      rotateInit: (i * 45) % 360,
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
          className="absolute -top-10 opacity-0"
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
            className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
          >
            <path
              d="M 10 0 C 2 8, 0 20, 10 30 C 20 20, 18 8, 10 0 Z"
              fill={p.isGold ? "#E7CF9B" : "#F5D6D4"}
              opacity={p.isGold ? 0.75 : 0.85}
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
 * of the website all the way to the footer. Swaying naturally in the wind.
 */
export function ContinuousFloralVines() {
  // Number of 640px segments to cover the entire page height seamlessly
  // Covers ~5000px page height from header to footer
  const segmentCount = 9;

  return (
    <>
      {/* Dynamic Scoped Keyframes for Natural Wind Dynamics */}
      <style jsx global>{`
        @keyframes vineWindSwayLeft {
          0% {
            transform: rotate(0deg) skewX(0deg);
          }
          30% {
            transform: rotate(1.4deg) skewX(0.7deg) translateY(-2px);
          }
          65% {
            transform: rotate(-0.9deg) skewX(-0.5deg) translateY(2px);
          }
          85% {
            transform: rotate(1.8deg) skewX(0.9deg) translateY(-1px);
          }
          100% {
            transform: rotate(0deg) skewX(0deg);
          }
        }

        @keyframes vineWindSwayRight {
          0% {
            transform: rotate(0deg) skewX(0deg);
          }
          25% {
            transform: rotate(-1.5deg) skewX(-0.8deg) translateY(-2px);
          }
          60% {
            transform: rotate(1.1deg) skewX(0.6deg) translateY(2px);
          }
          85% {
            transform: rotate(-1.7deg) skewX(-0.9deg) translateY(-1px);
          }
          100% {
            transform: rotate(0deg) skewX(0deg);
          }
        }

        @keyframes vineFlowerFlutter {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) rotate(4deg) scale(1.04);
          }
          100% {
            transform: translate(-50%, -50%) rotate(-3deg) scale(0.98);
          }
        }

        @keyframes floatingPetalFlutter {
          0% {
            transform: translateY(-20px) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.85;
          }
          50% {
            transform: translateY(50vh) translateX(45px) rotate(180deg);
            opacity: 0.9;
          }
          85% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(105vh) translateX(85px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>

      {/* Floating Breeze Petals */}
      <FloatingWindPetals count={8} />

      {/* Top Canopy Archway hanging down */}
      <TopHangingCanopy />

      {/* Full-Height Continuous Side Vines running all the way down to the footer */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 inset-x-0 pointer-events-none z-25 overflow-hidden"
      >
        {/* Left Side Continuous Trailing Vine */}
        <div className="absolute top-0 left-0 sm:left-1 bottom-0 w-16 xs:w-20 sm:w-24 md:w-28 lg:w-36 flex flex-col items-start opacity-85 sm:opacity-95">
          {Array.from({ length: segmentCount }).map((_, i) => (
            <VineSegment key={`vine-left-${i}`} side="left" segmentIndex={i} />
          ))}
        </div>

        {/* Right Side Continuous Trailing Vine */}
        <div className="absolute top-0 right-0 sm:right-1 bottom-0 w-16 xs:w-20 sm:w-24 md:w-28 lg:w-36 flex flex-col items-end opacity-85 sm:opacity-95">
          {Array.from({ length: segmentCount }).map((_, i) => (
            <VineSegment key={`vine-right-${i}`} side="right" segmentIndex={i} />
          ))}
        </div>
      </div>
    </>
  );
}

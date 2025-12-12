"use client";

import BackgroundMusic from "@/components/background-music";
import ChristmasMessage from "@/components/christmas-message";
import CountdownTimer from "@/components/countdown-timer";
import Fireworks from "@/components/fireworks-effect";
import SnowEffect from "@/components/show-effect";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isChristmas, setIsChristmas] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  const pageClass = transitioning
    ? "opacity-0 transition-opacity duration-700"
    : "opacity-100 transition-opacity duration-700";

  if (isChristmas) {
    return (
      <div
        className={`${pageClass} relative w-full h-screen flex items-center justify-center text-center overflow-hidden`}
        style={{
          backgroundImage: "url('/FELIZ-NAVIDAD.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        {/* Fireworks full screen */}
        <Fireworks />

        {/* Overlay sutil para mejor lectura */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

        {/* Content */}
        <div className="relative z-20 px-6">
          <h1
            className="
            text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6
            bg-gradient-to-b from-yellow-300 to-yellow-500
            text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(255,200,80,0.8)]
            font-['Cinzel_Decorative']
          "
            style={{ letterSpacing: "0.06em" }}
          >
            🎄 ¡Feliz Navidad! 🎄
          </h1>

          <p
            className="
            text-2xl md:text-3xl text-yellow-100/90
            drop-shadow-[0_0_10px_rgba(255,255,200,0.8)]
            font-light
          "
          >
            Que la luz, la magia y la alegría llenen tu hogar ✨
          </p>
        </div>
      </div>
    );
  }

  return (
    <main
      className={`${pageClass} relative min-h-screen overflow-hidden bg-no-repeat bg-cover bg-center`}
      style={{ backgroundImage: "url('./NAVIDAD.png')" }}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-festive-gold/30 via-transparent to-festive-red/10 animate-pulse"></div>
      </div>

      {/* Snow effect */}
      <SnowEffect />

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-3xl">
          {/* ---------------------- HEADER ----------------------- */}
          <div className="mb-14 text-center select-none">
            {/* Título mejorado */}
            <h1
              className="
                text-6xl md:text-7xl font-extrabold mb-4
                bg-gradient-to-b from-yellow-300 via-yellow-100 to-yellow-400 
                text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(255,200,80,0.8)]
                tracking-wide
                animate-fade-in
                font-['Cinzel_Decorative']
              "
              style={{ letterSpacing: "0.06em" }}
            >
              Navidad 2025
            </h1>

            {/* Subtítulo */}
            <p
              className="
                text-festive-light/80 text-lg md:text-2xl font-light 
                drop-shadow-md animate-fade-in delay-150
              "
            >
              ✨ Un momento para celebrar, recordar y sonreír ✨
            </p>
          </div>

          {/* Countdown */}
          <CountdownTimer
            isChristmas={isChristmas}
            setIsChristmas={() => {
              setTransitioning(true);

              setTimeout(() => {
                setIsChristmas(true);
                setTransitioning(false);
              }, 800); // duración del fade
            }}
          />

          {/* Christmas message */}
          <ChristmasMessage />
        </div>
      </div>

      {/* Footer fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />
      <BackgroundMusic />
    </main>
  );
}

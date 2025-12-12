"use client";

import { useEffect, useState } from "react";

interface TimeUnits {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  isChristmas: boolean;
  setIsChristmas: (c: boolean) => void;
}

export default function CountdownTimer({
  setIsChristmas,
}: CountdownTimerProps) {
  const [time, setTime] = useState<TimeUnits>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Cálculo del tiempo restante
  useEffect(() => {
    const target = new Date("2025-12-25T00:00:00").getTime();

    const update = () => {
      const diff = target - Date.now();
      if (diff <= 0) return setIsChristmas(true);

      setTime({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [setIsChristmas]);

  // Componente interno más compacto
  const TimeCard = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-yellow-300/30 blur-xl rounded-2xl" />

        <div
          className="
            relative rounded-2xl p-6 md:p-8 min-w-24 md:min-w-28
            bg-gradient-to-br from-red-950/40 to-yellow-800/10
            border border-yellow-400/40 backdrop-blur-md shadow-xl
          "
        >
          <span className="text-4xl md:text-5xl font-bold text-yellow-300 drop-shadow-lg select-none">
            {value.toString().padStart(2, "0")}
          </span>
        </div>
      </div>

      <span className="mt-4 text-yellow-200/70 text-sm md:text-base uppercase tracking-widest select-none">
        {label}
      </span>
    </div>
  );

  return (
    <div className="mb-12 relative">
      <div className="absolute inset-0 -z-10 opacity-40 bg-[radial-gradient(circle_at_top,#ff0000,#7a0000,#000000)] blur-3xl" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <TimeCard value={time.days} label="Días" />
        <TimeCard value={time.hours} label="Horas" />
        <TimeCard value={time.minutes} label="Minutos" />
        <TimeCard value={time.seconds} label="Segundos" />
      </div>
    </div>
  );
}

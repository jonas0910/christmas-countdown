"use client";

import { useEffect, useRef } from "react";

export default function SnowEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    };

    resize();
    addEventListener("resize", resize);

    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: Math.random() * 0.5 + 0.2,
      size: Math.random() * 10 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      rotation: Math.random() * Math.PI,
      vrot: (Math.random() - 0.5) * 0.01,
    }));

    const drawSnowflake = (p: any) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.strokeStyle = `rgba(255,255,255,${p.opacity})`;
      ctx.lineWidth = 0.6;

      const main = p.size;
      const side = main * 0.4;
      const offset = main * 0.5;

      for (let i = 0; i < 6; i++) {
        ctx.rotate(Math.PI / 3);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(main, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(offset, 0);
        ctx.lineTo(offset + side, side * 0.6);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(offset, 0);
        ctx.lineTo(offset + side, -side * 0.6);
        ctx.stroke();
      }

      ctx.restore();
    };
    let frame: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.rotation += p.vrot;
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= 0.001;

        if (
          p.y > canvas.height ||
          p.x < 0 ||
          p.x > canvas.width ||
          p.opacity <= 0
        ) {
          Object.assign(p, {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            opacity: Math.random() * 0.5 + 0.3,
            vx: (Math.random() - 0.5) * 0.5,
          });
        }

        drawSnowflake(p);

        ctx.fillStyle = `rgba(255,255,255,${p.opacity * 0.3})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 pointer-events-none opacity-80"
    />
  );
}

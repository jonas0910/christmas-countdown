"use client";

import { useEffect, useRef } from "react";

export default function SnowEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Snow particles
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      rotation: number;
      vrot: number;
    }> = [];

    // Create initial snow particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: Math.random() * 0.5 + 0.2,
        size: Math.random() * 10 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        rotation: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.01,
      });
    }

    let animationId: number;

    function drawSnowflake(ctx: CanvasRenderingContext2D, p: any) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity})`;
      ctx.lineWidth = 0.6;

      const main = p.size;
      const side = p.size * 0.4; // tamaño ramas
      const offset = p.size * 0.5; // posición de ramas secundarias

      for (let i = 0; i < 6; i++) {
        ctx.rotate(Math.PI / 3);

        // ---- rama principal ----
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(main, 0);
        ctx.stroke();

        // ---- sub-ramas (arriba) ----
        ctx.beginPath();
        ctx.moveTo(offset, 0);
        ctx.lineTo(offset + side, side * 0.6);
        ctx.stroke();

        // ---- sub-ramas (abajo) ----
        ctx.beginPath();
        ctx.moveTo(offset, 0);
        ctx.lineTo(offset + side, -side * 0.6);
        ctx.stroke();
      }

      ctx.restore();
    }

    const animate = () => {
      // Clear canvas with slight trail effect
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.rotation += particle.vrot;

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.opacity -= 0.001;

        // Reset particle if it goes off screen or fades out
        if (
          particle.y > canvas.height ||
          particle.x < 0 ||
          particle.x > canvas.width ||
          particle.opacity <= 0
        ) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.opacity = Math.random() * 0.5 + 0.3;
          particle.vx = (Math.random() - 0.5) * 0.5;
        }

        // Draw particle
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.beginPath();
        drawSnowflake(ctx, particle);

        ctx.fill();

        // Add glow effect
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.3})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-10 pointer-events-none opacity-80"
    />
  );
}

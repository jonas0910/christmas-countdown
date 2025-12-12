import { useEffect, useRef } from "react";

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    // Mantiene el canvas del tamaño de la pantalla
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: any[] = [];

    function createFirework() {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.4;

      const count = 30;
      const colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];

      for (let i = 0; i < count; i++) {
        particles.push({
          x,
          y,
          angle: (Math.PI * 2 * i) / count,
          speed: Math.random() * 2 + 1,
          radius: Math.random() * 10 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
        });
      }
    }

    function animate() {
      // BORRADO suave sin pintar negro
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "lighter";

      particles.forEach((p, i) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.alpha -= 0.005;

        if (p.alpha <= 0) particles.splice(i, 1);

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    const interval = setInterval(createFirework, 900);
    animate();

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="
        absolute inset-0 w-full h-full 
        pointer-events-none 
        z-10 
      "
      style={{
        background: "transparent",
      }}
    />
  );
}

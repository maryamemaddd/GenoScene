import React, { useEffect, useRef } from 'react';

interface AnimatedDNABackgroundProps {
  mode?: 'home' | 'analysis' | 'learning' | 'about';
  className?: string;
}

export const AnimatedDNABackground: React.FC<AnimatedDNABackgroundProps> = ({
  mode = 'home',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    if (!prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const particlesCount = mode === 'home' ? 45 : mode === 'analysis' ? 60 : 35;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
      label?: string;
    }> = [];

    const colors = ['#38bdf8', '#06b6d4', '#14b8a6', '#818cf8', '#a78bfa'];
    const snpLabels = ['rs12913832', 'rs1426654', 'rs1800407', 'rs16891982', 'rs12896399', 'rs1393350'];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.15,
        color: colors[Math.floor(Math.random() * colors.length)],
        label: i < snpLabels.length && mode === 'analysis' ? snpLabels[i] : undefined
      });
    }

    let dnaAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      const parallaxX = (mouseX / width - 0.5) * 40;
      const parallaxY = (mouseY / height - 0.5) * 20;

      if (mode === 'home') {

        const helixSteps = 36;
        const startX = width * 0.15 + parallaxX;
        const endX = width * 0.9 + parallaxX;
        const centerY = height * 0.45 + parallaxY;
        const amplitude = Math.min(80, height * 0.12);
        const wavelength = 0.28;

        ctx.lineWidth = 1;
        for (let i = 0; i < helixSteps; i++) {
          const t = i / (helixSteps - 1);
          const x = startX + t * (endX - startX);
          const currentAngle = dnaAngle + i * wavelength;

          const y1 = centerY + Math.sin(currentAngle) * amplitude;
          const y2 = centerY - Math.sin(currentAngle) * amplitude;
          const z = Math.cos(currentAngle);

          const alpha = Math.max(0.04, (z + 1.2) * 0.08);

          ctx.beginPath();
          ctx.moveTo(x, y1);
          ctx.lineTo(x, y2);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.7})`;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(x, y1, z > 0 ? 2.5 : 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(6, 182, 212, ${alpha * 1.5})`;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x, y2, -z > 0 ? 2.5 : 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(129, 140, 248, ${alpha * 1.5})`;
          ctx.fill();
        }
      } else if (mode === 'analysis') {

        const gridSize = 80;
        ctx.strokeStyle = 'rgba(14, 165, 233, 0.025)';
        ctx.lineWidth = 1;

        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x + parallaxX * 0.2, 0);
          ctx.lineTo(x + parallaxX * 0.2, height);
          ctx.stroke();
        }

        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y + parallaxY * 0.2);
          ctx.lineTo(width, y + parallaxY * 0.2);
          ctx.stroke();
        }
      } else if (mode === 'learning') {

        const rings = [
          { cx: width * 0.12 + parallaxX, cy: height * 0.25 + parallaxY, r: 42 },
          { cx: width * 0.88 + parallaxX, cy: height * 0.35 + parallaxY, r: 55 },
          { cx: width * 0.82 + parallaxX, cy: height * 0.75 + parallaxY, r: 38 }
        ];

        rings.forEach(ring => {
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const x = ring.cx + ring.r * Math.cos(angle);
            const y = ring.cy + ring.r * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.strokeStyle = 'rgba(20, 184, 166, 0.08)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        });
      } else if (mode === 'about') {

        const nodes = [
          { x: width * 0.15, y: height * 0.3 },
          { x: width * 0.25, y: height * 0.6 },
          { x: width * 0.5, y: height * 0.25 },
          { x: width * 0.75, y: height * 0.4 },
          { x: width * 0.85, y: height * 0.7 }
        ];

        ctx.strokeStyle = 'rgba(129, 140, 248, 0.05)';
        ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x + parallaxX * 0.3, nodes[i].y + parallaxY * 0.3);
            ctx.lineTo(nodes[j].x + parallaxX * 0.3, nodes[j].y + parallaxY * 0.3);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p, idx) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.4;
        ctx.fill();

        if (p.label) {
          ctx.font = '9px "JetBrains Mono", monospace';
          ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
          ctx.fillText(p.label, p.x + 6, p.y + 3);
        }

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / 90) * 0.08})`;
            ctx.stroke();
          }
        }
      });
      ctx.globalAlpha = 1;

      if (!prefersReducedMotion) {
        dnaAngle += 0.008;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mode]);

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block opacity-85" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#080c14_90%)] opacity-70 pointer-events-none" />
    </div>
  );
};


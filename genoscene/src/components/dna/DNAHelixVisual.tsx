import React, { useEffect, useRef } from 'react';

interface DNAHelixVisualProps {
  className?: string;
  interactive?: boolean;
}

export const DNAHelixVisual: React.FC<DNAHelixVisualProps> = ({
  className = '',
  interactive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth || 400;
      height = canvas.height = 360;
    };
    window.addEventListener('resize', handleResize);

    let angle = 0;
    const pointsCount = 28;
    const amplitude = 55;
    const frequency = 0.22;
    const speed = 0.018;

    const basePairs = [
      { name1: 'A', name2: 'T', color1: '#38bdf8', color2: '#06b6d4' },
      { name1: 'G', name2: 'C', color1: '#818cf8', color2: '#a78bfa' },
      { name1: 'T', name2: 'A', color1: '#06b6d4', color2: '#38bdf8' },
      { name1: 'C', name2: 'G', color1: '#a78bfa', color2: '#818cf8' }
    ];

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const centerY = height / 2;
      const startX = 30;
      const stepX = (width - 60) / pointsCount;

      for (let i = 0; i < pointsCount; i++) {
        const x = startX + i * stepX;
        const currentAngle = angle + i * frequency;

        const y1 = centerY + Math.sin(currentAngle) * amplitude;
        const y2 = centerY - Math.sin(currentAngle) * amplitude;
        const z = Math.cos(currentAngle);

        const pair = basePairs[i % basePairs.length];

        const alpha = Math.max(0.2, (z + 1.2) / 2.2);
        ctx.beginPath();
        ctx.moveTo(x, y1);
        ctx.lineTo(x, y2);
        ctx.strokeStyle = `rgba(148, 163, 184, ${alpha * 0.35})`;
        ctx.lineWidth = 1.2;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        const midY = (y1 + y2) / 2;
        ctx.beginPath();
        ctx.arc(x, midY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 0.6})`;
        ctx.fill();

        const radius1 = z > 0 ? 4 + z * 1.5 : 3.5;
        ctx.beginPath();
        ctx.arc(x, y1, radius1, 0, Math.PI * 2);
        ctx.fillStyle = pair.color1;
        ctx.shadowColor = pair.color1;
        ctx.shadowBlur = z > 0 ? 8 : 2;
        ctx.fill();
        ctx.shadowBlur = 0;

        const radius2 = -z > 0 ? 4 - z * 1.5 : 3.5;
        ctx.beginPath();
        ctx.arc(x, y2, radius2, 0, Math.PI * 2);
        ctx.fillStyle = pair.color2;
        ctx.shadowColor = pair.color2;
        ctx.shadowBlur = -z > 0 ? 8 : 2;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      angle += speed;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="w-full h-auto block" />
      {interactive && (
        <div className="absolute bottom-2 inset-x-0 flex items-center justify-center gap-4 text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-sky-400" /> Adenine (A) : Thymine (T)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-indigo-400" /> Guanine (G) : Cytosine (C)
          </span>
        </div>
      )}
    </div>
  );
};


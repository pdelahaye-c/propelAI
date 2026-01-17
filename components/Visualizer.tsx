import React, { useEffect, useRef } from 'react';

interface VisualizerProps {
  isActive: boolean;
  isSpeaking: boolean;
}

export const Visualizer: React.FC<VisualizerProps> = ({ isActive, isSpeaking }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let offset = 0;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      if (!isActive) {
        // Flat line when inactive
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 2;
        ctx.stroke();
        return;
      }

      ctx.beginPath();
      ctx.moveTo(0, centerY);

      const amplitude = isSpeaking ? 30 : 10;
      const frequency = isSpeaking ? 0.05 : 0.02;
      const speed = isSpeaking ? 0.2 : 0.05;

      for (let x = 0; x < width; x++) {
        const y = centerY + Math.sin(x * frequency + offset) * amplitude * Math.sin(x / width * Math.PI);
        ctx.lineTo(x, y);
      }

      // Glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = isSpeaking ? '#818cf8' : '#a78bfa';
      ctx.strokeStyle = isSpeaking ? '#818cf8' : '#a78bfa'; // Indigo or Purple
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.shadowBlur = 0;

      offset += speed;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, [isActive, isSpeaking]);

  return (
    <canvas 
      ref={canvasRef} 
      width={300} 
      height={100} 
      className="w-full h-24 pointer-events-none"
    />
  );
};

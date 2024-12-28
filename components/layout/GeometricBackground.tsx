'use client';

import { useEffect, useRef } from 'react';

export function GeometricBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const SHAPE_SIZE = 30; // Fixed size for all shapes

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const shapes: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      angle: number;
      type: 'circle' | 'square' | 'triangle';
    }> = [];

    for (let i = 0; i < 50; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: SHAPE_SIZE,
        speed: Math.random() * 0.5 + 0.1,
        angle: Math.random() * Math.PI * 2,
        type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as any,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach((shape) => {
        const halfSize = shape.size / 2;
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.angle);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;

        switch (shape.type) {
          case 'circle':
            ctx.beginPath();
            ctx.arc(0, 0, halfSize, 0, Math.PI * 2);
            ctx.stroke();
            break;
          case 'square':
            ctx.strokeRect(-halfSize, -halfSize, shape.size, shape.size);
            break;
          case 'triangle':
            ctx.beginPath();
            ctx.moveTo(0, -halfSize);
            ctx.lineTo(halfSize, halfSize);
            ctx.lineTo(-halfSize, halfSize);
            ctx.closePath();
            ctx.stroke();
            break;
        }

        ctx.restore();

        shape.x += Math.cos(shape.angle) * shape.speed;
        shape.y += Math.sin(shape.angle) * shape.speed;
        shape.angle += 0.002;

        if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
        if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
        if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
        if (shape.y > canvas.height + shape.size) shape.y = -shape.size;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -10,
        opacity: 0.5,
        background: "linear-gradient(to bottom, #0F1729, #1a2436)"
      }}
    />
  );
}
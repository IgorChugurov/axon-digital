"use client";

import React, { useEffect, useRef } from "react";

interface ArrowCanvasProps {
  refs: (HTMLDivElement | null)[];
}

export default function ArrowCanvas({ refs }: ArrowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawArrowHead = (
    ctx: CanvasRenderingContext2D,
    toX: number,
    toY: number,
    angle: number
  ) => {
    const size = 8;
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
      toX - size * Math.cos(angle - Math.PI / 6),
      toY - size * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      toX - size * Math.cos(angle + Math.PI / 6),
      toY - size * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
  };

  const drawArrows = () => {
    const canvas = canvasRef.current;
    if (!canvas || refs.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.parentElement?.getBoundingClientRect();
    if (!rect) return;

    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#D1D5DB"; // Tailwind gray-300
    ctx.fillStyle = "#D1D5DB";
    ctx.lineWidth = 2;
    ctx.setLineDash([]);

    const offset = canvas.getBoundingClientRect();

    const getAdjustedPoint = (el: HTMLElement | null) => {
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return {
        x: r.left - offset.left + r.width / 2,
        y: r.top - offset.top + r.height * 0.5, // можно 0.3 или 0.4 для смещения вверх
      };
    };

    for (let i = 0; i < refs.length - 1; i++) {
      const from = getAdjustedPoint(refs[i]);
      const to = getAdjustedPoint(refs[i + 1]);

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);

      const cp1x = from.x;
      const cp1y = from.y + 60;
      const cp2x = to.x;
      const cp2y = to.y - 60;

      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, to.x, to.y);
      ctx.stroke();

      // стрелка
      const angle = Math.atan2(to.y - cp2y, to.x - cp2x);
      drawArrowHead(ctx, to.x, to.y, angle);
    }
  };

  useEffect(() => {
    drawArrows();
    window.addEventListener("resize", drawArrows);
    window.addEventListener("scroll", drawArrows);
    return () => {
      window.removeEventListener("resize", drawArrows);
      window.removeEventListener("scroll", drawArrows);
    };
  }, [refs]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-20"
    />
  );
}

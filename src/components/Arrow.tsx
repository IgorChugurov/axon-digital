import React from "react";

interface ArrowProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  controlX?: number;
  controlY?: number;
  controlX2?: number;
  controlY2?: number;
}

export default function Arrow({
  fromX,
  fromY,
  toX,
  toY,
  controlX,
  controlY,
  controlX2,
  controlY2,
}: ArrowProps) {
  const path =
    controlX2 && controlY2
      ? `M ${fromX} ${fromY} Q ${controlX} ${controlY}, ${(fromX + toX) / 2} ${(fromY + toY) / 2} T ${toX} ${toY}`
      : `M ${fromX} ${fromY} Q ${controlX} ${controlY}, ${toX} ${toY}`;

  return (
    <svg
      className="absolute pointer-events-none"
      style={{
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
        zIndex: 0,
      }}
    >
      <path
        d={path}
        stroke="#D1D5DB"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

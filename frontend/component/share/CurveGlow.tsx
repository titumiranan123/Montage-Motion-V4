"use client";

import React from "react";

type Props = {
  width?: number; // px
  height?: number; // px (overall svg height)
  strokeWidth?: number; // Figma “Border”: 90px
  blur?: number; // Figma “Layer blur”: 86.5
  color?: string; // Figma color: #1E63D7
};

export default function CurveGlow({
  width = 1200,
  height = 318.5,
  strokeWidth = 90,
  blur = 86.5,
  color = "#1E63D7",
}: Props) {
  // We’ll draw a big arc from left→right. The radius gives a nice curve.
  const w = width;
  const h = height;

  // Inner padding so thick strokes don't clip
  const pad = strokeWidth / 2 + blur; // add blur room
  const vw = w + pad * 2;
  const vh = h + pad * 2;

  // Arc geometry (you can tweak rx/ry for curvature)
  // Start at left, end at right, arc upward.
  const x1 = pad;
  const x2 = pad + w;
  const y = pad + h * 0.95; // a tiny bit lower makes it look like the screenshot
  const rx = w * 0.75; // horizontal radius
  const ry = h * 1.25; // vertical radius
  const pathD = `M ${x1} ${y} A ${rx} ${ry} 0 0 1 ${x2} ${y}`;

  // SVG blur standard deviation ≈ pixels / 2 is a good visual start
  const stdDev = blur / 2;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${vw} ${vh}`}
      aria-hidden
      style={{ display: "block" }}
    >
      <defs>
        {/* Linear gradient with 20% opacity at both ends, 100% in the middle */}
        <linearGradient id="curveStroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="50%" stopColor={color} stopOpacity={1} />
          <stop offset="100%" stopColor={color} stopOpacity={0.2} />
        </linearGradient>

        {/* Big blur like Figma “Layer blur: 86.5” */}
        <filter id="softBlur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation={stdDev} edgeMode="none" />
        </filter>
      </defs>

      {/* The arc stroke with gradient + blur */}
      <g filter="url(#softBlur)">
        <path
          d={pathD}
          fill="none"
          stroke="url(#curveStroke)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

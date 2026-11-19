"use client";

import React from "react";

interface ServerMapProps {
  selectedCluster: string;
  onSelectCluster: (id: string) => void;
}

interface MapNode {
  id: string;
  name: string;
  code: string;
  cx: number;
  cy: number;
  ping: string;
  color: string;
  units: number;
}

const NODES: MapNode[] = [
  { id: "us", name: "North America", code: "US-EAST", cx: 240, cy: 160, ping: "14ms", color: "#06b6d4", units: 420 },
  { id: "eu", name: "Europe", code: "EU-CENTRAL", cx: 510, cy: 140, ping: "18ms", color: "#3b82f6", units: 310 },
  { id: "latam", name: "Latin America", code: "LATAM-SOUTH", cx: 340, cy: 330, ping: "27ms", color: "#a855f7", units: 150 },
  { id: "apac", name: "Asia-Pacific", code: "APAC-EAST", cx: 820, cy: 190, ping: "24ms", color: "#ec4899", units: 120 },
];

export function ServerMapCanvas({ selectedCluster, onSelectCluster }: ServerMapProps) {
  return (
    <div className="relative w-full rounded-3xl bg-[#03040c] border border-cyan-500/20 p-4 sm:p-6 shadow-[0_0_50px_rgba(6,182,212,0.12)] overflow-hidden">
      {/* Background Grid & Radar Sweep */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/5 via-blue-500/5 to-transparent rounded-full pointer-events-none animate-spin-slow opacity-60" />

      {/* SVG Map Canvas */}
      <svg
        viewBox="0 0 1000 460"
        className="w-full h-auto max-h-[380px] relative z-10 select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="1" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
          </linearGradient>
          <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Stylized World Continents Outlines */}
        <g fill="none" stroke="#1e2942" strokeWidth="1.5" strokeDasharray="2,3" opacity="0.6">
          {/* North America */}
          <path d="M 120 70 L 260 60 L 310 110 L 290 190 L 250 210 L 220 230 L 190 200 L 150 160 L 110 120 Z" />
          {/* South America */}
          <path d="M 270 250 L 370 270 L 380 340 L 340 430 L 300 420 L 280 320 Z" />
          {/* Europe */}
          <path d="M 450 80 L 560 70 L 580 130 L 530 180 L 460 170 L 440 120 Z" />
          {/* Africa */}
          <path d="M 460 190 L 570 190 L 600 270 L 550 380 L 480 360 L 450 250 Z" />
          {/* Asia */}
          <path d="M 590 70 L 880 70 L 920 160 L 860 250 L 730 240 L 660 180 L 600 140 Z" />
          {/* Australia */}
          <path d="M 780 300 L 890 290 L 910 380 L 810 390 Z" />
        </g>

        {/* Animated Laser Fiber Arcs between Data Centers */}
        <g filter="url(#laserGlow)">
          {/* US -> EU */}
          <path
            d="M 240 160 Q 375 80 510 140"
            fill="none"
            stroke="url(#laserGrad)"
            strokeWidth="2"
            strokeDasharray="8 6"
            className="animate-pulse"
          />
          {/* US -> LATAM */}
          <path
            d="M 240 160 Q 280 240 340 330"
            fill="none"
            stroke="url(#laserGrad)"
            strokeWidth="2"
            strokeDasharray="8 6"
            className="animate-pulse"
          />
          {/* EU -> APAC */}
          <path
            d="M 510 140 Q 665 80 820 190"
            fill="none"
            stroke="url(#laserGrad)"
            strokeWidth="2"
            strokeDasharray="8 6"
            className="animate-pulse"
          />
        </g>

        {/* Dynamic Moving Laser Data Packets */}
        <circle r="4" fill="#22d3ee" filter="url(#laserGlow)">
          <animateMotion path="M 240 160 Q 375 80 510 140" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle r="4" fill="#a855f7" filter="url(#laserGlow)">
          <animateMotion path="M 240 160 Q 280 240 340 330" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <circle r="4" fill="#ec4899" filter="url(#laserGlow)">
          <animateMotion path="M 510 140 Q 665 80 820 190" dur="3.2s" repeatCount="indefinite" />
        </circle>

        {/* Datacenter Hotspot Pins */}
        {NODES.map((node) => {
          const isSelected = selectedCluster === node.id;
          return (
            <g
              key={node.id}
              onClick={() => onSelectCluster(node.id)}
              className="cursor-pointer group"
              transform={`translate(${node.cx}, ${node.cy})`}
            >
              {/* Concentric Pulsing Radar Rings */}
              <circle r="22" fill={node.color} opacity="0.15" className="animate-ping" />
              <circle r="14" fill={node.color} opacity="0.3" />
              <circle
                r="7"
                fill={isSelected ? "#ffffff" : node.color}
                stroke={node.color}
                strokeWidth="3"
                filter="url(#laserGlow)"
              />

              {/* Node Badge Card */}
              <g transform="translate(15, -15)">
                <rect
                  x="0"
                  y="-12"
                  width="110"
                  height="34"
                  rx="8"
                  fill="#080c20"
                  stroke={isSelected ? node.color : "#273152"}
                  strokeWidth={isSelected ? "1.5" : "1"}
                  filter="drop-shadow(0 4px 10px rgba(0,0,0,0.6))"
                />
                <text x="8" y="3" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace">
                  {node.code}
                </text>
                <text x="8" y="16" fill={node.color} fontSize="9" fontWeight="bold" fontFamily="monospace">
                  {node.ping} • {node.units} Rigs
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

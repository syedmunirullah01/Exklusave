"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function CelebrationRibbon() {
  useEffect(() => {
    // Rich festive colors matching site palette
    const colors = [
      "#10B981", // Emerald primary
      "#059669", // Dark Emerald
      "#34D399", // Light Emerald
      "#F59E0B", // Gold / Amber
      "#3B82F6", // Royal Blue
      "#EC4899", // Festive Pink
      "#8B5CF6", // Purple
      "#F43F5E", // Rose Red
    ];

    // Duration of continuous top-to-bottom falling ribbons (5.5 seconds)
    const duration = 5500;
    const animationEnd = Date.now() + duration;

    // 1. Initial Top Curtain Blast across the screen
    [0.08, 0.22, 0.38, 0.52, 0.68, 0.84, 0.95].forEach((xPos) => {
      confetti({
        particleCount: 28,
        angle: 90,
        spread: 75,
        startVelocity: 30,
        gravity: 0.9,
        ticks: 500,
        origin: { x: xPos, y: -0.05 },
        colors: colors,
        shapes: ["square"],
        scalar: 1.25,
      });
    });

    // 2. Side Cannon Blasts for festive celebration
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.35 },
      colors: colors,
    });

    confetti({
      particleCount: 50,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.35 },
      colors: colors,
    });

    // 3. Continuous top-to-bottom falling ribbon shower
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      confetti({
        particleCount: 16,
        angle: 90,
        spread: 85,
        startVelocity: 24,
        decay: 0.93,
        gravity: 0.85,
        drift: (Math.random() - 0.5) * 0.6,
        ticks: 450,
        origin: { x: Math.random(), y: -0.05 },
        colors: colors,
        shapes: ["square", "circle"],
        scalar: Math.random() * 0.4 + 0.9,
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return null;
}

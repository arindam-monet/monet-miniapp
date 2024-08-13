"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useHapticFeedback } from "@telegram-apps/sdk-react";
import useSound from "use-sound";

interface TappedPoint {
  x: number;
  y: number;
  createdAt: number;
}

interface TapperProps {
  icon: React.ReactNode;
  onTap: (points: number) => void;
  tapAreaClassName?: string;
  animationDuration?: number;
  className?: string;
  allowMultipleTaps?: boolean;
  maxSimultaneousTaps?: number;
}

const Tapper: React.FC<TapperProps> = ({
  icon,
  onTap,
  tapAreaClassName,
  animationDuration = 1000,
  className,
  allowMultipleTaps,
  maxSimultaneousTaps = 1, // Default to 1 simultaneous taps
}) => {
  const [gameState, setGameState] = useState({
    points: 0,
    tappedPoints: [] as TappedPoint[],
    isTapped: false,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tapAreaRef = useRef<HTMLDivElement>(null);
  const hapticFeedback = useHapticFeedback();
  const [playSkiesOfValor] = useSound("/audio/skies_of_valor.mp3", {
    volume: 0.25,
  });

  const handleTap = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (gameState.points === 0) {
        playSkiesOfValor();
      }

      hapticFeedback.impactOccurred("soft");

      const rect = tapAreaRef.current?.getBoundingClientRect();

      if (rect) {
        const maxTapsAllowed = allowMultipleTaps ? maxSimultaneousTaps : 1;
        const newTappedPoints = Array.from(event.touches)
          .slice(0, maxTapsAllowed)
          .map((touch) => ({
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top,
            createdAt: Date.now(),
          }));

        setGameState((prevState) => ({
          points: prevState.points + newTappedPoints.length,
          tappedPoints: [...prevState.tappedPoints, ...newTappedPoints],
          isTapped: true,
        }));

        onTap(gameState.points + newTappedPoints.length);
      }
    },
    [
      gameState.points,
      hapticFeedback,
      onTap,
      playSkiesOfValor,
      maxSimultaneousTaps,
      allowMultipleTaps,
    ]
  );

  const handleTouchEnd = useCallback(() => {
    setGameState((prevState) => ({ ...prevState, isTapped: false }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentTime = Date.now();
      const updatedPoints = gameState.tappedPoints.filter(
        (point) => currentTime - point.createdAt < animationDuration
      );

      updatedPoints.forEach((point) => {
        const progress = (currentTime - point.createdAt) / animationDuration;
        const y = point.y - 50 * progress; // Move up by 50 pixels over the animation
        const alpha = 1 - progress; // Fade out over time

        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.font = "20px Arial";
        ctx.fillText("+1", point.x, y);
      });

      setGameState((prevState) => ({
        ...prevState,
        tappedPoints: updatedPoints,
      }));

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState.tappedPoints, animationDuration]);

  return (
    <div className={cn("w-32 h-32 relative", className)}>
      <div
        ref={tapAreaRef}
        className={cn(
          "bg-primary rounded-full p-10 h-full flex justify-center items-center cursor-pointer",
          tapAreaClassName,
          gameState.isTapped ? "scale-90 shadow-md transition duration-100" : ""
        )}
        onTouchStart={handleTap}
        onTouchEnd={handleTouchEnd}
      >
        {icon}
      </div>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        width={128} // Match these to the actual size of your component
        height={128}
      />
    </div>
  );
};

export default React.memo(Tapper);

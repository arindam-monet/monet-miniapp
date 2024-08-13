"use client";

import { cn } from "@/lib/utils";
import { useHapticFeedback } from "@telegram-apps/sdk-react";
import { useState } from "react";
import useSound from "use-sound";

interface TappedPoint {
  point: number;
  x: number;
  y: number;
}

interface TapperProps {
  icon: React.ReactNode;
  onTap: (points: number) => void;
  tapAreaClassName?: string;
  animationDuration?: number;
  className?: string;
}

const Tapper: React.FC<TapperProps> = ({
  icon,
  onTap,
  tapAreaClassName,
  animationDuration = 1000,
  className,
}) => {
  const [points, setPoints] = useState(0);
  const [tappedPoints, setTappedPoints] = useState<TappedPoint[]>([]);
  const [isTapped, setIsTapped] = useState(false);
  const hapticFeedback = useHapticFeedback();

  const handleTransitionEnd = () => {
    setIsTapped(false);
  };

  const [playSkiesOfValor] = useSound(
    '/audio/skies_of_valor.mp3',
    { volume: 0.25 }
  );


  const handleTap = (event: React.MouseEvent<HTMLDivElement>) => {
    if (points === 0) {
      // playSkiesOfValor();
    }
    hapticFeedback.impactOccurred('soft');
    setPoints(points + 1);
    onTap(points);
    setTappedPoints([
      ...tappedPoints,
      { point: 1, x: event.clientX, y: event.clientY },
    ]);
    setIsTapped(true);
  };

  return (
    <div className={cn("w-32 h-32", className)}>
      <div
        className={cn(
          "bg-primary rounded-full p-10 h-full flex justify-center items-center cursor-pointer",
          tapAreaClassName,
          isTapped ? "scale-90 shadow-md transition duration-100" : ""
        )}
        onClick={handleTap}
        onTransitionEnd={handleTransitionEnd}
      >
        {icon}
      </div>
      {tappedPoints.map((tappedPoint, index) => (
        <div
          key={index}
          className="absolute text-2xl font-bold animate-rise-and-fade"
          style={{
            top: `${tappedPoint.y}px`,
            left: `${tappedPoint.x}px`,
            animationDuration: `${animationDuration}ms`,
            animationFillMode: "forwards",
          }}
        >
          +{tappedPoint.point}
        </div>
      ))}
    </div>
  );
};

export default Tapper;

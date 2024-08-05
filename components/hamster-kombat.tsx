"use client";

import { useState } from "react";

interface HamsterKombatProps {
  // Add any props you want to pass to the component here
}

const HamsterKombat: React.FC<HamsterKombatProps> = () => {
  const [points, setPoints] = useState(0);
  const [tappedPoints, setTappedPoints] = useState<any[]>([]);

  const handleTap = (event: React.MouseEvent<HTMLDivElement>) => {
    setPoints(points + 1);
    setTappedPoints([
      ...tappedPoints,
      { point: 1, x: event.clientX, y: event.clientY },
    ]);
  };

  return (
    <div className="flex justify-center items-center h-screen relative">
      <div
        className="bg-yellow-500 rounded-full p-10 cursor-pointer"
        onClick={handleTap}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          {/* Add your hamster icon here, or use a placeholder like this */}
          <path d="M10 2a6 6 0 00-6 6v3.586l-1.293 1.293a1 1 0 101.414 1.414L10 10.414l4.293-4.293a1 1 0 101.414-1.414L10 6.586V8a6 6 0 006-6zm0 9a3 3 0 100-6 3 3 0 000 6z" />
        </svg>
      </div>
      <p className="text-lg font-bold mt-4">Points: {points}</p>
      {tappedPoints.map((tappedPoint, index) => (
        <div
          key={index}
          className="absolute text-lg font-bold animate-rise-and-fade"
          style={{
            top: `${tappedPoint.y}px`,
            left: `${tappedPoint.x}px`,
            animationFillMode: "forwards",
          }}
        >
          +{tappedPoint.point}
        </div>
      ))}
    </div>
  );
};

export default HamsterKombat;

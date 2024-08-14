import React, { useReducer, useCallback, useRef, useEffect } from "react";
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

interface GameState {
  points: number;
  tappedPoints: TappedPoint[];
  isTapped: boolean;
}

type Action =
  | { type: 'TAP'; payload: TappedPoint[] }
  | { type: 'TOUCH_END' }
  | { type: 'UPDATE_TAPPED_POINTS'; payload: TappedPoint[] };

const gameReducer = (state: GameState, action: Action): GameState => {
  switch (action.type) {
    case 'TAP':
      return {
        ...state,
        points: state.points + action.payload.length,
        tappedPoints: [...state.tappedPoints, ...action.payload],
        isTapped: true,
      };
    case 'TOUCH_END':
      return { ...state, isTapped: false };
    case 'UPDATE_TAPPED_POINTS':
      return { ...state, tappedPoints: action.payload };
    default:
      return state;
  }
};

const Tapper: React.FC<TapperProps> = ({
  icon,
  onTap,
  tapAreaClassName,
  animationDuration = 1000,
  className,
  allowMultipleTaps = false,
  maxSimultaneousTaps = 1,
}) => {
  const [gameState, dispatch] = useReducer(gameReducer, {
    points: 0,
    tappedPoints: [],
    isTapped: false,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tapAreaRef = useRef<HTMLDivElement>(null);
  const hapticFeedback = useHapticFeedback();
  const [playTapSound] = useSound("/audio/tap.mp3", {
    volume: 0.25,
  });

  const handleTap = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      // Remove preventDefault to avoid the passive event listener warning
      // event.preventDefault();

      playTapSound();

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

        dispatch({ type: 'TAP', payload: newTappedPoints });
        onTap(gameState.points + newTappedPoints.length);
      }
    },
    [hapticFeedback, onTap, playTapSound, maxSimultaneousTaps, allowMultipleTaps, gameState.points]
  );

  const handleTouchEnd = useCallback(() => {
    dispatch({ type: 'TOUCH_END' });
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

      dispatch({ type: 'UPDATE_TAPPED_POINTS', payload: updatedPoints });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [animationDuration]);

  useEffect(() => {
    const tapArea = tapAreaRef.current;
    if (!tapArea) return;

    // Add non-passive event listeners
    const touchStartListener = (e: TouchEvent) => {
      e.preventDefault(); // This is now allowed because the listener is non-passive
      handleTap(e as unknown as React.TouchEvent<HTMLDivElement>);
    };

    tapArea.addEventListener('touchstart', touchStartListener, { passive: false });
    tapArea.addEventListener('touchend', handleTouchEnd);

    return () => {
      tapArea.removeEventListener('touchstart', touchStartListener);
      tapArea.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleTap, handleTouchEnd]);

  return (
    <div className={cn("w-32 h-32 relative", className)}>
      <div
        ref={tapAreaRef}
        className={cn(
          "bg-primary rounded-full p-10 h-full flex justify-center items-center cursor-pointer",
          tapAreaClassName,
          gameState.isTapped ? "scale-90 shadow-md transition duration-100" : ""
        )}
        // Remove onTouchStart and onTouchEnd from here
      >
        {icon}
      </div>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        width={128}
        height={128}
      />
    </div>
  );
};

export default React.memo(Tapper);
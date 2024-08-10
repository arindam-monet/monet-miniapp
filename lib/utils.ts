import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRandomGradient = () => {
  const gradients = [
    "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", // Dark violet to dark blue
    "linear-gradient(135deg, #232526, #414345)", // Grey to dark grey
    "linear-gradient(135deg, #141E30, #243B55)", // Dark blue to darker blue
    "linear-gradient(135deg, #000428, #004e92)", // Navy blue to royal blue
    "linear-gradient(135deg, #373B44, #4286f4)", // Dark grey to blue
    "linear-gradient(135deg, #16222A, #3A6073)", // Dark teal to dark blue
    "linear-gradient(135deg, #1f1c2c, #928DAB)", // Dark violet to greyish violet
    "linear-gradient(135deg, #3c3b3f, #605c3c)", // Charcoal to olive green
  ];
  return gradients[Math.floor(Math.random() * gradients.length)];
};
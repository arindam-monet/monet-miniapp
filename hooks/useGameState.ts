import { useState, useEffect } from 'react';

const LEVELS = {
  MONETRON: { name: 'Monetron', threshold: 0 },
  LOYAL_MONETRON: { name: 'Loyal Monetron', threshold: 1000 },
  GUARDIAN: { name: 'Guardian', threshold: 3500 },
  LORD_KNIGHT: { name: 'Lord & Knight', threshold: 9000 },
  HIGH_ROYAL: { name: 'High Royal', threshold: 18000 },
  SEEKERS_GUILD: { name: "Seeker's Guild", threshold: 50000 },
};

export const useGameState = () => {
  const [nuggets, setNuggets] = useState(0);
  const [role, setRole] = useState('');
  const [level, setLevel] = useState(LEVELS.MONETRON.name);

  useEffect(() => {
    // Update level based on nuggets
    for (const [key, value] of Object.entries(LEVELS).reverse()) {
      if (nuggets >= value.threshold) {
        setLevel(value.name);
        break;
      }
    }
  }, [nuggets]);

  const addNuggets = (amount: number) => {
    setNuggets(prev => prev + amount);
  };

  return { nuggets, role, level, setRole, addNuggets, LEVELS };
};

export default useGameState;
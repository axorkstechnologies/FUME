import React from 'react';
import { ThemeMode } from '../types';

interface AmbientCanvasProps {
  themeMode: ThemeMode;
}

// Removed: The floating blurred orbs and particles added zero perceptible value
// on a pearl background while consuming GPU resources and battery.
// A luxury website communicates through restraint, not decoration.
export const AmbientCanvas: React.FC<AmbientCanvasProps> = () => {
  return null;
};

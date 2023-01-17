type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

// type Date = `${number}-${number}-${number}`;

export interface Habit {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  color?: Color;
  days: string[];
  active?: boolean;
}
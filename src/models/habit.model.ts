// type RGB = `rgb(${number}, ${number}, ${number})`;
// type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
// type HEX = `#${string}`;

// type Color = RGB | RGBA | HEX;

// type Date = `${number}-${number}-${number}`;

export interface Habit {
  id: string;
  label: string;
  description?: string;
  dateList: string[];
  active?: boolean;
  created: number;
  updated: number;
}

export type HabitPayload = Omit<Habit, "id" | "created" | "updated">;

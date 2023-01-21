import { Habit } from "@/models/habit.model";

export type SortKey = "ASC" | "DESC";

type HabitSortKey = "created" | "updated";
export const sortHabitsByKey = (
  habits: Habit[],
  key: HabitSortKey,
  order: SortKey = "ASC"
) => {
  const isDescending = order === "DESC";
  return habits.sort((a, b) =>
    isDescending ? b[key] - a[key] : a[key] - b[key]
  );
};

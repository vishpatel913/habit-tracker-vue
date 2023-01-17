import { defineStore } from "pinia";

import {} from "@/firebase";
import { Habit } from "@/models/habit.model";

type RootState = {
  habits: Habit[];
};

const useHabitsStore = defineStore("habits", {
  state: (): RootState => ({
    habits: [],
  }),

  getters: {
    activeHabits: (state) => state.habits.filter((habit) => !!habit.active),
    habitById: (state) => (id: string) =>
      state.habits.find((habit) => habit.id === id),
  },
});

export default useHabitsStore;

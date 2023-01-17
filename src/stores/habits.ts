import { nanoid } from "nanoid";
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

  actions: {
    createHabit(payload: Omit<Habit, "id">) {
      const newHabit: Habit = {
        id: nanoid(),
        active: true,
        ...payload,
      };
      this.habits.push(newHabit);
      return newHabit;
    },
    updateHabit(id: string, payload: Partial<Habit>) {
      const habitById = this.habitById(id);
      const updatedHabit = { ...habitById, ...payload };
      const nextHabitList = this.habits.map((habit) =>
        habit.id === id ? { ...habit, ...updatedHabit } : habit
      );
      this.habits = nextHabitList;
      return updatedHabit;
    },
    deleteHabit(id: string) {
      const filteredHabitList = this.habits.filter((habit) => habit.id !== id);
      this.habits = filteredHabitList;
      return id;
    },
  },
});

export default useHabitsStore;

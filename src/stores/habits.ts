import { formatDate } from "./../helpers/date";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";

import {} from "@/firebase";
import { toggleDateInList } from "@/helpers/date";
import { Habit } from "@/models/habit.model";

// const mockHabits: Habit[] = [
//   { id: "HABIT_ID_1", label: "Smoke Free", dateList: [], active: true },
//   { id: "HABIT_ID_2", label: "Physio Exercises", dateList: [], active: true },
// ];

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
    toggleHabitDate(id: string, date: string) {
      const habit = this.habitById(id);
      if (!habit) return;
      const dateId = formatDate(date);
      const nextDateList = toggleDateInList(habit.dateList, dateId);
      const updatedHabit: Habit = { ...habit, dateList: nextDateList };
      this.updateHabit(id, updatedHabit);
      return updatedHabit;
    },
  },
});

export default useHabitsStore;

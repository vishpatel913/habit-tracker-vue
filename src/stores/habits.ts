import { formatDate } from "./../helpers/date";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";

import * as databaseService from "@/services/database";
import { toggleDateInList } from "@/helpers/date";
import { Habit, HabitPayload } from "@/models/habit.model";

type RootState = {
  habits: Habit[];
  hasLoaded: boolean;
};

const STORE_ID = "habits";

const useHabitsStore = defineStore(STORE_ID, {
  state: (): RootState => ({
    habits: [],
    hasLoaded: false,
  }),

  getters: {
    activeHabits: (state) => state.habits.filter((habit) => !!habit.active),
    habitById:
      (state) =>
      (id: string): Habit => {
        const habit = state.habits.find((habit) => habit.id === id);
        if (!habit) {
          throw Error(`Habit with id: ${id} does not exisit`);
        }
        return habit;
      },
  },

  actions: {
    async fetchHabits() {
      const result = await databaseService.getCollection("habits");
      this.habits = result;
      this.hasLoaded = true;
    },
    async createHabit(payload: HabitPayload) {
      const newHabit: Habit = {
        id: nanoid(),
        active: true,
        created: Date.now(),
        updated: Date.now(),
        ...payload,
      };
      try {
        await databaseService.setDocument("habits", newHabit);
        this.habits.push(newHabit);
        return newHabit;
      } catch (error) {
        console.error(error);
      }
    },
    async updateHabit(id: string, payload: Partial<Habit>) {
      try {
        const habitById = this.habitById(id);
        const updatedHabit: Habit = {
          ...habitById,
          ...payload,
          updated: Date.now(),
        };

        await databaseService.setDocument("habits", updatedHabit);
        const nextHabitList = this.habits.map((habit) =>
          habit.id === id ? { ...habit, ...updatedHabit } : habit
        );
        this.habits = nextHabitList;
        return updatedHabit;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteHabit(id: string) {
      try {
        await databaseService.deleteDocument("habits", id);
        const filteredHabitList = this.habits.filter(
          (habit) => habit.id !== id
        );
        this.habits = filteredHabitList;
        return id;
      } catch (error) {
        console.error(error);
      }
    },
    async toggleHabitDate(id: string, date: string) {
      try {
        const habit = this.habitById(id);
        const dateId = formatDate(date);
        const nextDateList = toggleDateInList(habit.dateList, dateId);
        const updatedHabit: Habit = { ...habit, dateList: nextDateList };
        await this.updateHabit(id, updatedHabit);
        return updatedHabit;
      } catch (error) {
        console.error(error);
      }
    },
  },
});

export default useHabitsStore;

import { Habit } from "@/models/habit";
import { User } from "@/models/user";

export type UserModule = {
  user: User | null;
  isLoggedIn: boolean;
};

export type HabitsModule = {
  habits: Habit[];
};

export type RootState = UserModule & HabitsModule;

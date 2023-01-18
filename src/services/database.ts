import {
  collection,
  query,
  doc,
  getDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { auth, db } from "@/firebase";

import { Habit } from "@/models/habit.model";

export default {
  getHabitsForUser: async (): Promise<Habit[]> => {
    const userId = auth.currentUser?.uid;
    if (!userId) return Promise.reject();
    const collectionRef = collection(db, "user", userId, "habits");
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const habits = await Promise.all(
      querySnapshot.docs.map((doc) => doc.data())
    );
    return habits as Habit[];
  },

  createHabit: async (habit: Habit) => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;
    const docRef = doc(db, "user", userId, "habits", habit.id);
    await setDoc(docRef, habit);
    return habit;
  },
};

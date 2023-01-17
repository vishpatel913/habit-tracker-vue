import { setActivePinia, createPinia } from "pinia";
import useHabits from "@/stores/habits";

const TEST_HABIT = {
  title: "Test habit",
  days: [],
};

describe("Habits Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("creates habit", () => {
    const habitsStore = useHabits();
    expect(habitsStore.habits).toHaveLength(0);

    habitsStore.createHabit(TEST_HABIT);
    expect(habitsStore.habits).toHaveLength(1);
    expect(habitsStore.habits).toMatchObject([
      { id: expect.any(String), title: "Test habit", days: [] },
    ]);
  });

  it("update habit", () => {
    const habitsStore = useHabits();
    const createdHabit = habitsStore.createHabit(TEST_HABIT);

    habitsStore.updateHabit(createdHabit.id, {
      title: "New title",
      description: "some desc",
    });
    expect(habitsStore.habits).toHaveLength(1);
    const updatedHabit = habitsStore.habits[0];
    expect(updatedHabit.id).toBe(createdHabit.id);
    expect(updatedHabit.title).toBe("New title");
    expect(updatedHabit.description).toBe("some desc");
  });

  it("delete habit", () => {
    const habitsStore = useHabits();
    const createdHabit = habitsStore.createHabit(TEST_HABIT);

    habitsStore.deleteHabit(createdHabit.id);
    expect(habitsStore.habits).toHaveLength(0);
  });
});

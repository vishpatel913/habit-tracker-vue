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

  it("toggles habit date", () => {
    const habitsStore = useHabits();
    const testDays = ["2022-12-07", "2022-12-08", "2022-12-10"];
    const createdHabit = habitsStore.createHabit({
      ...TEST_HABIT,
      days: testDays,
    });

    habitsStore.toggleHabitDate(createdHabit.id, "2022-12-12");
    let updatedHabit = habitsStore.habitById(createdHabit.id);
    expect(updatedHabit?.days).toHaveLength(4);
    expect(updatedHabit?.days).toContain("2022-12-12");

    habitsStore.toggleHabitDate(createdHabit.id, "2022-12-08");
    updatedHabit = habitsStore.habitById(createdHabit.id);
    expect(updatedHabit?.days).toHaveLength(3);
    expect(updatedHabit?.days).not.toContain("2022-12-08");

    habitsStore.toggleHabitDate(createdHabit.id, "2022-12-07T00:00:00.000Z");
    updatedHabit = habitsStore.habitById(createdHabit.id);
    expect(updatedHabit?.days).toHaveLength(2);
    expect(updatedHabit?.days).not.toContain("2022-12-07");

    habitsStore.toggleHabitDate(createdHabit.id, "2022-12-01T23:00:00.000Z");
    updatedHabit = habitsStore.habitById(createdHabit.id);
    expect(updatedHabit?.days).toHaveLength(3);
    expect(updatedHabit?.days).toContain("2022-12-01");
  });
});

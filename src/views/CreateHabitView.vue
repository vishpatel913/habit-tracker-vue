<template>
  <div class="create">
    <HabitForm @submit="onCreate" />
  </div>
</template>

<script setup lang="ts">
// import { computed } from "vue";
import { useRouter } from "vue-router";
import HabitForm from "@/components/HabitForm.vue";
import userHabitsStore from "@/stores/habits";
import { UpdateHabitArg } from "@/models/habit.model";

const router = useRouter();
const habitStore = userHabitsStore();

const onCreate = (value: UpdateHabitArg) => {
  habitStore.createHabit(value);
  router.replace("/");
};
</script>

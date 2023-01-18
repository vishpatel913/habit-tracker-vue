<template>
  <div class="create">
    <HabitForm @submit="onCreate" />
  </div>
</template>

<script setup lang="ts">
// import { computed } from "vue";
import HabitForm from "@/components/HabitForm.vue";
// import userHabitsStore from "@/stores/habits";
import { CreateHabitArg } from "@/models/habit.model";

// const habitStore = userHabitsStore();

const onCreate = (value: CreateHabitArg) => {
  console.log("onCreate value", value);
};
</script>

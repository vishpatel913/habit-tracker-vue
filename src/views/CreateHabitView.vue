<template>
  <div class="create">
    <HabitForm @submit="onCreate" @cancel="onCancel" />
  </div>
</template>

<script setup lang="ts">
// import { computed } from "vue";
import { useRouter } from "vue-router";
import HabitForm from "@/components/HabitForm.vue";
import useHabitsStore from "@/stores/habits";
import { HabitPayload } from "@/models/habit.model";

const router = useRouter();
const habitStore = useHabitsStore();

const onCreate = (value: HabitPayload) => {
  habitStore.createHabit(value);
  router.push("/");
};

const onCancel = () => {
  router.push("/");
};
</script>

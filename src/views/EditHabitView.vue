<template>
  <div class="edit">
    <HabitForm @submit="onUpdate" @cancel="onCancel" :habit="habit" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";

import { HabitForm } from "@/components";
import { useHabitsStore } from "@/store";
import { HabitPayload } from "@/models";

const route = useRoute();
const router = useRouter();
const habitStore = useHabitsStore();

const habitId = route.params.id as string;

const habit = computed(() => {
  return habitStore.habitById(habitId);
});

const onUpdate = (value: HabitPayload) => {
  if (!value.id) return;
  habitStore.updateHabit(value.id, value);
  router.go(-1);
};
const onCancel = () => {
  router.go(-1);
};
</script>

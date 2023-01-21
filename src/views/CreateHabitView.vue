<template>
  <div class="create">
    <HabitForm @submit="onCreate" @cancel="onCancel" />
  </div>
</template>

<script setup lang="ts">
// import { computed } from "vue";
import { useRouter } from "vue-router";

import { HabitForm } from "@/components";
import { useHabitsStore } from "@/store";
import { HabitPayload } from "@/models";

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

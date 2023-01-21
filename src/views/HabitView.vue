<template>
  <div class="habit">
    {{ JSON.stringify(habit, null, 2) }}
  </div>
</template>

<script setup lang="ts">
// import { computed } from "vue";
import { useRoute } from "vue-router";

import { useHabitsStore } from "@/store";

const route = useRoute();
const habitStore = useHabitsStore();

const habitId = route.params.id as string;
const habit = habitStore.habitById(habitId);
</script>

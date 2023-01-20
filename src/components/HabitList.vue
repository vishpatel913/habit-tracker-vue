<template>
  <div class="habit-list">
    <List :loading="!habitsLoaded">
      <Space v-if="!!habits.length" direction="vertical" fill>
        <HabitTile
          v-for="habit in habits"
          :key="habit.id"
          v-bind="habit"
          @toggle="habitsStore.toggleHabitDate"
          @delete="habitsStore.deleteHabit"
        />
      </Space>
      <Empty v-else-if="!!habitsLoaded" description="No habits configured">
        <Button @click="onCreate">Create</Button>
      </Empty>
    </List>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { Empty, Button, Space, List } from "vant";

import HabitTile from "@/components/HabitTile.vue";
import useHabitsStore from "@/stores/habits";

const router = useRouter();
const habitsStore = useHabitsStore();

const habits = computed(() => habitsStore.habits);
const habitsLoaded = computed(() => !!habitsStore.hasLoaded);

const onCreate = () => {
  router.push("/create");
};
</script>

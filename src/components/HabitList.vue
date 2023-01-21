<template>
  <div class="habit-list">
    <List :loading="habitsStore.isLoading">
      <Space v-if="!!habits?.length" direction="vertical" fill>
        <HabitTile
          v-for="habit in habits"
          :key="habit.id"
          v-bind="habit"
          @toggle="habitsStore.toggleHabitDate"
          @delete="habitsStore.deleteHabit"
          @view="onView"
          @edit="onEdit"
        />
      </Space>
      <Empty v-else description="No habits configured">
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
import { sortHabitsByKey } from "@/helpers/sort";
import useHabitsStore from "@/stores/habits";

const router = useRouter();
const habitsStore = useHabitsStore();

const habits = computed(() => sortHabitsByKey(habitsStore.habits, "created"));

const onCreate = () => {
  router.push("/create");
};
const onView = (id: string) => {
  router.push(`/habit/${id}`);
};
const onEdit = (id: string) => {
  router.push(`/habit/${id}/edit`);
};
</script>

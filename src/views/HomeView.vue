<template>
  <div class="home">
    <HelloWorld :msg="helloMessage" />
    <ul class="list" v-if="!!habits.length">
      <Space direction="vertical" fill>
        <li v-for="habit in habits" :key="habit.id">
          <HabitTile
            :id="habit.id"
            :label="habit.label"
            :description="habit.description"
            :date-list="habit.dateList"
          />
        </li>
      </Space>
    </ul>
    <div v-else>
      <Empty description="No habits configured">
        <Button @click="onCreate">Create</Button>
      </Empty>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { Empty, Button, Space } from "vant";
import HelloWorld from "@/components/HelloWorld.vue";
import HabitTile from "@/components/HabitTile.vue";
import useUserStore from "@/stores/user";
import userHabitsStore from "@/stores/habits";

const router = useRouter();
const userStore = useUserStore();
const habitsStore = userHabitsStore();

const user = computed(() => ({
  ...userStore.user,
  isLoggedIn: userStore.isLoggedIn,
}));

const helloMessage = computed(() =>
  user.value.isLoggedIn ? `Hello ${user.value.name}` : "Signing in..."
);

const habits = computed(() => habitsStore.habits);

const onCreate = () => {
  router.push("/create");
};
</script>

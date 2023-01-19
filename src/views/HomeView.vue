<template>
  <div class="home">
    <HelloWorld :msg="helloMessage" />
    <div v-if="isLoaded">
      <ul class="list" v-if="!!habits.length">
        <Space direction="vertical" fill>
          <li v-for="habit in habits" :key="habit.id">
            <HabitTile v-bind="habit" @toggle="habitsStore.toggleHabitDate" />
          </li>
        </Space>
      </ul>
      <div v-else>
        <Empty description="No habits configured">
          <Button @click="onCreate">Create</Button>
        </Empty>
      </div>
    </div>
    <Row justify="center" v-else><Loading /></Row>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { Empty, Button, Space, Loading, Row } from "vant";
import HelloWorld from "@/components/HelloWorld.vue";
import HabitTile from "@/components/HabitTile.vue";
import useUserStore from "@/stores/user";
import useHabitsStore from "@/stores/habits";

const router = useRouter();
const userStore = useUserStore();
const habitsStore = useHabitsStore();

const user = computed(() => ({
  ...userStore.user,
  isLoggedIn: userStore.isLoggedIn,
}));

const helloMessage = computed(() =>
  user.value.isLoggedIn ? `Hello ${user.value.name}` : "Signing in..."
);

const habits = computed(() => habitsStore.habits);
const isLoaded = computed(() => !habitsStore.loading && !!userStore.isLoggedIn);

const onCreate = () => {
  router.push("/create");
};
</script>

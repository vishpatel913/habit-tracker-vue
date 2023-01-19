<template>
  <div class="container">
    <component :is="layout">
      <slot />
    </component>
    <Tabbar v-model="currentPage" placeholder>
      <TabbarItem name="home" icon="home-o" to="/">Home</TabbarItem>
      <TabbarItem name="create" icon="plus" to="/create">Create</TabbarItem>
      <TabbarItem name="settings" icon="setting-o">Settings</TabbarItem>
    </Tabbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Tabbar, TabbarItem } from "vant";

import { auth } from "@/firebase";
import useUserStore from "@/stores/user";
import useHabitsStore from "@/stores/habits";

const route = useRoute();
const userStore = useUserStore();
const habitsStore = useHabitsStore();

const currentPage = computed(() => route.name?.toString() || "home");

auth.onAuthStateChanged((user) => {
  userStore.signInWithGoogleRedirect(user);
  if (user) {
    habitsStore.fetchHabits();
  }
});

console.log("route", route);

const layout = computed(() =>
  route.meta.layout ? () => import(`@/layouts/${route.meta.layout}.vue`) : "div"
);
</script>

<style scoped>
.container {
  height: 100%;
  padding: 1rem;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

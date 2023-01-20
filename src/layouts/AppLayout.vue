<template>
  <div class="container">
    <AppHeader :has-back-button="hasBackButton" />
    <component :is="layout">
      <slot />
    </component>
    <AppNavigation />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import { auth } from "@/firebase";
import AppHeader from "@/components/AppHeader.vue";
import AppNavigation from "@/components/AppNavigation.vue";
import useUserStore from "@/stores/user";
import useHabitsStore from "@/stores/habits";

const route = useRoute();
const userStore = useUserStore();
const habitsStore = useHabitsStore();

auth.onAuthStateChanged((user) => {
  userStore.signInWithGoogleRedirect(user);
  if (user) {
    habitsStore.fetchHabits();
  }
});

const hasBackButton = computed(() => !!route.meta.hasBack);

const layout = computed(() =>
  route.meta.layout ? () => import(`@/layouts/${route.meta.layout}.vue`) : "div"
);
</script>

<style scoped>
.container {
  --van-tabbar-height: 56px;
  height: 100%;
  padding: 1rem;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

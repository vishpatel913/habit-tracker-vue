<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { auth } from "@/firebase";
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

const layout = computed(() =>
  route.meta.layout ? () => import(`@/layouts/${route.meta.layout}.vue`) : "div"
);
</script>

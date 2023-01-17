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

const route = useRoute();
const userStore = useUserStore();

auth.onAuthStateChanged(() => {
  userStore.signInWithGoogleRedirect();
});

const layout = computed(() =>
  route.meta.layout ? () => import(`@/layouts/${route.meta.layout}.vue`) : "div"
);
</script>

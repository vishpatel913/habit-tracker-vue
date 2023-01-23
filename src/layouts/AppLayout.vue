<template>
  <div class="layout-container">
    <AppHeader :has-back-button="hasBackButton" />
    <div class="layout-content">
      <component :is="layout">
        <slot v-if="habitsStore.hasInitiallyLoaded" />
        <Row v-else justify="center">
          <Loading />
        </Row>
      </component>
    </div>
    <AppNavigation />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Row, Loading } from "vant";

import { auth } from "@/firebase";

import { AppHeader, AppNavigation } from "@/components";
import { useUserStore, useHabitsStore } from "@/store";

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
.layout-container {
  height: 100%;
  overflow: hidden;
}
.layout-content {
  height: calc(100vh - var(--van-nav-bar-height) - var(--van-tabbar-height));
  padding: var(--van-padding-md) 0;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>

<template>
  <header class="header">
    <NavBar fixed placeholder @click-left="handleBack">
      <template #left v-if="hasBackButton">
        <Icon name="arrow-left" size="large" />
      </template>
      <template #title>
        <img
          alt="Vue logo"
          src="../assets/logo.png"
          class="logo"
          @click="handleHome"
        />
      </template>
    </NavBar>
  </header>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { NavBar, Icon } from "vant";

defineProps<{
  userName?: string;
  hasBackButton?: boolean;
}>();

const router = useRouter();
const handleHome = () => router.push("/");
const handleBack = () => router.go(-1);
</script>

<style scoped>
.header {
  --van-nav-bar-height: 56px;
}
.logo {
  height: 40px;
  vertical-align: middle;
}
</style>

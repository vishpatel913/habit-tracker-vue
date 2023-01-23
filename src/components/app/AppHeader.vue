<template>
  <header class="header">
    <NavBar fixed placeholder @click-left="handleBack" :border="false">
      <template #left v-if="hasBackButton">
        <Icon name="arrow-left" size="large" />
      </template>
      <template #title>
        <Space align="center" class="title-container">
          <img
            alt="App logo"
            src="../../assets/logo.png"
            class="logo"
            @click="handleHome"
          />
          Habituary
        </Space>
      </template>
    </NavBar>
  </header>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { NavBar, Icon, Space } from "vant";

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
  --van-nav-bar-background: var(--van-background);
  --van-nav-bar-icon-color: var(--van-text-color);
  --van-nav-bar-text-color: var(--van-text-color);
}
.title-container {
  display: flex;
}
.logo {
  height: 32px;
  vertical-align: middle;
}
</style>

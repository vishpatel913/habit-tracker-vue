<template>
  <config-provider theme="dark">
    <app-layout>
      <router-view />
    </app-layout>
  </config-provider>
</template>

<script setup lang="ts">
import { ConfigProvider } from "vant";
import AppLayout from "@/layouts/AppLayout.vue";
</script>

<style lang="scss">
@import "./App.scss";
</style>

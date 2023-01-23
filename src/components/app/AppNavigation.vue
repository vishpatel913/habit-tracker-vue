<template>
  <nav class="navigation">
    <Tabbar fixed placeholder route :border="false">
      <TabbarItem name="home" icon="home-o" to="/">Home</TabbarItem>
      <TabbarItem name="create" icon="plus" to="/create">Create</TabbarItem>
      <TabbarItem name="settings" icon="setting-o">Settings</TabbarItem>
    </Tabbar>
  </nav>
</template>

<script setup lang="ts">
import { Tabbar, TabbarItem } from "vant";
</script>

<style scoped>
.navigation {
  --van-tabbar-height: 56px;
  --van-tabbar-item-active-background: none;
}
</style>
